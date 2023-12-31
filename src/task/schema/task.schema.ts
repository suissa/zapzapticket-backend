import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop()
  text: string;

  @Prop()
  title: string;

  @Prop({ default: true})
  isActive: boolean;

}

export const TaskSchema = SchemaFactory.createForClass(Task);
