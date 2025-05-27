import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { ContentStatus, ContentType, LinkType } from '@prisma/client';

@Injectable()
export class LearningRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new module with lessons and exercises
   */
  async createModule(
    userId: string,
    moduleData: {
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
    },
  ) {
    // Use transaction to ensure all content is created together
    return this.prisma.$transaction(async (tx) => {
      // Create the module content node
      const moduleNode = await tx.contentNode.create({
        data: {
          type: ContentType.MODULE,
          body: {
            title: moduleData.title,
            description: moduleData.description,
          },
          metadata: {},
        },
      });

      // Grant OWNER permission to the creator
      await tx.explicitPermission.create({
        data: {
          contentNodeId: moduleNode.id,
          userId: userId,
          permissionLevel: 'OWNER',
          grantedBy: userId,
        },
      });

      const createdLessons = [];
      const createdExercises = [];

      // Create all lesson nodes
      for (const lesson of moduleData.lessons) {
        const lessonNode = await tx.contentNode.create({
          data: {
            type: ContentType.LESSON,
            status: ContentStatus.DRAFT,
            body: {
              title: lesson.title,
              description: lesson.description,
              content: '', // Empty content for draft
            },
            metadata: {},
          },
        });

        // Grant OWNER permission to the creator
        await tx.explicitPermission.create({
          data: {
            contentNodeId: lessonNode.id,
            userId: userId,
            permissionLevel: 'OWNER',
            grantedBy: userId,
          },
        });

        createdLessons.push(lessonNode);

        // Create link from module to lesson
        await tx.contentLink.create({
          data: {
            fromId: moduleNode.id,
            toId: lessonNode.id,
            linkType: LinkType.DEPENDENCY,
            order: lesson.order,
            metadata: {
              type: 'LESSON',
              title: lesson.title,
              description: lesson.description,
              status: ContentStatus.DRAFT,
            },
          },
        });
      }

      // Create all exercise nodes
      for (const exercise of moduleData.exercises) {
        const exerciseNode = await tx.contentNode.create({
          data: {
            type: ContentType.EXERCISE,
            body: {
              title: exercise.title,
              description: exercise.description,
              content: '', // Empty content for draft
              status: ContentStatus.DRAFT,
            },
            metadata: {},
          },
        });

        // Grant OWNER permission to the creator
        await tx.explicitPermission.create({
          data: {
            contentNodeId: exerciseNode.id,
            userId: userId,
            permissionLevel: 'OWNER',
            grantedBy: userId,
          },
        });

        createdExercises.push(exerciseNode);

        // Create link from module to exercise
        await tx.contentLink.create({
          data: {
            fromId: moduleNode.id,
            toId: exerciseNode.id,
            linkType: LinkType.DEPENDENCY,
            order: exercise.order,
            metadata: {
              type: 'EXERCISE',
              title: exercise.title,
              description: exercise.description,
              status: ContentStatus.DRAFT,
            },
          },
        });
      }

      return {
        module: moduleNode,
        lessons: createdLessons,
        exercises: createdExercises,
      };
    });
  }

  /**
   * Gets a module with all related content (lessons, exercises)
   */
  async getModuleWithContent(moduleId: string) {
    const module = await this.prisma.contentNode.findUnique({
      where: {
        id: moduleId,
        type: ContentType.MODULE,
      },
      include: {
        outgoingLinks: {
          select: {
            id: true,
            fromId: true,
            toId: true,
            linkType: true,
            order: true,
            metadata: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return module;
  }
}
