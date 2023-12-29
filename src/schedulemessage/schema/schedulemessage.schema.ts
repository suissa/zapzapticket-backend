import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  text: string;

  @Prop()
  title: string;

  @Prop({ default: true})
  isActive: boolean;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
