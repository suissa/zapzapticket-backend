import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ConnectionDocument = HydratedDocument<Connection>;

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
}

@Schema({ timestamps: true })
export class Connection {

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  instanceName: string;

  @Prop({ default: false })
  instanceStatus: boolean;

  @Prop({ default: true })
  isActive: boolean

  @Prop({ type: [Message] })
  messages: Types.Array<Message>;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
