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
  lessonsSchema,
} from './schema';
import { RunnableConfig } from '@langchain/core/runnables';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';
import { tool } from '@langchain/core/tools';

export const createLessonsTool = (
  apiKey: string,
  model: string,
  getModule: ContentService['getModule'],
  createLesson: ContentService['createLesson'],
) =>
  tool(
    async (
      input: CreateLessonsSchemaType,
      config?: RunnableConfig,
    ): Promise<string> => {
      const userId = config?.metadata?.userId as string;
      const { moduleId } = input;

      if (!userId) {
        throw new Error('User ID is required');
      }

      const moduleNode = await getModule(moduleId, userId);

      if (!moduleNode) {
        throw new Error('Module not found');
      }

      // TODO: check if the course has lessons and make sure you don't duplicate them.

      const module = moduleNode.body as ModuleSchemaType;
      const lessons = module.lessons;
      const createdLessons = [];

      const teacherAgent = new ChatGoogleGenerativeAI({
        apiKey,
        model,
        temperature: 0.3,
        json: true,
        streaming: true,
      });

      const createLessonPromptTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(`
            You are a teacher. You are given a lesson array and you need to generate engaging lessons. This is the schema for the lessons: {lessonsSchema}`),
        HumanMessagePromptTemplate.fromTemplate(`
            Here is the lessons: {lessons}
          `),
      ]);

      const createCoursePrompt = await createLessonPromptTemplate.invoke({
        lessons,
        lessonsSchema: JSON.stringify(zodToJsonSchema(lessonsSchema)),
      });

      const stream = await teacherAgent.stream(createCoursePrompt, {
        ...config,
        tags: ['skip_client_stream'],
      });
      let streamOutput = '';

      for await (const chunk of stream) {
        streamOutput += chunk.content;
        await dispatchCustomEvent(
          'input_json_delta',
          {
            type: 'input_json_delta',
            partial_json: chunk.content,
          },
          config,
        );
      }

      const lessonsOutput = JSON.parse(streamOutput);
      for (const lessonBody of lessonsOutput) {
        const createLessonPayload = {
          moduleId: moduleId,
          body: lessonBody,
        };

        const lessonNode = await createLesson(createLessonPayload, userId);
        createdLessons.push({
          lessonId: lessonNode.id,
          title: lessonBody.title,
          description: lessonBody.description,
        });
      }

      return JSON.stringify({ moduleId: moduleNode.id, createdLessons });
    },
    {
      name: 'create-lessons',
      description: 'Create the lessons for the module',
      schema: createLessonsSchema,
    },
  );
