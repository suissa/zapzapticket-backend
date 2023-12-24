import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Webhook } from '../schema/webhook.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(Webhook.name)
    private webhookModel: Model<Webhook>) {}

  async receive(request: any): Promise<Webhook> {
    console.log(request);
    // return await this.webhookModel.create(request);
  }
}

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