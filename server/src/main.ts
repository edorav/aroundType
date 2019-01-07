import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.setGlobalPrefix('api');
  app.enableCors();

  app.useStaticAssets(path.join(__dirname, '/public/upload'));

  await app.listen(3000);
}
bootstrap();
