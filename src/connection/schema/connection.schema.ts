import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ConnectionDocument = HydratedDocument<Connection>;

class Message {
  @Prop()
  phoneReply: string;

  @Prop({ default: 'text' })
  type: string;

  @Prop()
  text: string;

  @Prop()
  url: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

@Schema({ timestamps: true })
export class Connection {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  instanceName: string;

  @Prop()
  instanceStatus: boolean;

  @Prop({ default: true })
  isActive: boolean

  @Prop({ type: [Message] })
  messages: Types.Array<Message>;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
