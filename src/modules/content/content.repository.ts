import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ContentNode, ContentLink, LinkType, Prisma } from '@prisma/client';

@Injectable()
export class ContentRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new content node
   */
  async createNode(data: Prisma.ContentNodeCreateInput): Promise<ContentNode> {
    return this.prisma.contentNode.create({
      data,
    });
  }

  /**
   * Find a content node by ID
   */
  async findNodeById(id: string): Promise<ContentNode | null> {
    return this.prisma.contentNode.findUnique({
      where: { id },
    });
  }

  /**
   * Find content nodes by user ID
   */
  async findNodesByUserId(userId: string): Promise<ContentNode[]> {
    return this.prisma.contentNode.findMany({
      where: { userId },
    });
  }

  /**
   * Find nodes by their parent node
   */
  async findChildNodes(
    parentId: string,
    type?: string,
  ): Promise<ContentNode[]> {
    const whereClause: any = {
      incomingLinks: {
        some: {
          fromId: parentId,
        },
      },
    };

    if (type) {
      whereClause.type = type;
    }

    return this.prisma.contentNode.findMany({
      where: whereClause,
    });
  }

  /**
   * Update a content node
   */
  async updateNode(
    id: string,
    data: Prisma.ContentNodeUpdateInput,
  ): Promise<ContentNode> {
    return this.prisma.contentNode.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a content node
   */
  async deleteNode(id: string): Promise<ContentNode> {
    // First delete all links associated with this node
    await this.prisma.contentLink.deleteMany({
      where: {
        OR: [{ fromId: id }, { toId: id }],
      },
    });

    // Then delete the node itself
    return this.prisma.contentNode.delete({
      where: { id },
    });
  }

  /**
   * Create a link between two content nodes
   */
  async linkNodes(
    fromId: string,
    toId: string,
    linkType: LinkType,
  ): Promise<ContentLink> {
    return this.prisma.contentLink.create({
      data: {
        fromId,
        toId,
        linkType,
      },
    });
  }

  /**
   * Remove a link between two content nodes
   */
  async unlinkNodes(
    fromId: string,
    toId: string,
    linkType?: LinkType,
  ): Promise<void> {
    const whereClause: any = {
      fromId,
      toId,
    };

    if (linkType) {
      whereClause.linkType = linkType;
    }

    await this.prisma.contentLink.deleteMany({
      where: whereClause,
    });
  }

  /**
   * Find links between nodes
   */
  async findLinks(
    fromId?: string,
    toId?: string,
    linkType?: LinkType,
  ): Promise<ContentLink[]> {
    const whereClause: any = {};

    if (fromId) {
      whereClause.fromId = fromId;
    }

    if (toId) {
      whereClause.toId = toId;
    }

    if (linkType) {
      whereClause.linkType = linkType;
    }

    return this.prisma.contentLink.findMany({
      where: whereClause,
    });
  }
}
