import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentRepository } from './content.repository';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ContentController } from './content.controller';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [ContentService, ContentRepository, PrismaService],
  exports: [ContentService],
})
export class ContentModule {}
