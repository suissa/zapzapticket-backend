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

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // uri: configService.get<string>("MONGODB_URI"),
        // uri: "mongodb://localhost:27017/whatscrm",
        uri: "mongodb://localhost:27017/whatscrm",
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: "RABBITMQ_SERVICE",
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672'],
            queue: "messages_queue",
            queueOptions: {
              durable: false,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule,
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