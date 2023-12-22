import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

export enum LevelEnum {
  NORMAL = "normal",
  ADMIN = "admin",
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
  isActive: boolean = true;

  @Prop()
  isConnected: boolean = false;

}

export const UserSchema = SchemaFactory.createForClass(User);
