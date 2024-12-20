import { Module } from '@nestjs/common';
import { SchedulerService } from './services/scheduler.service';

@Module({
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
