import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentRepository } from './content.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ContentService, ContentRepository, PrismaService],
  exports: [ContentService],
})
export class ContentModule {}
