import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    AuthModule,
    AlgorithmModule,
    CollectionModule,
    HealthModule,
    OnboardingModule,
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
