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

    // Enable graceful shutdown
    const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2']; // SIGUSR2 is used by nodemon for restart
    signals.forEach((signal) => {
      process.on(signal, async () => {
        logger.log(`Received ${signal}, starting graceful shutdown`);
        try {
          await app.close();
          logger.log('Application closed successfully');
          process.exit(0);
        } catch (error) {
          logger.error('Error during graceful shutdown: ' + String(error));
          process.exit(1);
        }
      });
    });

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
