import { BadRequestException, Injectable } from "@nestjs/common";
import {ContactService} from '../../contact/service/contact.service';

@Injectable()
export class WebhookService {

  constructor(
    private contactService: ContactService) {}

  getPhoneByInstanceName(instanceName: string): string {
    const phone = instanceName.split("-")[1];
    return phone;
  }
  getPhoneByFromWhatsapp(remoteJid: string): string {
    const phone = remoteJid.split("@")[0];
    return phone;
  }
  async saveSentTextMessageInContact(request: any): Promise<any> {
    const { instance, data, sender } = request;
    const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
    const { remoteJid, fromMe, id } = key;
    const { conversation, messageContextInfo } = message;
    const dataSave = {
      phone: this.getPhoneByFromWhatsapp(remoteJid),
      message: conversation,
      phoneReply: this.getPhoneByFromWhatsapp(sender)
    }
    const result = await this.contactService.saveSentTextMessage(dataSave);
    return result;
  }

  async saveReceivedTextMessageInContact(request: any): Promise<any> {
    const { instance, data, sender } = request;
    const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
    const { remoteJid, fromMe, id } = key;
    const { conversation, messageContextInfo } = message;
    const dataSave = {
      phone: this.getPhoneByFromWhatsapp(remoteJid),
      message: conversation,
      phoneReply: this.getPhoneByFromWhatsapp(sender)
    }
    const result = await this.contactService.saveSentTextMessage(dataSave);
    return result;
  }

  async saveMessage(request: any): Promise<any> {
    try {
      const { instance, data, sender } = request;
      const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
      const { remoteJid, fromMe, id } = key;
      const { conversation, messageContextInfo } = message;
      console.log("\n\nsaveMessage conversation: ", conversation);

      if (fromMe) {
        console.log("Mensagem enviada por mim");
        return { message: "Mensagem enviada por mim" };
      } else {
        console.log("Mensagem recebida");
        this.saveSentTextMessageInContact(request);
      }
      console.log("\n\n\n");
      return { message: "Webhook recebido com sucesso" };
    } catch (error) {
      // Tratar erros que podem ocorrer durante o processamento
      throw new BadRequestException("Erro ao processar saveMessage", error.message);
    }
  }
  async receiveWebhook(request: any): Promise<any> {
    try {
      // Processar os dados do webhook aqui.
      // Por exemplo, você pode registrar os dados ou executar alguma ação com base neles.
      console.log("receiveWebhook: ", request);
      if (request.event === "messages.upsert") {
        console.log("messages.upsert: ", request);
        this.saveMessage(request)
      }
      return { message: "Webhook recebido com sucesso" };
    } catch (error) {
      // Tratar erros que podem ocorrer durante o processamento
      throw new BadRequestException("Erro ao processar webhook", error.message);
    }
  }
}


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