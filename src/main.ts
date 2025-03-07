import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(configService.get('port') ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
