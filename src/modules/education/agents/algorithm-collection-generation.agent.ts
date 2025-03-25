import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';
import { GenerateAlgorithmCollectionDto } from '../dto/generate-algorithm-collection.dto';
import { AlgorithmCollectionOutline } from '../interfaces/algorithm-collection.interface';

@Injectable()
export class AlgorithmCollectionGenerationAgent {
  private readonly logger = new Logger(AlgorithmCollectionGenerationAgent.name);
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
   * Generates an algorithm collection outline based on the provided topic and requirements
   */
  async generateCollectionOutline(
    dto: GenerateAlgorithmCollectionDto,
  ): Promise<AlgorithmCollectionOutline> {
    try {
      // Define the output schema for structured algorithm collection outline
      const collectionOutlineParser = StructuredOutputParser.fromZodSchema(
        z.object({
          name: z.string().describe('The name of the algorithm collection'),
          description: z
            .string()
            .describe(
              'A comprehensive description of the collection and its purpose',
            ),
          algorithms: z
            .array(
              z.object({
                title: z.string().describe('Title of the algorithm challenge'),
                summary: z
                  .string()
                  .describe(
                    'Brief description of what the algorithm challenge is about',
                  ),
                difficulty: z
                  .enum(['beginner', 'intermediate', 'advanced'])
                  .describe('Difficulty level of the algorithm'),
                categories: z
                  .array(z.string())
                  .describe('Categories this algorithm belongs to'),
              }),
            )
            .length(dto.count || 5)
            .describe('The list of algorithm challenges in this collection'),
        }),
      );

      // Create the prompt template
      const systemTemplate =
        escapeCurlyBraces(`You are an expert programming instructor specializing in creating coding challenges and algorithm exercises.
      Your task is to create a collection of algorithm challenges focused on a specific topic.
      The collection should provide a logical progression of skills and concepts.
      ${escapeCurlyBraces(collectionOutlineParser.getFormatInstructions())}`);

      const humanTemplate = `Create a collection of coding challenges about: {topic}
      
      Programming Language: {language}
      
      Categories: {categories}
      
      Difficulty Level: {difficulty}
      
      Number of Challenges: {count}
      
      Focus Areas: {focusAreas}
      
      Additional Requirements: {additionalRequirements}`;

      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(systemTemplate),
        HumanMessagePromptTemplate.fromTemplate(humanTemplate),
      ]);

      // Format the prompt with user inputs
      const formattedPrompt = await chatPrompt.formatMessages({
        topic: dto.topic,
        language: dto.language,
        categories: dto.categories
          ? dto.categories.join(', ')
          : 'Any relevant categories',
        difficulty: dto.difficulty || 'beginner',
        count: dto.count || 5,
        focusAreas: dto.focusAreas
          ? dto.focusAreas.join(', ')
          : 'Any relevant areas',
        additionalRequirements: dto.additionalRequirements || 'None',
      });

      // Create a chain with string output parser to ensure we get string content
      const stringOutputParser = new StringOutputParser();
      const response = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);

      // Parse the output using the structured parser
      const result = await collectionOutlineParser.parse(response);

      return result as AlgorithmCollectionOutline;
    } catch (error) {
      this.logger.error(
        `Error generating algorithm collection outline: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}

function escapeCurlyBraces(text: string) {
  return text.replace(/{/g, '{{').replace(/}/g, '}}');
}
