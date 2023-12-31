import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {
  @Prop()
  name: string;

  @Prop({ default: "#ff0000"})
  color: string;

  @Prop()
  adminEmail: string;

}

export const TagSchema = SchemaFactory.createForClass(Tag);
