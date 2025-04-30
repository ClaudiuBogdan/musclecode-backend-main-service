/*
 * Enhanced Lesson-Authoring Schema & Prompt
 * --------------------------------------------------
 * Goal: Produce lessons that balance clear explanatory text with interactive elements, maximising engagement and retention.
 * The API surface (field names & types) is preserved for backward compatibility; only descriptions and authoring guidance are refined.
 */

import { z } from 'zod';

/*
 * ──────────────────────────────────────────────────────────────
 *  MODULE-LEVEL SCHEMA
 * ──────────────────────────────────────────────────────────────
 */
export const moduleSchema = z
  .object({
    type: z
      .literal('module')
      .describe('Constant string identifying the object as a module'),
    title: z
      .string()
      .describe(
        'Concise, descriptive name for the module (5-10 words). Should convey the overarching theme',
      ),
    description: z
      .string()
      .describe(
        'Brief summary (1-3 sentences) outlining what the learner will achieve by completing this module',
      ),
    lessons: z
      .array(
        z.object({
          title: z
            .string()
            .describe(
              'Lesson title (max 10 words). Build a logical learning path across lessons',
            ),
          description: z
            .string()
            .describe(
              'One-sentence overview of the lesson’s focus and expected takeaway',
            ),
        }),
      )
      .describe(
        'Ordered list of lessons (recommended 1-5). Sequence from fundamentals to advanced topics to support scaffolding',
      ),
  })
  .describe(
    'Complete module definition. Use self-contained titles/descriptions so the module can be understood without external context',
  );

export type ModuleSchemaType = z.infer<typeof moduleSchema>;

/*
 * ──────────────────────────────────────────────────────────────
 *  PROMPT SCHEMAS
 * ──────────────────────────────────────────────────────────────
 */
export const createModuleSchema = z.object({
  modulePrompt: z
    .string()
    .describe(
      'Detailed second-person instructions describing the desired module. Include learning objectives, target audience, prior knowledge, tone, and any constraints',
    ),
});
export type CreateModuleSchemaType = z.infer<typeof createModuleSchema>;

export const editModuleSchema = z.object({
  moduleId: z
    .string()
    .describe(
      'Unique identifier of the module to edit (obtainable from prior conversation or database)',
    ),
  modulePrompt: z
    .string()
    .describe(
      'Instructions detailing what and why to modify (add lesson, tweak difficulty, change tone, etc.)',
    ),
});
export type EditModuleSchemaType = z.infer<typeof editModuleSchema>;

export const createLessonsSchema = z.object({
  moduleId: z.string().describe('Identifier of the parent module'),
  lessonRequirements: z
    .string()
    .optional()
    .describe(
      'Optional user-supplied constraints for the lesson (e.g., focus on real-world examples, include extra quizzes). Omit if none',
    ),
});
export type CreateLessonsSchemaType = z.infer<typeof createLessonsSchema>;

/*
 * ──────────────────────────────────────────────────────────────
 *  LESSON CONTENT TYPES
 * ──────────────────────────────────────────────────────────────
 */
export const lessonContentSchema = z.discriminatedUnion('type', [
  /* ───────────── TITLE ───────────── */
  z.object({
    id: z.string().describe('Stable unique ID (ULID or UUID)'),
    type: z.literal('title').describe('Title of the chunk for note type'),
    title: z.string().describe('Title of the chunk for note type'),
    titleType: z
      .enum(['h1', 'h2'])
      .describe(
        'Type of the title. The first chunk in a note should be h1, the rest should be h2',
      ),
  }),

  /* ───────────── TEXT (explanatory) ───────────── */
  z.object({
    id: z.string().describe('Stable unique ID (ULID or UUID)'),
    type: z.literal('text').describe('Explanatory paragraph'),
    text: z
      .string()
      .describe(
        '150-300 word chunk introducing a single concept in clear, conversational language.',
      ),
  }),

  /* ───────────── QUOTE / CALLOUT ───────────── */
  z.object({
    id: z.string().describe('Stable unique ID'),
    type: z.literal('quote').describe(`
The quote element is used to display special type of information, like an analogy, note, example, tip, warning, or question. It is used to highlight the information and make it more engaging.
When creating a quote, you should use the quoteType to identify the type of quote.
      `),
    quoteType: z
      .enum(['analogy', 'note', 'example', 'tip', 'warning', 'question'])
      .describe('Purpose of the call-out'),
    title: z
      .string()
      .describe('Short label (≤6 words) describing the call-out purpose'),
    quote: z
      .string()
      .describe('40-100 word text displayed in a stylised box to aid memory'),
  }),

  /* ───────────── MULTIPLE-CHOICE QUIZ ───────────── */
  z.object({
    id: z.string().describe('Stable unique ID'),
    type: z.literal('quiz').describe('Multiple-choice question'),
    question: z
      .string()
      .describe('Direct question testing the immediately preceding concept'),
    options: z
      .array(
        z.object({
          option: z.string().describe('Answer choice text'),
          isAnswer: z.boolean().describe('Exactly **one** option must be true'),
          hint: z
            .string()
            .optional()
            .describe('Short explanation (max 50 words) revealed after answer'),
        }),
      )
      .min(3)
      .max(5)
      .describe('List of 3-5 answer choices'),
  }),

  /* ───────────── OPEN QUESTION ───────────── */
  z.object({
    id: z.string().describe('Stable unique ID'),
    type: z
      .literal('question')
      .describe(
        'A question that evaluate the user knowledge of the previous content. Make sure the question can only be answered based on the criteria provided, allowing little room for interpretation.',
      ),
    question: z
      .string()
      .describe('Requires typed answer or short discussion from learner'),
    correctionCriteria: z
      .array(
        z.object({
          answer: z.string().describe('Canonical answer or rubric bullet'),
          points: z
            .number()
            .describe('Score awarded if learner meets this criterion'),
          explanation: z
            .string()
            .describe('Reference explanation shown after grading'),
        }),
      )
      .min(1)
      .describe('Rubric items to enable automated or self-grading'),
  }),

  /* ───────────── FLASHCARD ───────────── */
  z.object({
    id: z.string().describe('Stable unique ID'),
    type: z.literal('flashcard').describe('Front/back recall card'),
    front: z
      .string()
      .describe('Prompt (≤120 characters). Phrase as a question when possible'),
    back: z
      .string()
      .describe(
        'Answer (≤250 characters). Keep terse; link back to lesson text',
      ),
  }),
]);

/*
 * ──────────────────────────────────────────────────────────────
 *  LESSON STRUCTURE
 * ──────────────────────────────────────────────────────────────
 */
export const lessonChunkSchema = z
  .object({
    id: z.string().describe('Stable unique ID for the chunk'),
    title: z.string().describe('Title of the chunk'),
    type: z.enum(['note', 'question', 'flashcard']).describe(
      `
Chunk categories: "note" (explanatory) must contain ≥3 text item and should use ≥2 quote items, such as "analogy", "example", etc. 
Remember to use the quoteType to identify the type of quote, for example: quoteType: "example". Type "question" and "flashcard" must contain exactly 1 corresponding content item
When referencing a chunk, use the title of the chunk. The user doesn't need to know the id or index of the chunk, only the title.
`,
    ),
    content: z
      .array(lessonContentSchema)
      .describe(
        'Items within the chunk. Maintain logical cohesion: each chunk addresses a single micro-topic',
      ),
  })
  .describe('Logical slice of the lesson used to track learner progress');

export const lessonSchema = z
  .object({
    title: z.string().describe('Lesson title'),
    description: z.string().describe('Lesson abstract (1-2 sentences)'),
    chunks: z
      .array(lessonChunkSchema)
      .min(8)
      .max(12)
      .describe(
        'Sequence of 8-12 chunks. Strive for ≈60 % "note" chunks and ≈40 % practice (quiz, question, flashcard). Start with a note; end with a verifiable question from the learning content where the user write the answer, and there a fixed criteria for the answer',
      ),
  })
  .describe('Complete lesson blueprint delivered to the client application');
