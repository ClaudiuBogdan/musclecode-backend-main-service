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
  lessonRequirements: z
    .string()
    .optional()
    .describe(
      'The lesson requirements from the user prompt, only if provided and are relevant to generate the lesson with specific requirements.',
    ),
});

export const lessonContentSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string().describe('Unique ID of the content item'),
    type: z.literal('text').describe('The content type as text'),
    text: z.string().describe('The text content'),
  }),
  z.object({
    id: z.string().describe('Unique ID of the content item'),
    type: z.literal('quote').describe('The content type as a quote'),
    quoteType: z
      .enum(['analogy', 'note', 'example', 'tip', 'warning', 'question'])
      .describe('Specifies the type of quote'),
    title: z.string().describe('Title of the quote'),
    quote: z.string().describe('The quote text'),
  }),
  z.object({
    id: z.string().describe('Unique ID of the content item'),
    type: z.literal('quiz').describe('The content type as a quiz'),
    question: z.string().describe('The quiz question.'),
    options: z
      .array(
        z.object({
          option: z.string().describe('The quiz option'),
          isAnswer: z
            .boolean()
            .describe(
              'Whether this option is correct. Only one option should be correct.',
            ),
          hint: z
            .string()
            .optional()
            .describe(
              'Optional hint for this option. Should help the user understand why is correct or not related to the question and the option selected.',
            ),
        }),
      )
      .describe('Array of quiz options. Only one option should be correct.'),
  }),
  z.object({
    id: z.string().describe('Unique ID of the content item'),
    type: z.literal('question').describe('The content type as a question'),
    question: z.string().describe('The question prompt'),
    correctionCriteria: z
      .array(
        z.object({
          answer: z.string().describe('The answer text'),
          points: z.number().describe('Points for this answer'),
          explanation: z
            .string()
            .describe(
              'Explanation for the answer. Should help the user understand why is correct or not related to the question and the option selected.',
            ),
        }),
      )
      .describe('Array of correction criteria for the question'),
  }),
  z.object({
    id: z.string().describe('Unique ID of the content item'),
    type: z.literal('flashcard').describe('The content type as a flashcard'),
    front: z.string().describe('The front text of the flashcard'),
    back: z.string().describe('The back text of the flashcard'),
  }),
]);

export const lessonChunkSchema = z
  .object({
    id: z.string().describe('Unique ID of the lesson chunk'),
    type: z
      .enum(['note', 'question', 'flashcard'])
      .describe('The type of the lesson chunk'),
    content: z
      .array(lessonContentSchema)
      .describe(
        'Array of content items for this chunk. When creating note chunck, you can use text, quotes, etc, to make the content clear. When using question or flashcard, add only one test per chunk.',
      ),
  })
  .describe('A chunk of the lesson containing related content items');

export const lessonSchema = z
  .object({
    title: z.string().describe('The title of the lesson'),
    description: z.string().describe('The description of the lesson'),
    chunks: z
      .array(lessonChunkSchema)
      .describe('Chunks of the lesson, each grouping content items'),
  })
  .describe(
    'A complete lesson object. The lesson should have 10 chunks approximately, based on the lesson complexity. You should use notes for learning new concepts, then other test elements like flashcards or questions to evaluate the user grasp of the lesson. The info and test chunks should be mixed together. Focus on creating engaging content.',
  );

export type CreateLessonsSchemaType = z.infer<typeof createLessonsSchema>;
