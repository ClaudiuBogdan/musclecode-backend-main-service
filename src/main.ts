import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { otelSDK } from './tracing';
import { StructuredLogger } from './logger/structured-logger.service';

async function bootstrap() {
  const logger = new StructuredLogger();
  try {
    await otelSDK.start();
    const app = await NestFactory.create(AppModule, {
      logger,
    });
    logger.setContext('NestFactory');

    // Allow all CORS requests for now
    // FIXME: Remove this in production and configure proper CORS
    app.enableCors(); // TODO: Remove this in production and configure proper CORS

    await app.listen(process.env.APP_PORT || 3000);
    logger.log('Application started successfully');
  } catch (error) {
    const logger = new StructuredLogger();
    logger.setContext('Bootstrap');
    logger.error(
      'Failed to start application: ' +
        (error instanceof Error ? error.message : String(error)),
    );
    setTimeout(() => process.exit(1), 1000);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  const logger = new StructuredLogger();
  logger.setContext('UnhandledRejection');
  logger.error('Unhandled Promise Rejection: ' + String(reason));
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  const logger = new StructuredLogger();
  logger.setContext('UncaughtException');
  logger.error(
    'Uncaught Exception: ' +
      (error instanceof Error ? error.message : String(error)),
  );
});

bootstrap();
