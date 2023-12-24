import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WebhookDocument = HydratedDocument<Webhook>;


@Schema({ timestamps: true })
export class Webhook {
  @Prop()
  event: string;

  @Prop()
  data: object;

  @Prop()
  instance: string;

  @Prop()
  date_time: string;

  @Prop()
  sender: string;

  @Prop()
  apikey: string;
}
export const WebhookSchema = SchemaFactory.createForClass(Webhook);

// event: 'messages.upsert',
// instance: 'Criptou_Onboarding-5511994649923',
// data: {
  // key: {
    // remoteJid: '5515991957645@s.whatsapp.net',
    // fromMe: false,
    // id: '3A33205B05E2CC04FFC9'
  // },
  // pushName: 'Jean Suissa 🤓',
  // message: { conversation: 'alo', messageContextInfo: [Object] },
  // messageType: 'conversation',
  // messageTimestamp: 1703445782,
  // owner: 'Criptou_Onboarding-5511994649923',
  // source: 'ios'
// },
// date_time: '2023-12-24T16:23:02.277Z',
// sender: '5511994649923@s.whatsapp.net',
// server_url: 'localhost',
// apikey: 'B6D711FCDE4D4FD5936544120E713976'