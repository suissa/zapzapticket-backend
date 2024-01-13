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
  _doc: object;

}

export const UserSchema = SchemaFactory.createForClass(User);
