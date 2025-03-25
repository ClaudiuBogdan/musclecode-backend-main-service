import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';
import { CourseOutline } from '../interfaces/course.interface';
import { GenerateCourseDto } from '../dto/generate-course.dto';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { escapeCurlyBraces } from './utils';

@Injectable()
export class CourseGenerationAgent {
  private readonly logger = new Logger(CourseGenerationAgent.name);
  private readonly llm: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
    this.llm = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName:
        this.configService.get<string>('OPENAI_MODEL') || 'gpt-4o-mini',
      temperature: 0.1,
      configuration: {
        baseURL: this.configService.get<string>('OPENAI_API_URL'),
      },
    });
  }

  /**
   * Generates a course outline based on the provided topic and requirements
   */
  async generateCourseOutline(dto: GenerateCourseDto): Promise<CourseOutline> {
    try {
      // Define the output schema for structured course outline
      const courseOutlineParser = StructuredOutputParser.fromZodSchema(
        z.object({
          title: z.string().describe('The title of the course'),
          description: z
            .string()
            .describe('A comprehensive description of the course'),
          objectives: z
            .array(z.string())
            .describe('Learning objectives of the course'),
          prerequisites: z
            .array(z.string())
            .describe('Prerequisites for taking the course'),
          modules: z.array(
            z.object({
              title: z.string().describe('Title of the module'),
              description: z.string().describe('Description of the module'),
              lessons: z.array(
                z.object({
                  title: z.string().describe('Title of the lesson'),
                  description: z.string().describe('Description of the lesson'),
                }),
              ),
            }),
          ),
        }),
      );

      // Create the prompt template
      // TODO: use a better json parser.
      const systemTemplate = `You are an expert educational content creator with deep knowledge of curriculum design.
      Your task is to create a comprehensive course outline on the requested topic.
      The outline should be well-structured, logically progressive, and cover the topic thoroughly.
      ${escapeCurlyBraces(courseOutlineParser.getFormatInstructions())}`;

      const humanTemplate = `Create a course on: {topic}
      
      Difficulty Level: {difficultyLevel}
      
      Target Audience: {targetAudience}
      
      Learning Objectives: {learningObjectives}
      
      Additional Requirements: {additionalRequirements}`;

      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(systemTemplate),
        HumanMessagePromptTemplate.fromTemplate(humanTemplate),
      ]);

      // Format the prompt with user inputs
      const formattedPrompt = await chatPrompt.formatMessages({
        topic: dto.topic,
        difficultyLevel: dto.difficultyLevel || 'beginner',
        targetAudience: dto.targetAudience
          ? dto.targetAudience.join(', ')
          : 'General audience',
        learningObjectives: dto.learningObjectives
          ? dto.learningObjectives.join(', ')
          : 'Comprehensive understanding of the topic',
        additionalRequirements: dto.additionalRequirements || 'None',
      });

      // Create a chain with string output parser to ensure we get string content
      const stringOutputParser = new StringOutputParser();
      const response = await this.llm
        .pipe(stringOutputParser)
        .invoke(formattedPrompt);

      // Parse the output using the structured parser
      const result = await courseOutlineParser.parse(response);

      return result as CourseOutline;
    } catch (error) {
      this.logger.error(
        `Error generating course outline: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
