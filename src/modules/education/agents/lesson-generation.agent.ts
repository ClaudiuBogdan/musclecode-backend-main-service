import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { Lesson, Exercise, QuizQuestion } from '../interfaces/course.interface';
import { escapeCurlyBraces } from './utils';
@Injectable()
export class LessonGenerationAgent {
  private readonly logger = new Logger(LessonGenerationAgent.name);
  private readonly llm: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
    this.llm = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName:
        this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
      temperature: 0.2,
      configuration: {
        baseURL: this.configService.get<string>('OPENAI_API_URL'),
      },
    });
  }

  /**
   * Generates a complete lesson with content, exercises, and quizzes
   */
  async generateLesson(
    moduleTitle: string,
    lessonTitle: string,
    lessonDescription: string,
    difficultyLevel: string,
    researchContent?: string,
  ): Promise<Partial<Lesson>> {
    try {
      // Generate the main lesson content
      const content = await this.generateLessonContent(
        moduleTitle,
        lessonTitle,
        lessonDescription,
        difficultyLevel,
        researchContent,
      );

      // Generate exercises
      const exercises = await this.generateExercises(
        lessonTitle,
        lessonDescription,
        difficultyLevel,
        content,
      );

      // Generate quiz questions
      const quizQuestions = await this.generateQuizQuestions(
        lessonTitle,
        content,
      );

      return {
        title: lessonTitle,
        description: lessonDescription,
        content,
        exercises,
        quizQuestions,
      };
    } catch (error) {
      this.logger.error(
        `Error generating lesson: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Generates the main content for a lesson
   */
  private async generateLessonContent(
    moduleTitle: string,
    lessonTitle: string,
    lessonDescription: string,
    difficultyLevel: string,
    researchContent?: string,
  ): Promise<string> {
    try {
      const contentPrompt = PromptTemplate.fromTemplate(`
        You are a professional educator creating a lesson on "${lessonTitle}" which is part of a module on "${moduleTitle}".
        
        Lesson description: ${lessonDescription}
        Difficulty level: ${difficultyLevel}
        
        Based on the following research content, create a comprehensive lesson that explains concepts clearly, 
        provides examples, and follows educational best practices.
        
        Research content:
        {researchContent}
        
        Your lesson should include:
        1. An introduction explaining the importance of the topic
        2. Clear explanations of key concepts
        3. Code examples where applicable
        4. Visual descriptions (which could be later converted to diagrams)
        5. A summary of the main points
        
        Format the content using Markdown, with appropriate headings, bullet points, and code blocks.
      `);

      const stringOutputParser = new StringOutputParser();

      const formattedPrompt = await contentPrompt.format({
        researchContent: researchContent
          ? researchContent.substring(0, 6000) // Limit research content size if needed
          : '',
      });

      return await this.llm.pipe(stringOutputParser).invoke(formattedPrompt);
    } catch (error) {
      this.logger.error(
        `Error generating lesson content: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Generates exercises for a lesson
   */
  private async generateExercises(
    lessonTitle: string,
    lessonDescription: string,
    difficultyLevel: string,
    lessonContent: string,
  ): Promise<Exercise[]> {
    try {
      const exercisesParser = StructuredOutputParser.fromZodSchema(
        z.array(
          z.object({
            title: z.string().describe('Title of the exercise'),
            description: z
              .string()
              .describe('Detailed description of the exercise'),
            difficulty: z
              .enum(['beginner', 'intermediate', 'advanced'])
              .describe('Difficulty level'),
            expectedOutput: z
              .string()
              .optional()
              .describe('Expected output or result'),
            solutionCode: z
              .string()
              .optional()
              .describe('Solution code if applicable'),
          }),
        ),
      );

      const exercisesPrompt = PromptTemplate.fromTemplate(`
        Create 1 practical exercises for a lesson on "${lessonTitle}".
        The lesson covers: ${lessonDescription}
        Difficulty level: ${difficultyLevel}
        
        Based on the following lesson content, design exercises that test understanding and application of key concepts.
        
        Lesson content (excerpt):
        {lessonContent}
        
        Exercises should vary in difficulty and type (e.g., coding exercises, conceptual questions, analysis tasks).
        For coding exercises, include expected output and solution code where applicable.
        
        ${escapeCurlyBraces(exercisesParser.getFormatInstructions())}
      `);

      const stringOutputParser = new StringOutputParser();

      const formattedPrompt = await exercisesPrompt.format({
        lessonContent: lessonContent.substring(0, 3000), // Limit content size for the prompt
      });

      const exercisesOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);
      const parsedExercises = await exercisesParser.parse(exercisesOutput);

      // Add unique IDs to exercises
      return parsedExercises.map((exercise, index) => ({
        id: `ex-${Date.now()}-${index}`,
        lessonId: '', // Will be filled in later when lesson is created
        ...exercise,
      }));
    } catch (error) {
      this.logger.error(
        `Error generating exercises: ${error.message}`,
        error.stack,
      );
      // Return empty array in case of error to not block lesson creation
      return [];
    }
  }

  /**
   * Generates quiz questions for a lesson
   */
  private async generateQuizQuestions(
    lessonTitle: string,
    lessonContent: string,
  ): Promise<QuizQuestion[]> {
    try {
      const quizParser = StructuredOutputParser.fromZodSchema(
        z.array(
          z.object({
            question: z.string().describe('The quiz question'),
            options: z.array(z.string()).describe('Multiple choice options'),
            answer: z.string().describe('The correct answer'),
            hint: z.string().describe('A hint for the answer'),
            explanation: z
              .string()
              .describe('Explanation of why the correct answer is correct'),
          }),
        ),
      );

      const quizPrompt = PromptTemplate.fromTemplate(`
        Create 3-5 multiple-choice quiz questions for a lesson on "${lessonTitle}".
        
        Based on the following lesson content, design questions that test understanding of key concepts.
        
        Lesson content (excerpt):
        {lessonContent}
        
        Each question should have 4 options, with only one correct answer.
        Include an explanation for why the correct answer is right and why others are wrong.
        
        ${escapeCurlyBraces(quizParser.getFormatInstructions())}
      `);

      const stringOutputParser = new StringOutputParser();

      const formattedPrompt = await quizPrompt.format({
        lessonContent: lessonContent.substring(0, 3000), // Limit content size for the prompt
      });

      const quizOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);
      const parsedQuestions = await quizParser.parse(quizOutput);

      // Add unique IDs to quiz questions
      return parsedQuestions.map((question, index) => ({
        id: `quiz-${Date.now()}-${index}`,
        lessonId: '', // Will be filled in later when lesson is created
        ...question,
      }));
    } catch (error) {
      this.logger.error(
        `Error generating quiz questions: ${error.message}`,
        error.stack,
      );
      // Return empty array in case of error to not block lesson creation
      return [];
    }
  }
}
