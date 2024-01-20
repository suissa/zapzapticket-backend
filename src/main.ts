import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json({ limit: '50mb' }));  // Aumentar o limite aqui
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  const configSerive = app.get(ConfigService);
  const PORT = configSerive.get("PORT");
  // app.enableCors({
  //   origin: ["http://localhost:3000", "http://137.184.81.207:3000"],
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204
  // });
  app.enableCors();
  await app.listen(PORT ?? "3000", "0.0.0.0");

  console.log(`MongodbURI : ${configSerive.get("MONGODB_URI")}`);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
