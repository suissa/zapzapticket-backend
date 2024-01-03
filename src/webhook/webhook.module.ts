import { Module } from "@nestjs/common";
import { WebhookService } from "./service/webhook.service";
import { ContactModule } from "../contact/contact.module";
import { ConnectionModule } from "../connection/connection.module";
import { WebhookController } from "./controller/webhook.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Webhook, WebhookSchema } from "./schema/webhook.schema";
import { MessageGateway }  from "../gateways/message.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Webhook.name, schema: WebhookSchema }]),
    ContactModule, ConnectionModule, MessageGateway
  ],
  controllers: [WebhookController],
  providers: [WebhookService, MessageGateway],
})
export class WebhookModule {}
