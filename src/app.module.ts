import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ScheduleModule } from "@nestjs/schedule";
import { NestFactory } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EvolutionModule } from "./evolution/evolution.module";
import { ConnectionModule } from "./connection/connection.module";
import { ContactModule } from "./contact/contact.module";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";
import { ScheduleMessageModule } from "./schedulemessage/schedulemessage.module";
import { TagModule } from "./tag/tag.module";
import { TaskModule } from "./task/task.module";
import { WebhookModule } from "./webhook/webhook.module";
import { MessageGateway }  from "./gateways/message.gateway";
import * as bodyParser from 'body-parser';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: "RABBITMQ_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"], // Substitua com a URL do seu RabbitMQ
          queue: "messages_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    EvolutionModule,
    ConnectionModule,
    ContactModule,
    MessageModule,
    ScheduleMessageModule,
    TagModule,
    TaskModule,
    UserModule,
    WebhookModule,
    MessageGateway
  ],
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})

export class AppModule {}


// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Configurar o limite de carga útil para 10MB (ou o valor desejado)
//   app.use(bodyParser.json({ limit: '50mb' }));

//   await app.listen(9001);
// }
// bootstrap();