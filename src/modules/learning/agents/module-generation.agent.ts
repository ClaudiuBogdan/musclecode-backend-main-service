import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
// Ensure this specific import path is correct for your langchain version
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
// StringOutputParser is not needed if StructuredOutputParser is the final step
// import { StringOutputParser } from '@langchain/core/output_parsers';

export interface ModuleGenerationResult {
  title: string;
  description: string;
  lessons: Array<{
    title: string;
    description: string;
    order: number;
  }>;
  exercises: Array<{
    title: string;
    description: string;
    order: number;
  }>;
}

export interface GenerateModuleDto {
  prompt: string;
  userId: string; // Not currently used in generation logic, but kept in DTO
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

@Injectable()
export class ModuleGenerationAgent {
  private readonly logger = new Logger(ModuleGenerationAgent.name);
  private readonly llm: ChatGoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    this.llm = new ChatGoogleGenerativeAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
      model: this.configService.get<string>('GEMINI_MODEL') as string,
      temperature: 0.2,
      maxOutputTokens: 2048,
      // Removed json: true - Let StructuredOutputParser handle formatting instructions and parsing
      // json: true,
    });
  }

  /**
   * Generate a learning module structure from a user prompt
   */
  async generateModuleStructure(
    dto: GenerateModuleDto,
  ): Promise<ModuleGenerationResult> {
    try {
      // Define the *complete* output schema matching ModuleGenerationResult
      const moduleStructureParser = StructuredOutputParser.fromZodSchema(
        z.object({
          title: z
            .string()
            .describe('The overall title of the learning module'),
          description: z
            .string()
            .describe(
              'A comprehensive description overviewing the entire module content',
            ),
          lessons: z
            .array(
              z.object({
                title: z.string().describe('Specific title for this lesson'),
                description: z
                  .string()
                  .describe(
                    'Detailed description explaining what this lesson will cover',
                  ),
                order: z
                  .number()
                  .int()
                  .positive()
                  .describe(
                    'Sequential order of this lesson within the module, starting from 1',
                  ),
              }),
            )
            .describe('An array of lesson objects that comprise this module'),
          exercises: z
            .array(
              z.object({
                title: z.string().describe('Specific title for this exercise'),
                description: z
                  .string()
                  .describe(
                    'Detailed description explaining the task or problem in the exercise',
                  ),
                order: z
                  .number()
                  .int()
                  .positive()
                  .describe(
                    'Sequential order of this exercise, often linked to lesson completion',
                  ), // Consider if order should relate to lesson order
              }),
            )
            .describe(
              'An array of exercise objects designed to reinforce learning',
            ),
        }),
      );

      // Create the prompt template
      // Inject the format instructions directly into the system message template
      const systemTemplate = `You are an expert educational content designer specialized in creating structured learning modules.
Your task is to analyze the user's prompt and generate a well-organized learning module structure according to the specified format.
The structure should include a logical progression of lessons and relevant exercises.

Output Format Instructions:
{format_instructions}

Guidelines:
- Create between 3-8 lessons that build on each other and follow a logical progression.
- For each lesson, assign a descriptive title and a comprehensive explanation.
- Create 1-3 exercises that apply concepts from the lessons. Ensure exercises are practical and reinforce key concepts.
- Order lessons and exercises logically using the 'order' field (starting from 1).
- Ensure all content matches the requested difficulty level: {difficulty}.
- You MUST provide the complete structure as a valid JSON object matching the format instructions. Do not add any text before or after the JSON object.`;

      const humanTemplate = `Generate a well-structured learning module based on this prompt: {prompt}`;

      // Use 'format_instructions' as the variable name expected by StructuredOutputParser
      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(systemTemplate),
        HumanMessagePromptTemplate.fromTemplate(humanTemplate),
      ]);

      // Create the chain, piping the prompt, LLM, and parser together
      const chain = chatPrompt.pipe(this.llm).pipe(moduleStructureParser);

      // Invoke the chain with all necessary inputs
      const result = await chain.invoke({
        prompt: dto.prompt,
        difficulty: dto.difficulty || 'beginner',
        format_instructions: moduleStructureParser.getFormatInstructions(), // Pass format instructions here
      });

      // The result should already be parsed into the ModuleGenerationResult structure
      return result as ModuleGenerationResult; // Type assertion might still be useful
    } catch (error) {
      this.logger.error(
        `Error generating module structure for prompt "${dto.prompt}": ${error.message}`,
        error.stack,
      );
      // Consider re-throwing a more specific application error if needed
      throw error;
    }
  }
}
