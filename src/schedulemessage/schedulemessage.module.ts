import { Module } from '@nestjs/common';
import { ScheduleMessageService } from './service/schedulemessage.service';
import { ScheduleMessageController } from './controller/schedulemessage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleMessage, ScheduleMessageSchema } from './schema/schedulemessage.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScheduleMessage.name, schema: ScheduleMessageSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [ScheduleMessageController],
  providers: [ScheduleMessageService],
})
export class ScheduleMessageModule {}
