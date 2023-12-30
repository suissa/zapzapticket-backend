import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleMessageService } from "./service/schedulemessage.service";
import { ScheduleMessageController } from "./controller/schedulemessage.controller";
import { ScheduleMessage, ScheduleMessageSchema } from "./schema/schedulemessage.schema";
import { ContactModule } from "src/contact/contact.module";
import { ConnectionModule } from "src/connection/connection.module";
import { EvolutionModule } from "src/evolution/evolution.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScheduleMessage.name, schema: ScheduleMessageSchema }]),
    ScheduleModule.forRoot(),
    ContactModule,
    ConnectionModule,
    EvolutionModule
  ],
  controllers: [ScheduleMessageController],
  providers: [ScheduleMessageService],
})
export class ScheduleMessageModule {}
