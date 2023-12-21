import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configSerive = app.get(ConfigService);
  const PORT = configSerive.get('PORT');
  app.enableCors();

  await app.listen(PORT ?? '3000', '0.0.0.0');

  console.log(`MongodbURI : ${configSerive.get('MONGODB_URI')}`);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
