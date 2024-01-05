import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ContactDocument = HydratedDocument<Contact>;

class Badge {
  @Prop()
  type: string;
}

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
export class Contact {
  @Prop({ default: "Não informado"})
  name: string;

  @Prop({ set: (phone: string) => phone && phone.replace(/\D/g, "") })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  status: string = "Lista fria";

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop({ default: "/images/avatar-01.png"})
  profilePictureUrl: string;

  @Prop({ default: "inativo"})
  ticketStatus: string;

  @Prop()
  ticketCreatedAt: string;

  @Prop()
  ticketClosedAt: string;

  @Prop()
  transferedTo: string;

  @Prop()
  connectionPhone: string;

  @Prop()
  groupId: string;

  @Prop({ type: [String] })
  badges: Types.Array<string>;

  @Prop({ type: [Message] })
  messages: Types.Array<Message>;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
