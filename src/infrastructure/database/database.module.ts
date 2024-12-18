import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SubmissionRepository } from './repository/submissions/submission.repository';
import { DatabaseService } from './database.service';

@Module({
  providers: [PrismaService, SubmissionRepository, DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
