import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ShutdownService } from './shutdown/shutdown.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  app.get(ShutdownService).subscribeToShutdown(() => app.close());
  await app.listen(3000);
}

bootstrap();
