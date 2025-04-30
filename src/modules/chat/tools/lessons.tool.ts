import { zodToJsonSchema } from 'zod-to-json-schema';
import { parse as parsePartialJson, ALL } from 'partial-json';

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { ContentService } from 'src/modules/content/content.service';
import {
  ModuleSchemaType,
  createLessonsSchema,
  CreateLessonsSchemaType,
  lessonSchema,
  editLessonSchema,
  EditLessonSchemaType,
} from './schema';
import { RunnableConfig } from '@langchain/core/runnables';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';
import { tool } from '@langchain/core/tools';
import { ContentStatus } from '@prisma/client';
import { LessonEntity } from 'src/modules/content/entities';

/**
 * ------------------------------------------------------------------
 *  🎓  Teacher-Agent Instruction Set
 * ------------------------------------------------------------------
 *  KEEP THIS CENTRAL!  All lesson-generation behaviour lives here so
 *  we can tune pedagogy in a single place without hunting through
 *  template strings dotted around the codebase.
 * ------------------------------------------------------------------
 */
const teacherSystemPrompt = `
You are an expert instructional designer.

## Goal
Produce engaging, bite-sized lessons that alternate **explanation** with **practice**, inspired by Duolingo Stories but adapted for adult self-learners. The learner reads exactly one chunk at a time on mobile.

## Structure
1. **Chunks** — Generate **8-12** per lesson.
2. **Ratio** — Target **≈60 % explanatory "note" chunks** & **≈40% practice** (quiz · flashcard · question).
3. **Flow** — Alternate chunk types to sustain attention (e.g. note → quiz → note → flashcard …). Always **begin with a note** and **finish with an open question** encouraging personal reflection.
4. **Explanatory text** — 150-300 words, second-person, everyday language, include at least one concrete example or analogy. Avoid jargon unless previously defined.
5. **Assessment rules**
   * **Quiz** — 3-5 options, exactly one correct, provide a 1-sentence hint for *every* option.
   * **Flashcard** — front ≤120 chars phrased as a question, back ≤250 chars kept succinct.
   * **Open question** — supply ≥2 rubric criteria with points and explanations.
6. **Scaffolding** — Later chunks may reference earlier ones (e.g. "In Chunk 3 you learned …"). Increase difficulty gradually.
7. **Accessibility** — Short sentences (<25 words), positive tone, inclusive examples.

## Note chunk
When writing a note, use ≥2 quote items (e.g. "analogy", "example", "tip", "warning") to help explain the text. The example, tip, etc, are quote types, so you should create a quote, and then make the quoteType example, tip, etc.
Use as much text item as needed to explain the text.
When referencing a chunk, use the title of the chunk.

## Output
* Return **valid JSON** strictly matching the supplied *lesson_schema* — no markdown, no additional keys.
* Use stable, deterministic ULIDs/UUIDs for every \`id\` field so retries don't break referential integrity.
* If *lessonRequirements* is present, incorporate the user 's wishes *verbatim* unless they conflict with any rule above.
`;

/**
 * ------------------------------------------------------------------
 *  🛠️  createLessonsTool
 * ------------------------------------------------------------------
 */
export const createLessonsTool = (
  apiKey: string,
  model: string,
  getModule: ContentService['getModule'],
  upsertLessons: ContentService['upsertLessons'],
) =>
  tool(
    async (
      input: CreateLessonsSchemaType,
      config?: RunnableConfig,
    ): Promise<string> => {
      try {
        const userId = config?.metadata?.userId as string;
        const { moduleId, lessonsContext } = input;

        if (!userId) throw new Error('User ID is required');

        // ───────────── Fetch module & sanity-check ─────────────
        const moduleNode = await getModule(moduleId, userId);
        if (!moduleNode) throw new Error('Module not found');
        const module = moduleNode.body as ModuleSchemaType;

        // ───────────── LLM client ─────────────
        const teacherAgent = new ChatGoogleGenerativeAI({
          apiKey,
          model,
          temperature: 0.3,
          json: true,
          streaming: true,
        });

        // ───────────── Prompt Template ─────────────
        const createLessonPromptTemplate = ChatPromptTemplate.fromMessages([
          SystemMessagePromptTemplate.fromTemplate(`
{teacherSystemPrompt}

### Context
The following *module* definition gives the lesson list and their titles/descriptions.
<module>
{module}
</module>

### JSON Contract
Return the lesson exactly in this format:
<response_format>
{lesson_schema}
</response_format>
`),
          HumanMessagePromptTemplate.fromTemplate(`
{lessons_context}

Below is the *lesson_input* (title & description) you must flesh out into a full lesson:
<lesson_input>
{lesson_input}
</lesson_input>
`),
        ]);

        // ───────────── Streaming JSON array bracket ─────────────
        await dispatchCustomEvent(
          'input_json_delta',
          { type: 'input_json_delta', partial_json: '[' },
          config,
        );

        const lessonsPayload: Pick<
          LessonEntity,
          'body' | 'status' | 'metadata'
        >[] = [];

        for (let i = 0; i < module.lessons.length; i++) {
          const lessonInput = module.lessons[i];

          const createCoursePrompt = await createLessonPromptTemplate.invoke({
            // template variables
            teacherSystemPrompt,
            module,
            lesson_input: lessonInput,
            lesson_schema: JSON.stringify(zodToJsonSchema(lessonSchema)),
            lessons_context: lessonsContext?.trim()
              ? `<lessons_context>
${lessonsContext}
</lessons_context>`
              : '',
          });

          // ───────────── Stream generation ─────────────
          const stream = await teacherAgent.stream(createCoursePrompt, {
            ...config,
            tags: ['skip_client_stream'],
          });

          let streamOutput = '';
          for await (const chunk of stream) {
            streamOutput += chunk.content;
            await dispatchCustomEvent(
              'input_json_delta',
              { type: 'input_json_delta', partial_json: chunk.content },
              config,
            );
          }

          if (i < module.lessons.length - 1) {
            await dispatchCustomEvent(
              'input_json_delta',
              { type: 'input_json_delta', partial_json: ',' },
              config,
            );
          }

          const lessonOutput = parsePartialJson(streamOutput, ALL);
          lessonsPayload.push({
            body: lessonOutput,
            status: ContentStatus.DRAFT,
            metadata: {},
          });
        }

        await dispatchCustomEvent(
          'input_json_delta',
          { type: 'input_json_delta', partial_json: ']' },
          config,
        );

        // ───────────── Persist lessons ─────────────
        const createdLessons = await upsertLessons(
          moduleId,
          userId,
          lessonsPayload,
        );

        return JSON.stringify({ moduleId: moduleNode.id, createdLessons });
      } catch (error) {
        console.error('Error in createLessonsTool:', error);
        // Rethrow or return a user-friendly error message stringified
        return JSON.stringify({
          error: `Failed to create lessons: ${error.message}`,
        });
      }
    },
    {
      name: 'create-lessons',
      description:
        'Generate complete lesson content for each lesson stub defined within a module.',
      schema: createLessonsSchema,
    },
  );

/**
 * ------------------------------------------------------------------
 *  🛠️  editLessonTool
 * ------------------------------------------------------------------
 */
export const editLessonTool = (
  apiKey: string,
  model: string,
  getLesson: ContentService['getLesson'],
  editLesson: ContentService['editLesson'],
) =>
  tool(
    async (
      input: EditLessonSchemaType,
      config?: RunnableConfig,
    ): Promise<string> => {
      try {
        const userId = config?.metadata?.userId as string;
        const { lessonId, lessonPrompt, lessonContext } = input;

        if (!userId) throw new Error('User ID is required');

        // ───────────── Fetch lesson & sanity-check ─────────────
        const lessonNode = await getLesson(lessonId, userId);
        if (!lessonNode)
          throw new Error(`Lesson with ID ${lessonId} not found`);
        const currentLesson = lessonNode.body;

        // ───────────── LLM client ─────────────
        const teacherAgent = new ChatGoogleGenerativeAI({
          apiKey,
          model,
          temperature: 0.3,
          json: true,
          streaming: true,
        });

        // ───────────── Prompt Template ─────────────
        const editLessonPromptTemplate = ChatPromptTemplate.fromMessages([
          SystemMessagePromptTemplate.fromTemplate(`
{teacherSystemPrompt}

### Context
You are editing an existing lesson. Below is the current version of the lesson:
<current_lesson>
{current_lesson}
</current_lesson>

### JSON Contract
Return the **entire updated lesson** exactly in this format, incorporating the requested changes:
<response_format>
{lesson_schema}
</response_format>
`),
          HumanMessagePromptTemplate.fromTemplate(`
{lesson_context}

Apply the following changes based on the user's request:
<lesson_prompt>
{lesson_prompt}
</lesson_prompt>
`),
        ]);

        const editLessonPrompt = await editLessonPromptTemplate.invoke({
          teacherSystemPrompt,
          current_lesson: JSON.stringify(currentLesson, null, 2),
          lesson_schema: JSON.stringify(zodToJsonSchema(lessonSchema)),
          lesson_context: lessonContext?.trim()
            ? `<lesson_context>
${lessonContext}
</lesson_context>`
            : '',
          lesson_prompt: lessonPrompt,
        });

        // ───────────── Stream generation ─────────────
        const stream = await teacherAgent.stream(editLessonPrompt, {
          ...config,
          tags: ['skip_client_stream'],
        });

        let streamOutput = '';
        for await (const chunk of stream) {
          streamOutput += chunk.content;
          await dispatchCustomEvent(
            'input_json_delta',
            { type: 'input_json_delta', partial_json: chunk.content },
            config,
          );
        }

        const parsedOutput = parsePartialJson(streamOutput, ALL);
        const updatedLessonBody = Array.isArray(parsedOutput)
          ? parsedOutput[0]
          : parsedOutput;

        // ───────────── Persist updated lesson ─────────────
        // Assuming editLesson takes lessonId, payload { body: ... }, userId
        const updatedLesson = await editLesson(
          lessonId,
          { body: updatedLessonBody }, // Adjust payload structure if needed
          userId,
        );

        return JSON.stringify({ lessonId, updatedLesson });
      } catch (error) {
        console.error('Error in editLessonTool:', error);
        // Rethrow or return a user-friendly error message stringified
        return JSON.stringify({
          error: `Failed to edit lesson: ${error.message}`,
        });
      }
    },
    {
      name: 'edit-lesson',
      description: 'Edit an existing lesson based on user instructions.',
      schema: editLessonSchema,
    },
  );
