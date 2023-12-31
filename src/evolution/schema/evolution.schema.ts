import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EvolutionDocument = HydratedDocument<Evolution>;

@Schema({ timestamps: true })
export class Evolution {
  @Prop()
  instanceName: string;

  @Prop()
  apikey: string;

  @Prop()
  token: string;

  @Prop()
  qrcode: boolean;

  @Prop()
  messagesConsumed: boolean;
}

export const EvolutionSchema = SchemaFactory.createForClass(Evolution);
