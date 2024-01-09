import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type QueueDocument = HydratedDocument<Queue>;

@Schema({ timestamps: true })
export class Queue {
  @Prop()
  name: string;

  @Prop()
  greeting: string;

  @Prop({ default: "#000" })
  color: string;
  // userEmail tem q pegar o email do usuário logado
  @Prop({ default: "admin@admin.com" })
  adminEmail: string;

  @Prop({ default: true})
  isActive: boolean;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
