import { BadRequestException, Injectable } from "@nestjs/common";
import { ContactService } from '../../contact/service/contact.service';
import { ConnectionService } from '../../connection/service/connection.service';

@Injectable()
export class WebhookService {

  constructor(
    private contactService: ContactService,
    private connectionService: ConnectionService
  ) {}

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
    const result = await this.contactService.saveReceivedTextMessage(dataSave);
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
        this.saveReceivedTextMessageInContact(request);
        return { message: "Mensagem enviada por mim" };
      } else {
        console.log("Mensagem recebida");
        this.saveSentTextMessageInContact(request);
      }
      console.log("\n\n\n");
      return { message: "Webhook recebido com sucesso" };
    } catch (error) {
      throw new BadRequestException("Erro ao processar saveMessage", error.message);
    }
  }
  async receiveWebhook(request: any): Promise<any> {
    try {
      if (request.event === "messages.upsert") {
        console.log("messages.upsert: ", request);
        this.saveMessage(request)
      }
      return { message: "Webhook recebido com sucesso" };
    } catch (error) {
      throw new BadRequestException("Erro ao processar webhook", error.message);
    }
  }
}