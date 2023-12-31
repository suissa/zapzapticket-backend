import { Module } from "@nestjs/common";
import { MessageService } from "./service/message.service";
import { MessageController } from "./controller/message.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./schema/message.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
