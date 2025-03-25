import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import {
  AlgorithmPreview,
  GeneratedAlgorithmTemplate,
  AlgorithmFile,
  Lesson,
} from '../interfaces/algorithm-collection.interface';
import { escapeCurlyBraces } from './utils';

@Injectable()
export class AlgorithmGenerationAgent {
  private readonly logger = new Logger(AlgorithmGenerationAgent.name);
  private readonly llm: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
    this.llm = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName:
        this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
      temperature: 0.3,
      configuration: {
        baseURL: this.configService.get<string>('OPENAI_API_URL'),
      },
    });
  }

  /**
   * Generates a complete algorithm template with lessons, files and tests
   */
  async generateAlgorithmTemplate(
    algorithmPreview: AlgorithmPreview,
    language: string,
  ): Promise<GeneratedAlgorithmTemplate> {
    try {
      // Generate the main algorithm components
      const algorithmDetails = await this.generateAlgorithmDetails(
        algorithmPreview,
        language,
      );

      // Generate the algorithm files (template, solution, tests)
      const files = await this.generateAlgorithmFiles(
        algorithmPreview.title,
        algorithmDetails.templateStructure,
        algorithmDetails.solutionStructure,
        language,
      );

      // Generate lessons with theory and examples
      const lessons = await this.generateLessons(
        algorithmPreview.title,
        algorithmDetails.conceptsExplanation,
        language,
      );

      return {
        title: algorithmPreview.title,
        categories: algorithmPreview.categories,
        summary: algorithmPreview.summary,
        difficulty: algorithmPreview.difficulty,
        tags: [...algorithmPreview.categories, language],
        files,
        lessons,
      };
    } catch (error) {
      this.logger.error(
        `Error generating algorithm template: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Generates the detailed structure and explanation for an algorithm
   */
  private async generateAlgorithmDetails(
    algorithmPreview: AlgorithmPreview,
    language: string,
  ): Promise<{
    templateStructure: string;
    solutionStructure: string;
    conceptsExplanation: string;
  }> {
    try {
      const detailsParser = StructuredOutputParser.fromZodSchema(
        z.object({
          templateStructure: z
            .string()
            .describe(
              'The structure of the algorithm template file with placeholders for the implementation',
            ),
          solutionStructure: z
            .string()
            .describe('The full solution implementation of the algorithm'),
          conceptsExplanation: z
            .string()
            .describe(
              'Detailed explanation of concepts needed to understand and implement the algorithm',
            ),
        }),
      );

      // Use ChatPromptTemplate instead of PromptTemplate
      const detailsPromptContent = `
        You are an expert programming instructor designing a coding challenge.
        
        Create a detailed algorithm challenge based on the following information:
        
        Title: ${algorithmPreview.title}
        Summary: ${algorithmPreview.summary}
        Difficulty: ${algorithmPreview.difficulty}
        Categories: ${algorithmPreview.categories.join(', ')}
        Language: ${language}
        
        Your response should include:
        1. A template structure with placeholders where the student will implement the algorithm
        2. A full solution implementation
        3. A detailed explanation of the key concepts and techniques required
        
        ${detailsParser.getFormatInstructions()}
      `;

      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(
          'You are an expert programming instructor.',
        ),
        HumanMessagePromptTemplate.fromTemplate(detailsPromptContent),
      ]);

      const stringOutputParser = new StringOutputParser();

      const formattedPrompt = await chatPrompt.formatMessages({});
      const detailsOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);

      return await detailsParser.parse(detailsOutput);
    } catch (error) {
      this.logger.error(
        `Error generating algorithm details: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Generates the algorithm files (template, solution, tests)
   */
  private async generateAlgorithmFiles(
    title: string,
    templateStructure: string,
    solutionStructure: string,
    language: string,
  ): Promise<AlgorithmFile[]> {
    try {
      const filesParser = StructuredOutputParser.fromZodSchema(
        z.array(
          z.object({
            name: z.string().describe('Filename with appropriate extension'),
            content: z.string().describe('File content'),
            language: z.string().describe('Programming language of the file'),
            isTemplate: z
              .boolean()
              .describe('Whether this is a template file for the student'),
            isSolution: z.boolean().describe('Whether this is a solution file'),
            isTest: z.boolean().describe('Whether this is a test file'),
          }),
        ),
      );

      // Use ChatPromptTemplate instead of PromptTemplate
      const filesPromptContent = `
        Create the necessary files for the algorithm challenge: "${title}" in ${language}.
        
        Template structure:
        ${templateStructure}
        
        Solution structure:
        ${solutionStructure}
        
        Generate the following files:
        1. A template file that the student will complete
        2. A solution file with the complete implementation 
        3. A test file to verify the student's implementation
        
        Use proper file extensions, naming conventions, and testing frameworks appropriate for ${language}.
        
        ${escapeCurlyBraces(filesParser.getFormatInstructions())}
      `;

      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(
          'You are an expert programmer and educator.',
        ),
        HumanMessagePromptTemplate.fromTemplate(filesPromptContent),
      ]);

      const stringOutputParser = new StringOutputParser();

      const formattedPrompt = await chatPrompt.formatMessages({});
      const filesOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);

      return await filesParser.parse(filesOutput);
    } catch (error) {
      this.logger.error(
        `Error generating algorithm files: ${error.message}`,
        error.stack,
      );
      // Return basic files on error to avoid completely failing
      return this.createFallbackFiles(
        title,
        templateStructure,
        solutionStructure,
        language,
      );
    }
  }

  /**
   * Creates fallback files in case the main generator fails
   */
  private createFallbackFiles(
    title: string,
    templateStructure: string,
    solutionStructure: string,
    language: string,
  ): AlgorithmFile[] {
    const fileExtension = this.getFileExtension(language);

    return [
      {
        name: `${this.slugify(title)}_template.${fileExtension}`,
        content: templateStructure,
        language: language.toLowerCase(),
        isTemplate: true,
        isSolution: false,
        isTest: false,
      },
      {
        name: `${this.slugify(title)}_solution.${fileExtension}`,
        content: solutionStructure,
        language: language.toLowerCase(),
        isTemplate: false,
        isSolution: true,
        isTest: false,
      },
      {
        name: `${this.slugify(title)}_test.${fileExtension}`,
        content: `// Basic test for ${title}`,
        language: language.toLowerCase(),
        isTemplate: false,
        isSolution: false,
        isTest: true,
      },
    ];
  }

  /**
   * Generates lessons with theory, examples, and quizzes
   */
  private async generateLessons(
    title: string,
    conceptsExplanation: string,
    language: string,
  ): Promise<Lesson[]> {
    try {
      const lessonsParser = StructuredOutputParser.fromZodSchema(
        z.array(
          z.object({
            title: z.string().describe('Title of the lesson'),
            content: z
              .string()
              .describe(
                'Markdown content of the lesson with explanations and examples',
              ),
            order: z.number().describe('Order of the lesson in the sequence'),
            quizzes: z
              .array(
                z.object({
                  question: z
                    .string()
                    .describe('Quiz question related to the lesson content'),
                  options: z
                    .array(z.string())
                    .describe('Multiple choice options'),
                  correctOptionIndex: z
                    .number()
                    .describe('Index of the correct option (0-based)'),
                  explanation: z
                    .string()
                    .describe(
                      'Explanation of why the correct answer is correct',
                    ),
                }),
              )
              .optional()
              .describe('Optional quiz questions for the lesson'),
          }),
        ),
      );

      // Use ChatPromptTemplate instead of PromptTemplate
      const lessonsPromptContent = `
        Create educational lessons for the algorithm: "${title}" in ${language}.
        
        Concepts explanation:
        ${conceptsExplanation}
        
        Create 2-3 lessons that teach the necessary concepts to understand and implement the algorithm.
        Each lesson should build on the previous one in a logical progression.
        
        Format each lesson using Markdown, including:
        1. Clear explanation of concepts
        2. Code examples
        3. Step-by-step explanations
        4. 2-3 quiz questions per lesson to test understanding
        
        ${escapeCurlyBraces(lessonsParser.getFormatInstructions())}
      `;

      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(
          'You are an expert educational content creator.',
        ),
        HumanMessagePromptTemplate.fromTemplate(lessonsPromptContent),
      ]);

      const stringOutputParser = new StringOutputParser();

      const formattedPrompt = await chatPrompt.formatMessages({});
      const lessonsOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);

      return await lessonsParser.parse(lessonsOutput);
    } catch (error) {
      this.logger.error(
        `Error generating algorithm lessons: ${error.message}`,
        error.stack,
      );
      // Return a basic lesson on error to avoid completely failing
      return [
        {
          title: `Introduction to ${title}`,
          content: conceptsExplanation || `Basic introduction to ${title}`,
          order: 0,
          quizzes: [],
        },
      ];
    }
  }

  /**
   * Helper to get file extension based on language
   */
  private getFileExtension(language: string): string {
    const languageMap: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      'c++': 'cpp',
      cpp: 'cpp',
      c: 'c',
      'c#': 'cs',
      csharp: 'cs',
      ruby: 'rb',
      php: 'php',
      go: 'go',
      rust: 'rs',
      swift: 'swift',
      kotlin: 'kt',
      dart: 'dart',
    };

    return languageMap[language.toLowerCase()] || 'txt';
  }

  /**
   * Helper to convert a string to a URL-friendly slug
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_')
      .replace(/^-+|-+$/g, '');
  }
}
