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
  @Prop({ default: 'text' })
  type: string;

  @Prop({ default: 'text' })
  typeMessage: string;

  @Prop()
  text: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  phoneReply: string;
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  status: string = "Lista fria";

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
