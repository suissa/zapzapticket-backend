import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Plan' })
  planId: string;

  @Prop()
  campaignsEnabled: string;

  @Prop({ type: Date })
  dueDate: Date;

  @Prop()
  recurrence: boolean;

}

export const CompanySchema = SchemaFactory.createForClass(Company);
