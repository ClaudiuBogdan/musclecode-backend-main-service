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
import { v4 as uuidv4 } from 'uuid';
import {
  AlgorithmPreview,
  GeneratedAlgorithmTemplate,
  AlgorithmFile,
  AlgorithmLesson,
  ExercisePrompt,
} from '../interfaces/algorithm-collection.interface';
import {
  AlgorithmFileType,
  CodeLanguage,
} from '../../algorithm/interfaces/algorithm.interface';

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

      // Generate lessons with theory, examples, and exercises
      const lessons = await this.generateLessons(
        algorithmPreview.title,
        algorithmDetails.conceptsExplanation,
        language,
      );

      // Generate the algorithm files (template, solution, tests) based on lessons
      const files = await this.generateAlgorithmFiles(
        algorithmPreview.title,
        lessons,
        language,
      );

      // Define the current date for createdAt and updatedAt
      const now = new Date();

      return {
        id: uuidv4(),
        title: algorithmPreview.title,
        categories: algorithmPreview.categories,
        summary: algorithmPreview.summary,
        difficulty: algorithmPreview.difficulty,
        tags: [...algorithmPreview.categories, language],
        lessons,
        files,
        createdAt: now,
        updatedAt: now,
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
    conceptsExplanation: string;
  }> {
    try {
      const detailsParser = StructuredOutputParser.fromZodSchema(
        z.object({
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
        A detailed explanation of the key concepts and techniques required to understand the algorithm.
        
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
   * Generates lessons with theory, examples, and exercises
   */
  private async generateLessons(
    title: string,
    conceptsExplanation: string,
    programmingLanguage: string,
  ): Promise<AlgorithmLesson[]> {
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
            exercisePrompts: z
              .array(
                z.object({
                  title: z.string().describe('Title of the exercise'),
                  description: z
                    .string()
                    .describe(
                      'Detailed description of what the exercise task is',
                    ),
                  difficulty: z
                    .enum(['beginner', 'intermediate', 'advanced'])
                    .describe('Difficulty level of the exercise'),
                  expectedOutput: z
                    .string()
                    .optional()
                    .describe('Expected output or result of the exercise'),
                  solutionCode: z
                    .string()
                    .describe(
                      `Complete solution code for the exercise in ${programmingLanguage}`,
                    ),
                }),
              )
              .min(1)
              .describe(
                'Coding exercises related to this lesson that will be implemented into files',
              ),
          }),
        ),
      );

      const lessonsPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(
          'You are an expert educational content creator specialized in programming education.',
        ),
        HumanMessagePromptTemplate.fromTemplate(`
          Create 2-3 educational lessons for the algorithm: "${title}" in ${programmingLanguage}.
          
          Concepts explanation:
          ${conceptsExplanation}
          
          Create lessons that teach the necessary concepts to understand and implement the algorithm.
          Each lesson should build on the previous one in a logical progression.
          
          Format each lesson using Markdown, including:
          1. Clear explanation of concepts
          2. Code examples in ${programmingLanguage}
          3. Step-by-step explanations
          4. 2-3 quiz questions per lesson to test understanding
          5. 1-2 coding exercises per lesson that are practical implementations related to the lesson content
          
          Each exercise should include:
          - A clear title and description of what to implement
          - A complete solution in ${programmingLanguage} (this will later be separated into template and solution files)
          - The difficulty level
          - Expected output when applicable
          
          ${lessonsParser.getFormatInstructions()}
        `),
      ]);

      const stringOutputParser = new StringOutputParser();

      const formattedPrompt = await lessonsPrompt.formatMessages({});
      const lessonsOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);

      const parsedLessons = await lessonsParser.parse(lessonsOutput);

      // Add unique IDs and lessonIds to the lessons and exercises
      return parsedLessons.map((lesson) => {
        const lessonId = uuidv4();

        // Add IDs to quizzes
        const quizzes = lesson.quizzes
          ? lesson.quizzes.map((quiz) => ({
              ...quiz,
              id: uuidv4(),
            }))
          : [];

        // Add IDs and lessonId to exercise prompts
        const exercisePrompts = lesson.exercisePrompts
          ? lesson.exercisePrompts.map((exercise) => ({
              ...exercise,
              id: uuidv4(),
              lessonId,
            }))
          : [];

        return {
          ...lesson,
          id: lessonId,
          quizzes,
          exercisePrompts,
        };
      });
    } catch (error) {
      this.logger.error(
        `Error generating algorithm lessons: ${error.message}`,
        error.stack,
      );
      // Return a basic lesson on error to avoid completely failing
      return [
        {
          id: uuidv4(),
          title: `Introduction to ${title}`,
          content: conceptsExplanation || `Basic introduction to ${title}`,
          order: 0,
          quizzes: [],
          exercisePrompts: [
            {
              id: uuidv4(),
              lessonId: uuidv4(),
              title: `Basic ${title} Exercise`,
              description: `Implement a simple version of ${title}`,
              difficulty: 'beginner',
              solutionCode: `// Basic solution for ${title}\nconsole.log("Hello World");`,
            },
          ],
        },
      ];
    }
  }

  /**
   * Generates the algorithm files (exercise, test) from lessons and exercise prompts
   */
  private async generateAlgorithmFiles(
    title: string,
    lessons: AlgorithmLesson[],
    languageStr: string,
  ): Promise<AlgorithmFile[]> {
    try {
      const language = this.mapLanguageStringToEnum(languageStr);
      const fileExtension = this.getFileExtension(language);
      const files: AlgorithmFile[] = [];

      // For each lesson, create exercise and test files
      for (const lesson of lessons) {
        if (!lesson.exercisePrompts || lesson.exercisePrompts.length === 0) {
          continue;
        }

        // For each exercise prompt in the lesson
        for (const [
          index,
          exercisePrompt,
        ] of lesson.exercisePrompts.entries()) {
          const fileBaseName = this.getFileBaseName(lesson.title, index);

          // Create the exercise template file (with placeholders)
          const templateFile: AlgorithmFile = {
            id: uuidv4(),
            name: `${fileBaseName}_exercise.${fileExtension}`,
            type: AlgorithmFileType.EXERCISE,
            content: this.createTemplateContent(exercisePrompt, language),
            language,
            extension: fileExtension,
            lessonId: lesson.id,
            readOnly: false,
            hidden: false,
          };

          // Create the solution file
          const solutionFile: AlgorithmFile = {
            id: uuidv4(),
            name: `${fileBaseName}_solution.${fileExtension}`,
            type: AlgorithmFileType.SOLUTION,
            content: exercisePrompt.solutionCode || '// No solution provided',
            language,
            extension: fileExtension,
            lessonId: lesson.id,
            readOnly: true,
            hidden: true,
          };

          // Create the test file
          const testFile: AlgorithmFile = {
            id: uuidv4(),
            name: `${fileBaseName}_test.${fileExtension}`,
            type: AlgorithmFileType.TEST,
            content: await this.generateTestFileContent(
              exercisePrompt,
              language,
            ),
            language,
            extension: fileExtension,
            lessonId: lesson.id,
            readOnly: true,
            hidden: false,
          };

          files.push(templateFile, solutionFile, testFile);
        }
      }

      return files;
    } catch (error) {
      this.logger.error(
        `Error generating algorithm files: ${error.message}`,
        error.stack,
      );
      // Return basic files on error to avoid completely failing
      return this.createFallbackFiles(title, lessons, languageStr);
    }
  }

  /**
   * Creates exercise template content based on the exercise prompt
   */
  private createTemplateContent(
    exercisePrompt: ExercisePrompt,
    language: CodeLanguage,
  ): string {
    // Extract function/class signature from solution code
    const solutionCode = exercisePrompt.solutionCode || '';
    let templateContent = '';

    // Add description and instructions as comments
    templateContent +=
      this.formatComment(`EXERCISE: ${exercisePrompt.title}`, language) + '\n';
    templateContent +=
      this.formatComment(`DIFFICULTY: ${exercisePrompt.difficulty}`, language) +
      '\n';
    templateContent += this.formatComment(`DESCRIPTION:`, language) + '\n';

    // Format the description as comments
    const descriptionLines = exercisePrompt.description.split('\n');
    for (const line of descriptionLines) {
      templateContent += this.formatComment(line, language) + '\n';
    }

    templateContent += '\n';

    // Add expected output as a comment if it exists
    if (exercisePrompt.expectedOutput) {
      templateContent +=
        this.formatComment(`EXPECTED OUTPUT:`, language) + '\n';
      templateContent +=
        this.formatComment(exercisePrompt.expectedOutput, language) + '\n\n';
    }

    // Extract function/class signatures from the solution code and create template
    switch (language) {
      case CodeLanguage.JAVASCRIPT:
      case CodeLanguage.TYPESCRIPT:
        templateContent += this.createJavaScriptTemplate(solutionCode);
        break;
      case CodeLanguage.PYTHON:
        templateContent += this.createPythonTemplate(solutionCode);
        break;
      case CodeLanguage.JAVA:
        templateContent += this.createJavaTemplate(solutionCode);
        break;
      case CodeLanguage.CPP:
        templateContent += this.createCppTemplate(solutionCode);
        break;
      case CodeLanguage.GO:
        templateContent += this.createGoTemplate(solutionCode);
        break;
      default:
        templateContent += '// TODO: Implement your solution here\n\n';
    }

    return templateContent;
  }

  /**
   * Generate test file content for an exercise
   */
  private async generateTestFileContent(
    exercisePrompt: ExercisePrompt,
    language: CodeLanguage,
  ): Promise<string> {
    try {
      const testParser = StructuredOutputParser.fromZodSchema(
        z.object({
          testCode: z
            .string()
            .describe(
              `Test code for the exercise in ${language} that validates the solution`,
            ),
        }),
      );

      const testPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(
          'You are an expert test writer for programming exercises.',
        ),
        HumanMessagePromptTemplate.fromTemplate(`
          Create a test file for the following exercise:
          
          EXERCISE TITLE: ${exercisePrompt.title}
          DESCRIPTION: ${exercisePrompt.description}
          PROGRAMMING LANGUAGE: ${language}
          
          SOLUTION CODE:
          ${exercisePrompt.solutionCode}
          
          ${exercisePrompt.expectedOutput ? `EXPECTED OUTPUT: ${exercisePrompt.expectedOutput}` : ''}
          
          Create test code that will verify if the student's solution is correct.
          Use appropriate testing frameworks for ${language} (Jest for JavaScript/TypeScript, unittest for Python, etc.).
          The test should check if the solution produces the correct output or behavior.
          
          ${testParser.getFormatInstructions()}
        `),
      ]);

      const stringOutputParser = new StringOutputParser();
      const formattedPrompt = await testPrompt.formatMessages({});
      const testOutput = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);

      const parsedTest = await testParser.parse(testOutput);
      return parsedTest.testCode;
    } catch {
      // If test generation fails, create a basic test
      return this.createBasicTest(exercisePrompt, language);
    }
  }

  /**
   * Creates a basic test if automatic test generation fails
   */
  private createBasicTest(
    exercisePrompt: ExercisePrompt,
    language: CodeLanguage,
  ): string {
    const fnName = this.extractFunctionName(
      exercisePrompt.solutionCode || '',
      language,
    );

    switch (language) {
      case CodeLanguage.JAVASCRIPT:
      case CodeLanguage.TYPESCRIPT:
        return `// Basic test for ${exercisePrompt.title}
const { ${fnName} } = require('./${this.slugify(exercisePrompt.title)}_exercise');

describe('${exercisePrompt.title}', () => {
  test('should work with basic input', () => {
    // TODO: Replace with actual test cases
    expect(${fnName}()).toBeDefined();
  });
});`;

      case CodeLanguage.PYTHON:
        return `# Basic test for ${exercisePrompt.title}
import unittest
from ${this.slugify(exercisePrompt.title)}_exercise import ${fnName}

class Test${this.pascalCase(fnName)}(unittest.TestCase):
    def test_basic(self):
        # TODO: Replace with actual test cases
        self.assertIsNotNone(${fnName}())

if __name__ == '__main__':
    unittest.main()`;

      default:
        return `// Basic test for ${exercisePrompt.title}\n// TODO: Implement proper tests`;
    }
  }

  /**
   * Creates template for JavaScript/TypeScript exercises
   */
  private createJavaScriptTemplate(solutionCode: string): string {
    // Extract function signatures
    const functionMatches = solutionCode.match(
      /function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g,
    );
    if (functionMatches) {
      let template = '';
      for (const fnMatch of functionMatches) {
        template += `${fnMatch} {\n  // TODO: Implement this function\n}\n\n`;
      }

      // Add exports if they exist in the solution
      if (solutionCode.includes('module.exports')) {
        const exportMatch = solutionCode.match(/module\.exports\s*=\s*{[^}]*}/);
        if (exportMatch) {
          template += `\n${exportMatch[0]}\n`;
        } else {
          template +=
            '\nmodule.exports = { /* TODO: Add your functions here */ };\n';
        }
      }

      return template;
    }

    // Check for arrow functions or other patterns
    const arrowFnMatches = solutionCode.match(
      /(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>/g,
    );
    if (arrowFnMatches) {
      let template = '';
      for (const fnMatch of arrowFnMatches) {
        template += `${fnMatch} {\n  // TODO: Implement this function\n};\n\n`;
      }
      return template;
    }

    // Default template if no functions found
    return `// TODO: Implement your solution here\n\n`;
  }

  /**
   * Creates template for Python exercises
   */
  private createPythonTemplate(solutionCode: string): string {
    // Extract function definitions
    const functionMatches = solutionCode.match(
      /def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\):/g,
    );
    if (functionMatches) {
      let template = '';
      for (const fnMatch of functionMatches) {
        template += `${fnMatch}\n    # TODO: Implement this function\n    pass\n\n`;
      }
      return template;
    }

    // Default template if no functions found
    return `# TODO: Implement your solution here\n\n`;
  }

  /**
   * Creates template for Java exercises
   */
  private createJavaTemplate(solutionCode: string): string {
    // Try to extract class and method signatures
    const classMatch = solutionCode.match(
      /public\s+class\s+([a-zA-Z0-9_]+)\s*{/,
    );
    if (classMatch) {
      const className = classMatch[1];
      const methodMatches = solutionCode.match(
        /(?:public|private|protected)(?:\s+static)?\s+[a-zA-Z0-9_<>]+\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*{/g,
      );

      let template = `public class ${className} {\n`;

      if (methodMatches) {
        for (const methodMatch of methodMatches) {
          // Remove the opening brace
          const methodSignature = methodMatch.replace(/{$/, '');
          template += `    ${methodSignature} {\n        // TODO: Implement this method\n        return null; // Replace with appropriate return value\n    }\n\n`;
        }
      } else {
        template += '    // TODO: Implement your methods here\n';
      }

      template += '}\n';
      return template;
    }

    // Default template if no class found
    return `public class Solution {\n    // TODO: Implement your solution here\n}\n`;
  }

  /**
   * Creates template for C++ exercises
   */
  private createCppTemplate(solutionCode: string): string {
    // Extract function signatures
    const functionMatches = solutionCode.match(
      /(?:int|void|bool|double|float|char|std::string|auto|[a-zA-Z0-9_:]+(?:\s*<[^>]*>)?)\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*{/g,
    );

    if (functionMatches) {
      let template =
        '#include <iostream>\n#include <vector>\n#include <string>\n\n';

      for (const fnMatch of functionMatches) {
        // Remove the opening brace
        const fnSignature = fnMatch.replace(/{$/, '');
        template += `${fnSignature} {\n    // TODO: Implement this function\n}\n\n`;
      }

      return template;
    }

    // Default template
    return `#include <iostream>\n#include <vector>\n#include <string>\n\n// TODO: Implement your solution here\n`;
  }

  /**
   * Creates template for Go exercises
   */
  private createGoTemplate(solutionCode: string): string {
    // Extract function signatures
    const functionMatches = solutionCode.match(
      /func\s+([A-Z][a-zA-Z0-9_]*)\s*\([^)]*\)\s*(?:[a-zA-Z0-9_*\[\]{}]+\s*)?\{/g,
    );

    if (functionMatches) {
      let template = 'package main\n\nimport (\n\t"fmt"\n)\n\n';

      for (const fnMatch of functionMatches) {
        // Remove the opening brace
        const fnSignature = fnMatch.replace(/{$/, '');
        template += `${fnSignature} {\n\t// TODO: Implement this function\n}\n\n`;
      }

      return template;
    }

    // Default template
    return `package main\n\nimport (\n\t"fmt"\n)\n\n// TODO: Implement your solution here\n`;
  }

  /**
   * Extract function name from code
   */
  private extractFunctionName(code: string, language: CodeLanguage): string {
    switch (language) {
      case CodeLanguage.JAVASCRIPT:
      case CodeLanguage.TYPESCRIPT:
        const jsFnMatch = code.match(
          /function\s+([a-zA-Z0-9_]+)|(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=/,
        );
        return jsFnMatch ? jsFnMatch[1] || jsFnMatch[2] : 'solution';

      case CodeLanguage.PYTHON:
        const pyFnMatch = code.match(/def\s+([a-zA-Z0-9_]+)/);
        return pyFnMatch ? pyFnMatch[1] : 'solution';

      case CodeLanguage.JAVA:
        const javaMethodMatch = code.match(
          /(?:public|private|protected)(?:\s+static)?\s+[a-zA-Z0-9_<>]+\s+([a-zA-Z0-9_]+)\s*\(/,
        );
        return javaMethodMatch ? javaMethodMatch[1] : 'solution';

      case CodeLanguage.CPP:
        const cppFnMatch = code.match(
          /(?:int|void|bool|double|float|char|std::string|auto|[a-zA-Z0-9_:]+(?:\s*<[^>]*>)?)\s+([a-zA-Z0-9_]+)\s*\(/,
        );
        return cppFnMatch ? cppFnMatch[1] : 'solution';

      case CodeLanguage.GO:
        const goFnMatch = code.match(/func\s+([A-Z][a-zA-Z0-9_]*)/);
        return goFnMatch ? goFnMatch[1] : 'Solution';

      default:
        return 'solution';
    }
  }

  /**
   * Format a comment based on the programming language
   */
  private formatComment(text: string, language: CodeLanguage): string {
    switch (language) {
      case CodeLanguage.JAVASCRIPT:
      case CodeLanguage.TYPESCRIPT:
      case CodeLanguage.CPP:
      case CodeLanguage.GO:
      case CodeLanguage.JAVA:
        return `// ${text}`;

      case CodeLanguage.PYTHON:
        return `# ${text}`;

      default:
        return `// ${text}`;
    }
  }

  /**
   * Creates fallback files in case the main generator fails
   */
  private createFallbackFiles(
    title: string,
    lessons: AlgorithmLesson[],
    languageStr: string,
  ): AlgorithmFile[] {
    const language = this.mapLanguageStringToEnum(languageStr);
    const fileExtension = this.getFileExtension(language);
    const files: AlgorithmFile[] = [];

    // Create a basic exercise and test file
    const exerciseFile: AlgorithmFile = {
      id: uuidv4(),
      name: `${this.slugify(title)}_exercise.${fileExtension}`,
      type: AlgorithmFileType.EXERCISE,
      content: `${this.formatComment(`Exercise: ${title}`, language)}\n\n// TODO: Implement your solution here\n`,
      language,
      extension: fileExtension,
      readOnly: false,
      hidden: false,
    };

    const testFile: AlgorithmFile = {
      id: uuidv4(),
      name: `${this.slugify(title)}_test.${fileExtension}`,
      type: AlgorithmFileType.TEST,
      content: `${this.formatComment(`Test for ${title}`, language)}\n\n// Basic test for the exercise\n`,
      language,
      extension: fileExtension,
      readOnly: true,
      hidden: false,
    };

    files.push(exerciseFile, testFile);
    return files;
  }

  /**
   * Helper to get file extension based on language
   */
  private getFileExtension(language: CodeLanguage): string {
    switch (language) {
      case CodeLanguage.JAVASCRIPT:
        return 'js';
      case CodeLanguage.TYPESCRIPT:
        return 'ts';
      case CodeLanguage.PYTHON:
        return 'py';
      case CodeLanguage.JAVA:
        return 'java';
      case CodeLanguage.CPP:
        return 'cpp';
      case CodeLanguage.GO:
        return 'go';
      default:
        return 'txt';
    }
  }

  /**
   * Map a language string to CodeLanguage enum
   */
  private mapLanguageStringToEnum(language: string): CodeLanguage {
    language = language.toLowerCase();
    switch (language) {
      case 'javascript':
        return CodeLanguage.JAVASCRIPT;
      case 'typescript':
        return CodeLanguage.TYPESCRIPT;
      case 'python':
        return CodeLanguage.PYTHON;
      case 'java':
        return CodeLanguage.JAVA;
      case 'cpp':
      case 'c++':
        return CodeLanguage.CPP;
      case 'go':
        return CodeLanguage.GO;
      default:
        return CodeLanguage.JAVASCRIPT; // Default to JavaScript
    }
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

  /**
   * Helper to get base filename
   */
  private getFileBaseName(lessonTitle: string, index: number): string {
    return `${this.slugify(lessonTitle)}_${index + 1}`;
  }

  /**
   * Helper to convert a string to PascalCase
   */
  private pascalCase(text: string): string {
    return text
      .split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
}
