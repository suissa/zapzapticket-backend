import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

export enum LevelEnum {
  NORMAL = "normal",
  ADMIN = "admin",
}

class Badge {
  @Prop()
  type: string;
}

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
export class User {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({ default: "Lista fria"})
  status: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop({ enum: LevelEnum, default: LevelEnum.NORMAL })
  level: LevelEnum;

  @Prop()
  isActive: boolean = false;

  @Prop()
  isConnected: boolean = false;

  @Prop()
  ticketStatus: string;

  @Prop()
  ticketCreatedAt: string;

  @Prop()
  ticketClosedAt: string;

  @Prop({ type: [Badge] })
  badges: Types.Array<Badge>;

  @Prop({ type: [Message] })
  messages: Types.Array<Message>;
}

export const UserSchema = SchemaFactory.createForClass(User);
