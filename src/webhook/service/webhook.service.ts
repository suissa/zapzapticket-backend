import { BadRequestException, Injectable } from "@nestjs/common";
import { ContactService } from "src/contact/service/contact.service";
import { ConnectionService } from "src/connection/service/connection.service";
import { MessageGateway } from "src/gateways/message.gateway";

@Injectable()
export class WebhookService {

  constructor(
    private contactService: ContactService,
    private connectionService: ConnectionService,
    private messageGateway: MessageGateway
  ) {}

  getPhoneByInstanceName(instanceName: string): string {
    const phone = instanceName.split("-")[1];
    return phone;
  }
  getPhoneByFromWhatsapp(remoteJid: string): string {
    return  remoteJid.split("@")[0];
  }
  async saveSentTextMessageInContact(request: any): Promise<any> {
    console.log("saveReceivedTextMessageInConnection request: ", request);
    const { instance, data, sender } = request;
    const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
    const { remoteJid, fromMe, id } = key;
    const { conversation, messageContextInfo, extendedTextMessage, ephemeralMessage } = message;
    console.log("saveSentTextMessageInContact conversation: ", conversation);
    console.log("saveSentTextMessageInContact ephemeralMessage: ", ephemeralMessage);
    console.log("saveSentTextMessageInContact ephemeralMessage?.message?.extendedTextMessage?.text ", ephemeralMessage?.message?.extendedTextMessage?.text)
    console.log("saveSentTextMessageInContact extendedTextMessage.text: ", extendedTextMessage?.text);
    if (!conversation && !extendedTextMessage?.text && !ephemeralMessage?.message?.extendedTextMessage?.text) {
      return false;
    }
    const dataSave = {
      phone: this.getPhoneByFromWhatsapp(remoteJid),
      message: conversation || extendedTextMessage?.text || ephemeralMessage?.message?.extendedTextMessage?.text,
      phoneReply: this.getPhoneByFromWhatsapp(sender)
    }
    console.log("\n\nsaveSentTextMessageInContact dataSave: ", dataSave);
    const dataPushName = {
      phone: this.getPhoneByFromWhatsapp(remoteJid),
      pushName
    }
    const contactResult = await this.contactService.updatePushNameContactByPhone(dataPushName);
    console.log("saveSentTextMessageInContact contactResult: ", contactResult);
    const result = await this.contactService.saveSentTextMessage(dataSave);
    return result;
  }

  async saveReceivedTextMessageInContact(request: any): Promise<any> {
    console.log("saveReceivedTextMessageInContact request: ", request);
    const { instance, data, sender } = request;
    const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
    const { remoteJid, fromMe, id } = key;
    const { conversation, messageContextInfo, extendedTextMessage, ephemeralMessage  } = message;
    console.log("saveReceivedTextMessageInContact conversation: ", conversation);
    console.log("saveReceivedTextMessageInContact ephemeralMessage: ", ephemeralMessage);
    console.log("saveSentTextMessageInContact ephemeralMessage?.message?.extendedTextMessage?.text ", ephemeralMessage?.message?.extendedTextMessage?.text)
    console.log("saveSentTextMessageInContact extendedTextMessage.text: ", extendedTextMessage?.text);
    if (!conversation && !extendedTextMessage?.text && !ephemeralMessage?.message?.extendedTextMessage?.text) {
      return false;
    }
    const phone = this.getPhoneByFromWhatsapp(remoteJid);
    const messageText = conversation || extendedTextMessage?.text || ephemeralMessage?.message?.extendedTextMessage?.text;
    const phoneReply = this.getPhoneByFromWhatsapp(sender);
    const dataSave = {
      phone,
      message: messageText,
      phoneReply
    }
    console.log("\n\nsaveReceivedTextMessageInContact dataSave: ", dataSave);
    const result = await this.contactService.saveReceivedTextMessage(dataSave);
    return result;
  }

  async saveSentTextMessageInConnection(request: any): Promise<any> {
    console.log("saveSentTextMessageInConnection request: ", request);
    const { instance, data, sender } = request;
    const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
    const { remoteJid, fromMe, id } = key;
    const { conversation, messageContextInfo, extendedTextMessage, ephemeralMessage  } = message;
    console.log("saveSentTextMessageInConnection conversation: ", conversation);
    console.log("saveReceivedTextMessageInContact ephemeralMessage: ", ephemeralMessage);
    console.log("saveSentTextMessageInContact ephemeralMessage?.message?.extendedTextMessage?.text ", ephemeralMessage?.message?.extendedTextMessage?.text)
    console.log("saveSentTextMessageInConnection extendedTextMessage?.text: ", extendedTextMessage?.text);
    if (!conversation && !extendedTextMessage?.text && !ephemeralMessage?.message?.extendedTextMessage?.text) {
      return false;
    }
    const dataSave = {
      phone: this.getPhoneByFromWhatsapp(sender),
      message: conversation || extendedTextMessage?.text || ephemeralMessage?.message?.extendedTextMessage?.text,
      phoneReply: this.getPhoneByFromWhatsapp(remoteJid)
    }
    console.log("\n\nsaveSentTextMessageInConnection dataSave: ", dataSave);
    const result = await this.connectionService.saveSentTextMessage(dataSave);
    return result;
  }

  async saveReceivedTextMessageInConnection(request: any): Promise<any> {
    console.log("saveReceivedTextMessageInConnection request: ", request);
    const { instance, data, sender } = request;
    const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
    const { remoteJid, fromMe, id } = key;
    const { conversation, messageContextInfo, extendedTextMessage, ephemeralMessage  } = message;
    console.log("saveReceivedTextMessageInConnection conversation: ", conversation);
    console.log("saveSentTextMessageInContact ephemeralMessage: ", ephemeralMessage);
    console.log("saveSentTextMessageInContact ephemeralMessage?.message?.extendedTextMessage?.text ", ephemeralMessage?.message?.extendedTextMessage?.text)
    console.log("saveReceivedTextMessageInConnection extendedTextMessage?.text: ", extendedTextMessage?.text);

    if (!conversation && !extendedTextMessage?.text && !ephemeralMessage?.message?.extendedTextMessage?.text) {
      return false;
    }
    const dataSave = {
      phone: this.getPhoneByFromWhatsapp(sender),
      message: conversation || extendedTextMessage?.text || ephemeralMessage?.message?.extendedTextMessage?.text,
      phoneReply: this.getPhoneByFromWhatsapp(remoteJid)
    }
    console.log("\n\nsaveReceivedTextMessageInConnection dataSave: ", dataSave);
    if (!dataSave.message) return false;
    const result = await this.connectionService.saveReceivedTextMessage(dataSave);
    // console.log("saveReceivedTextMessageInConnection result: ", result);
    return result;
  }

  async saveMessage(request: any): Promise<any> {
    try {
      const { instance, data, sender } = request;
      const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
      const { remoteJid, fromMe, id } = key;
      const { conversation, messageContextInfo } = message;
      const { extendedTextMessage } = message;
      const { text } = extendedTextMessage;
      // saveMessage message:  {
      //   extendedTextMessage: {
      //     text: 'q canais vc ve?',
      //     contextInfo: {},
      //     inviteLinkGroupTypeV2: 'DEFAULT'
      //   },
      //   messageContextInfo: {
      //     deviceListMetadata: {
      //       senderKeyHash: 'w4PXZFRh6hEvDg==',
      //       senderTimestamp: '1703795438',
      //       recipientKeyHash: 'q0IZ7m3rm2OYdw==',
      //       recipientTimestamp: '1703798362'
      //     },
      //     deviceListMetadataVersion: 2
      //   }
      
      console.log("\n\nsaveMessage message: ", message);
      console.log("saveMessage conversation: ", conversation);
      console.log("saveMessage text: ", text);
      console.log("saveMessage fromMe: ", fromMe);

      if (conversation) return console.log("saveMessage return conversation: ", conversation);
      if (text) return console.log("saveMessage return text: ", text);

      if (fromMe) {

        console.log("Mensagem enviada por mim", request);
        this.saveReceivedTextMessageInContact(request);
        this.saveSentTextMessageInConnection(request);
        // return { message: "Mensagem enviada por mim" };
      } else {
        console.log("Mensagem recebida request", request);
        this.saveSentTextMessageInContact(request);
        this.saveReceivedTextMessageInConnection(request);
      }
      console.log("\n\n\n");
      return { message: "Webhook recebido com sucesso" };
    } catch (error) {
      throw new BadRequestException("Erro ao processar saveMessage", error.message);
    }
  }

  async receiveWebhook(request: any): Promise<any> {
    try {
      console.log("messages.upsert: ", request);
      if (request.event === "messages.upsert") {
        console.log("messages.upsert: ", request);
        // this.saveMessage(request)

        const { instance, data, sender } = request;
        const { key, pushName, message, messageType, messageTimestamp, owner, source } = data;
        const { remoteJid, fromMe, id } = key;
        try {
          if (fromMe) {
            console.log("Mensagem enviada por mim", request);
            this.saveReceivedTextMessageInContact(request);
            this.saveSentTextMessageInConnection(request);
            // return { message: "Mensagem enviada por mim" };
          } else {
            console.log("Mensagem recebida request", request);
            this.saveSentTextMessageInContact(request);
            this.saveReceivedTextMessageInConnection(request);
            this.messageGateway.server.emit("message:chat:receive", request);
          }
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
      return { message: "Webhook recebido com sucesso" };
    } catch (error) {
      throw new BadRequestException("Erro ao processar webhook", error.message);
    }
  }
}