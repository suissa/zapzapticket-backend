import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;

export enum LevelEnum {
  NORMAL = "normal",
  ADMIN = "admin",
  MASTER = "master"
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ set: (phone: string) => phone && phone.replace(/\D/g, "") })
  phone: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop({ default: "admin@admin.com" })
  adminEmail: string;

  @Prop({ enum: LevelEnum, default: LevelEnum.NORMAL })
  level: LevelEnum;

  @Prop()
  isActive: boolean = true;

  @Prop()
  isConnected: boolean = false;

}

export const UserSchema = SchemaFactory.createForClass(User);
