import { z } from 'zod';
export const moduleSchema = z
  .object({
    type: z.literal('module').describe('The type of the module'),
    title: z.string().describe('The title of the module'),
    description: z.string().describe('The description of the module'),
    lessons: z
      .array(
        z.object({
          title: z.string().describe('The title of the lesson'),
          description: z.string().describe('The description of the lesson'),
        }),
      )
      .describe(
        'The lessons of the module. Between 1 and 3 lessons are recommended.',
      ),
  })
  .describe('The module object. It contains a title, description and lessons.');

export type ModuleSchemaType = z.infer<typeof moduleSchema>;

export const createModuleSchema = z.object({
  modulePrompt: z
    .string()
    .describe(
      `The prompt for the module (it's like a course). Write details instructions about what the module should contain.`,
    ),
});

export type CreateModuleSchemaType = z.infer<typeof createModuleSchema>;

export const editModuleSchema = z.object({
  moduleId: z
    .string()
    .describe(
      'The id of the module. The id should be available in the history of the conversation. If is not available, ask the user to provide the id.',
    ),
  modulePrompt: z
    .string()
    .describe(
      `The prompt for the module. Write details instructions about what the module should be edited.`,
    ),
});

export type EditModuleSchemaType = z.infer<typeof editModuleSchema>;

export const createLessonsSchema = z.object({
  moduleId: z.string().describe('The id of the module'),
});

export const lessonsSchema = z
  .array(
    z
      .object({
        title: z.string().describe('The title of the lesson'),
        description: z.string().describe('The description of the lesson'),
        content: z
          .string()
          .describe('The content of the lesson in markdown format'),
      })
      .describe(
        'The lesson object. It contains a title, description and content.',
      ),
  )
  .describe('The lessons array of the module.');

export type CreateLessonsSchemaType = z.infer<typeof createLessonsSchema>;
