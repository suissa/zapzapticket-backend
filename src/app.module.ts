import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EvolutionModule } from './evolution/evolution.module';
import { ConnectionModule } from './connection/connection.module';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { WebhookModule } from './webhook/webhook.module';
import { MessageGateway }  from "./gateways/message.gateway";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    EvolutionModule,
    ConnectionModule,
    ContactModule,
    MessageModule,
    UserModule,
    WebhookModule,
    MessageGateway
  ],
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})
export class AppModule {}
