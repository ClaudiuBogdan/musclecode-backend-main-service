import { ContentService } from 'src/modules/content/content.service';
import {
  moduleSchema,
  ModuleSchemaType,
  createModuleSchema,
  CreateModuleSchemaType,
  editModuleSchema,
  EditModuleSchemaType,
} from './schema';
import { tool } from '@langchain/core/tools';
import { RunnableConfig } from '@langchain/core/runnables';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ContentStatus } from '@prisma/client';
import { dispatchCustomEvent } from '@langchain/core/callbacks/dispatch';

export const createModuleTool = (
  apiKey: string,
  model: string,
  createModule: ContentService['createModule'],
) =>
  tool(
    async (
      input: CreateModuleSchemaType,
      config?: RunnableConfig,
    ): Promise<string> => {
      const userId = config?.metadata?.userId as string | undefined;

      if (!userId) {
        throw new Error('User ID is required');
      }

      const teacherAgent = new ChatGoogleGenerativeAI({
        apiKey,
        model,
        temperature: 0.3,
        json: true,
        streaming: true,
      });

      const createModulePromptTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(`
            You are a teacher. You are given a module prompt and you need to generate a module.
            You should consider how many lessons the module should have based on the complexity of the module. If the user asks for a specific number of lessons, you should generate that number of lessons.
            This is the schema for the module: {moduleSchema}`),
        HumanMessagePromptTemplate.fromTemplate(`
            Here is the module prompt: {modulePrompt}
          `),
      ]);

      const createModulePrompt = await createModulePromptTemplate.invoke({
        modulePrompt: input.modulePrompt,
        moduleSchema: JSON.stringify(zodToJsonSchema(moduleSchema)),
      });

      const stream = await teacherAgent.stream(createModulePrompt, {
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
      const moduleOutput = JSON.parse(streamOutput);
      const moduleBody = Array.isArray(moduleOutput)
        ? moduleOutput[0]
        : moduleOutput;
      const createModulePayload = {
        description: moduleBody.description,
        status: ContentStatus.DRAFT,
        body: moduleBody,
        metadata: {},
      };

      const module = await createModule(createModulePayload, userId);

      return JSON.stringify({ moduleId: module.id, moduleBody });
    },
    {
      name: 'create-module',
      description:
        'Create a module (or course) draft with 1 to 3 lessons. The module should be engaging and interesting for the user. After creating the module, ask the there is any change they would like to make or if they want to create the lessons.',
      schema: createModuleSchema,
    },
  );

export const editModuleTool = (
  apiKey: string,
  model: string,
  getModule: ContentService['getModule'],
  editModule: ContentService['editModule'],
) =>
  tool(
    async (
      input: EditModuleSchemaType,
      config?: RunnableConfig,
    ): Promise<string> => {
      const userId = config?.metadata?.userId as string;

      if (!userId) {
        throw new Error('User ID is required');
      }

      const moduleNode = await getModule(input.moduleId, userId);

      if (!moduleNode) {
        throw new Error('Module not found');
      }

      const module = moduleNode.body as ModuleSchemaType;

      const editModulePromptTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(`
            You are a teacher. You are given a module prompt and you need to edit an already created module.
            This is the module you need to edit: {module}
            You should generate a new module object with the edited content.
            This is the schema for the module: {moduleSchema}`),
        HumanMessagePromptTemplate.fromTemplate(`
            Here is the module prompt: {modulePrompt}
          `),
      ]);

      const editModulePrompt = await editModulePromptTemplate.invoke({
        modulePrompt: input.modulePrompt,
        moduleSchema: JSON.stringify(zodToJsonSchema(moduleSchema)),
        module: JSON.stringify(module),
      });

      const teacherAgent = new ChatGoogleGenerativeAI({
        apiKey,
        model,
        temperature: 0.3,
        json: true,
        streaming: true,
      });

      const stream = await teacherAgent.stream(editModulePrompt, {
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

      const moduleOutput = JSON.parse(streamOutput);
      const editModulePayload = Array.isArray(moduleOutput)
        ? moduleOutput[0]
        : moduleOutput;

      await editModule(input.moduleId, editModulePayload, userId);

      return JSON.stringify({ moduleId: input.moduleId, moduleOutput });
    },
    {
      name: 'edit-module',
      description: 'Edit the module',
      schema: editModuleSchema,
    },
  );
