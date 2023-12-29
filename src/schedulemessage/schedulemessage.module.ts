import { Module } from '@nestjs/common';
import { ScheduleMessageService } from './service/schedulemessage.service';
import { ScheduleMessageController } from './controller/schedulemessage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleMessage, ScheduleMessageSchema } from './schema/schedulemessage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScheduleMessage.name, schema: ScheduleMessageSchema }]),
  ],
  controllers: [ScheduleMessageController],
  providers: [ScheduleMessageService],
})
export class ScheduleMessageModule {}
