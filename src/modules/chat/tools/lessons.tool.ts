import { zodToJsonSchema } from 'zod-to-json-schema';

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
} from './schema';
import { RunnableConfig } from '@langchain/core/runnables';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';
import { tool } from '@langchain/core/tools';
import { ContentStatus } from '@prisma/client';
import { LessonEntity } from 'src/modules/content/entities';

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
      const userId = config?.metadata?.userId as string;
      const { moduleId, lessonRequirements } = input;

      if (!userId) {
        throw new Error('User ID is required');
      }

      const moduleNode = await getModule(moduleId, userId);

      if (!moduleNode) {
        throw new Error('Module not found');
      }

      const module = moduleNode.body as ModuleSchemaType;

      const teacherAgent = new ChatGoogleGenerativeAI({
        apiKey,
        model,
        temperature: 0.3,
        json: true,
        streaming: true,
      });

      const createLessonPromptTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(`
            You are a teacher that create engaging lessons. 
            The lessons have a similar structure to doulingo lessons, where the user learns new information and tests their knowledge using flashcards, questions and other test elements.
            The lesson is split between multiple chunks, each chunk has a different type of content. When creating the chunks, you should mix the content types to keep the user engaged.
            The chuck also represent the user's progress in the lesson.

            The lesson is part of a module, and the module has a list of lessons.

            Here you can find the module: 
            <module>
            {module}
            </module>

            When generating the lesson, you should follow these rules:
            - The lesson should have 10 chunks approximately, based on the lesson complexity.
            - You should use notes for learning new concepts, then other test elements like flashcards or questions to evaluate the user grasp of the lesson.
            - The info and test chunks should be mixed together.
            - Focus on creating engaging content.


            You should generate the lesson on the module following a logical structure.

            You should always return the lesson in the following format:
            <response_format>
            {lesson_schema}
            </response_format>
            `),
        HumanMessagePromptTemplate.fromTemplate(`
            {lesson_requirements}

            Here is the lesson you should generate:
            <lesson_input>
            {lesson_input}
            </lesson_input>
            `),
      ]);

      // Start the stream with an opening bracket
      await dispatchCustomEvent(
        'input_json_delta',
        {
          type: 'input_json_delta',
          partial_json: '[',
        },
        config,
      );

      const lessonsPayload: Pick<
        LessonEntity,
        'body' | 'status' | 'metadata'
      >[] = [];
      for (let i = 0; i < module.lessons.length; i++) {
        const lessonInput = module.lessons[i];
        const createCoursePrompt = await createLessonPromptTemplate.invoke({
          module,
          lesson_input: lessonInput,
          lesson_schema: JSON.stringify(zodToJsonSchema(lessonSchema)),
          lesson_requirements: lessonRequirements || '',
        });

        // Stream version of generating the lesson
        const stream = await teacherAgent.stream(createCoursePrompt, {
          ...config,
          tags: ['skip_client_stream'],
        });

        let streamOutput = '';
        for await (const chunk of stream) {
          streamOutput += chunk.content;
          // TODO: make sure you stream the output inside an array

          await dispatchCustomEvent(
            'input_json_delta',
            {
              type: 'input_json_delta',
              partial_json: chunk.content,
            },
            config,
          );
        }

        if (i < module.lessons.length - 1) {
          await dispatchCustomEvent(
            'input_json_delta',
            {
              type: 'input_json_delta',
              partial_json: ',',
            },
            config,
          );
        }

        const lessonOutput = JSON.parse(streamOutput);

        const payload = {
          body: lessonOutput,
          status: ContentStatus.DRAFT,
          metadata: {},
        };
        lessonsPayload.push(payload);
      }

      await dispatchCustomEvent(
        'input_json_delta',
        {
          type: 'input_json_delta',
          partial_json: ']',
        },
        config,
      );

      const createdLessons = await upsertLessons(
        moduleId,
        userId,
        lessonsPayload,
      );

      return JSON.stringify({ moduleId: moduleNode.id, createdLessons });
    },
    {
      name: 'create-lessons',
      description: 'Create the lessons for the module',
      schema: createLessonsSchema,
    },
  );
