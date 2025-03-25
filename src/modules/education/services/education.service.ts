import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GenerateCourseDto } from '../dto/generate-course.dto';
import {
  Course,
  CourseOutline,
  Lesson,
  Module,
} from '../interfaces/course.interface';
import { CourseGenerationAgent } from '../agents/course-generation.agent';
import { ContentResearchAgent } from '../agents/content-research.agent';
import { LessonGenerationAgent } from '../agents/lesson-generation.agent';

@Injectable()
export class EducationService {
  private readonly logger = new Logger(EducationService.name);

  constructor(
    private readonly courseGenerationAgent: CourseGenerationAgent,
    private readonly contentResearchAgent: ContentResearchAgent,
    private readonly lessonGenerationAgent: LessonGenerationAgent,
  ) {}

  /**
   * Generates a course outline for review
   */
  async generateCourseOutline(dto: GenerateCourseDto): Promise<CourseOutline> {
    try {
      this.logger.log(`Generating course outline for topic: ${dto.topic}`);
      return await this.courseGenerationAgent.generateCourseOutline(dto);
    } catch (error) {
      this.logger.error(
        `Failed to generate course outline: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Generates a complete course with lessons based on approved outline
   */
  async generateFullCourse(
    courseOutline: CourseOutline,
    difficultyLevel: string,
  ): Promise<Course> {
    this.logger.log(
      `Starting full course generation for: ${courseOutline.title}`,
    );

    // Initialize course structure
    const course: Course = {
      id: uuidv4(),
      title: courseOutline.title,
      description: courseOutline.description,
      overview: courseOutline.description,
      objectives: courseOutline.objectives,
      prerequisites: courseOutline.prerequisites,
      targetAudience: [],
      difficultyLevel: difficultyLevel as any,
      estimatedDuration: this.estimateCourseLength(courseOutline),
      modules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Generate each module and its lessons
    for (const [
      moduleIndex,
      moduleOutline,
    ] of courseOutline.modules.entries()) {
      this.logger.log(
        `Generating module ${moduleIndex + 1}: ${moduleOutline.title}`,
      );

      // Create module
      const module: Module = {
        id: uuidv4(),
        title: moduleOutline.title,
        description: moduleOutline.description,
        order: moduleIndex,
        lessons: [],
      };

      // Generate lessons for the module
      for (const [
        lessonIndex,
        lessonOutline,
      ] of moduleOutline.lessons.entries()) {
        try {
          this.logger.log(
            `Researching content for lesson: ${lessonOutline.title}`,
          );

          // Research content for the lesson
          // TODO: add research agent
          // const researchResult =
          //   await this.contentResearchAgent.researchContent(
          //     lessonOutline.title,
          //     [moduleOutline.title, course.title],
          //   );

          this.logger.log(`Generating lesson for: ${lessonOutline.title}`);

          // Generate the lesson content
          const partialLesson = await this.lessonGenerationAgent.generateLesson(
            moduleOutline.title,
            lessonOutline.title,
            lessonOutline.description,
            difficultyLevel,
            // researchResult.content,
          );

          // Create the complete lesson
          const lesson: Lesson = {
            id: uuidv4(),
            moduleId: module.id,
            title: partialLesson.title || lessonOutline.title,
            description: partialLesson.description || lessonOutline.description,
            order: lessonIndex,
            content: partialLesson.content || 'Content not available',
            exercises: (partialLesson.exercises || []).map((exercise) => ({
              ...exercise,
              lessonId: lesson ? lesson.id : uuidv4(), // Use a new ID if lesson is not created yet
            })),
            quizQuestions: (partialLesson.quizQuestions || []).map(
              (question) => ({
                ...question,
                lessonId: lesson ? lesson.id : uuidv4(), // Use a new ID if lesson is not created yet
              }),
            ),
          };

          // Add the lesson to the module
          module.lessons.push(lesson);

          this.logger.log(`Completed lesson generation: ${lesson.title}`);
        } catch (error) {
          this.logger.error(
            `Error generating lesson ${lessonOutline.title}: ${error.message}`,
            error.stack,
          );
          // Continue with other lessons even if one fails
        }

        // TODO: remove this
        break;
      }

      // Add the module to the course
      course.modules.push(module);

      // TODO: remove this
      break;
    }

    this.logger.log(`Completed course generation for: ${course.title}`);
    return course;
  }

  /**
   * Estimates the course duration based on the outline
   */
  private estimateCourseLength(courseOutline: CourseOutline): string {
    // Simple estimate based on the number of modules and lessons
    const totalLessons = courseOutline.modules.reduce(
      (count, module) => count + module.lessons.length,
      0,
    );

    // Rough estimate: 30 minutes per lesson on average
    const totalHours = Math.round(totalLessons * 0.5);

    return totalHours === 1 ? '1 hour' : `${totalHours} hours`;
  }
}
