import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type WebhookDocument = Document & Webhook;

@Schema({ timestamps: true })
export class Webhook {
  @Prop({ required: true })
  event: string;

  @Prop(
    raw({
      key: {
        remoteJid: { type: String },
        fromMe: { type: Boolean, default: false },
        id: { type: String }
      },
      pushName: { type: String, required: false },
      message: {
        conversation: { type: String, required: false },
        messageContextInfo: { type: Object, required: false }
      },
      messageType: { type: String },
      messageTimestamp: { type: Number, required: false },
      owner: { type: String, required: false },
      source: { type: String, required: false }
    })
  )
  data: Record<string, any>;

  @Prop({ required: true })
  instance: string;

  @Prop({ required: true })
  date_time: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  apikey: string;

  @Prop({ required: false })
  server_url: string;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);


// event: "messages.upsert",
// instance: "Criptou_Onboarding-5511994649923",
// data: {
  // key: {
    // remoteJid: "5515991957645@s.whatsapp.net",
    // fromMe: false,
    // id: "3A33205B05E2CC04FFC9"
  // },
  // pushName: "Jean Suissa 🤓",
  // message: { conversation: "alo", messageContextInfo: [Object] },
  // messageType: "conversation",
  // messageTimestamp: 1703445782,
  // owner: "Criptou_Onboarding-5511994649923",
  // source: "ios"
// },
// date_time: "2023-12-24T16:23:02.277Z",
// sender: "5511994649923@s.whatsapp.net",
// server_url: "localhost",
// apikey: "B6D711FCDE4D4FD5936544120E713976"