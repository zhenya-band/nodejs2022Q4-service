import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './logging/CustomLogger.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new CustomLogger());

  const logger = app.get<CustomLogger>(CustomLogger);

  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: ${error.message}`, error.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error(`unhandledRejection rejection: reason: ${reason}`);
    process.exit(1);
  });

  await app.listen(PORT);
}
bootstrap();
