import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
  @Prop()
  name: string;

  @Prop({ default: 1 })
  users: number;

  @Prop({ default: 1 })
  connections: number;

  @Prop({ default: 1 })
  queues: number;

  @Prop({ default: 100 })
  value: number;

  @Prop({ default: true })
  isActive: boolean;

}

export const PlanSchema = SchemaFactory.createForClass(Plan);
