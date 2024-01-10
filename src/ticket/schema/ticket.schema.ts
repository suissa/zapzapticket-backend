import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type TicketDocument = HydratedDocument<Ticket>;

class Message {
  @Prop({ default: "sent" })
  type: string;

  @Prop({ default: "text" })
  typeMessage: string;

  @Prop()
  text: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  phone: string;

  @Prop({ default: false })
  read: boolean;
}

@Schema({ timestamps: true })
export class Ticket {
  @Prop()
  status: string;

  @Prop()
  queue: string = "Atendimento";

  @Prop({ type: Types.ObjectId, ref: 'Contact' })
  contactId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;
  // userEmail tem q pegar o email do usuário logado
  @Prop({ default: "admin@admin.com" })
  userEmail: string;

  // userEmail tem q pegar o email do usuário logado
  @Prop({ default: "admin@admin.com" })
  adminEmail: string;

  @Prop({ default: true})
  isActive: boolean;

  @Prop({ default: true})
  isOpen: boolean;

  @Prop({ type: [Message] })
  messages: Types.Array<Message>;

  @Prop({ default: new Date()})
  statusUpdate: Date;

  @Prop({ default: new Date()})
  statusOpen: Date;

  @Prop({ default: new Date()})
  statusClosed: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
