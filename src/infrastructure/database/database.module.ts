import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SubmissionRepository } from './repository/submission.service';

@Global()
@Module({
  providers: [DatabaseService, SubmissionRepository],
  exports: [DatabaseService],
})
export class DatabaseModule {}
