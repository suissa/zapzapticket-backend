import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ScheduleModule } from "@nestjs/schedule";
import { NestFactory } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CompanyModule } from "./company/company.module";
import { ConnectionModule } from "./connection/connection.module";
import { ContactModule } from "./contact/contact.module";
import { EvolutionModule } from "./evolution/evolution.module";
import { MessageModule } from "./message/message.module";
import { PlanModule } from "./plan/plan.module";
import { QueueModule } from "./queue/queue.module";
import { ScheduleMessageModule } from "./schedulemessage/schedulemessage.module";
import { TagModule } from "./tag/tag.module";
import { TaskModule } from "./task/task.module";
import { UserModule } from "./user/user.module";
import { WebhookModule } from "./webhook/webhook.module";
import { MessageGateway }  from "./gateways/message.gateway";
import * as bodyParser from 'body-parser';

console.log("MONGODB_URI", process.env.MONGODB_URI);
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
    CompanyModule,
    ConnectionModule,
    ContactModule,
    EvolutionModule,
    MessageModule,
    PlanModule,
    QueueModule,
    ScheduleMessageModule,
    TagModule,
    TaskModule,
    UserModule,
    WebhookModule,
    MessageGateway,
    // AuthModule
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