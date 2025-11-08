import { ContentNode, ContentStatus } from '@prisma/client';

export class ModuleEntity {
  id: string;
  title: string;
  status: ContentStatus;
  body: Record<string, unknown>;
  metadata: Record<string, unknown>;
  userId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(node: ContentNode) {
    this.id = node.id;
    this.status = node.status;
    this.body = node.body as Record<string, unknown>;
    this.metadata = node.metadata as Record<string, unknown>;
    this.createdAt = node.createdAt;
    this.updatedAt = node.updatedAt;
  }
}
