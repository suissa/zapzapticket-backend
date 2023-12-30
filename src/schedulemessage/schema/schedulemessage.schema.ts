import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ScheduleMessageDocument = HydratedDocument<ScheduleMessage>;

@Schema({ timestamps: true })
export class ScheduleMessage {
  @Prop()
  text: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  dateToSend: Date;

  @Prop({ default: true})
  isActive: boolean;

  @Prop({ default: false})
  sended: boolean;
}

export const ScheduleMessageSchema = SchemaFactory.createForClass(ScheduleMessage);
