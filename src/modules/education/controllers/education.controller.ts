import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EducationService } from '../services/education.service';
import { GenerateCourseDto } from '../dto/generate-course.dto';
import { CourseOutline, Course } from '../interfaces/course.interface';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post('course/outline')
  @ApiOperation({ summary: 'Generate a course outline based on a topic' })
  @ApiBody({ type: GenerateCourseDto })
  @ApiResponse({
    status: 201,
    description: 'Course outline generated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async generateCourseOutline(
    @Body() generateCourseDto: GenerateCourseDto,
  ): Promise<CourseOutline> {
    try {
      return await this.educationService.generateCourseOutline(
        generateCourseDto,
      );
    } catch (error) {
      throw new HttpException(
        `Failed to generate course outline: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('course/generate')
  @ApiOperation({
    summary: 'Generate a full course based on an approved outline',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        courseOutline: {
          type: 'object',
          example: {
            title: 'Introduction to React',
            description: 'A comprehensive course on React fundamentals',
            objectives: [
              'Learn React basics',
              'Understand component lifecycle',
            ],
            prerequisites: ['Basic JavaScript knowledge'],
            modules: [
              {
                title: 'Getting Started with React',
                description: 'Introduction to React library',
                lessons: [
                  {
                    title: 'What is React?',
                    description: 'Introduction to React and its concepts',
                  },
                ],
              },
            ],
          },
        },
        difficultyLevel: {
          type: 'string',
          enum: ['beginner', 'intermediate', 'advanced'],
          default: 'beginner',
        },
      },
      required: ['courseOutline'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Course generated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async generateFullCourse(
    @Body() body: { courseOutline: CourseOutline; difficultyLevel?: string },
  ): Promise<Course> {
    try {
      return await this.educationService.generateFullCourse(
        body.courseOutline,
        body.difficultyLevel || 'beginner',
      );
    } catch (error) {
      throw new HttpException(
        `Failed to generate course: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
