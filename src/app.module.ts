import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AlgorithmModule } from './modules/algorithm/algorithm.module';
import { CollectionModule } from './modules/collection/collection.module';
import { HealthModule } from './modules/health/health.module';
import { UserIdInterceptor } from './interceptors/user-id.interceptor';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { ChatModule } from './modules/chat/chat.module';
import { LearningModule } from './modules/learning/learning.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AlgorithmModule,
    CollectionModule,
    HealthModule,
    OnboardingModule,
    ChatModule,
    LearningModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserIdInterceptor,
    },
  ],
})
export class AppModule {}
