import { Module } from '@nestjs/common';
import { OnboardingController } from './controllers/onboarding.controller';
import { OnboardingService } from './services/onboarding.service';
import { OnboardingRepository } from './repositories/onboarding.repository';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { LoggerModule } from '../../logger/logger.module';
import { CollectionModule } from '../collection/collection.module';
import { SchedulerModule } from '../scheduler/scheduler.module';

@Module({
  controllers: [OnboardingController],
  providers: [OnboardingService, OnboardingRepository, PrismaService],
  imports: [LoggerModule, CollectionModule, SchedulerModule],
  exports: [OnboardingService],
})
export class OnboardingModule {}
