import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Cron, Timeout } from "@nestjs/schedule";
import { ScheduleMessage } from "../schema/schedulemessage.schema";
import { UpdateScheduleMessagetDto } from "src/schedulemessage/dto/update-schedulemessage.dto";
import { CreateScheduleMessageDto } from "src/schedulemessage/dto/create-schedulemessage.dto";
import { ContactService } from "src/contact/service/contact.service";
import { ConnectionService } from "src/connection/service/connection.service";
import { EvolutionService } from "src/evolution/service/evolution.service";

import * as moment from "moment-timezone";
import "moment/locale/pt-br"; // Importar o locale desejado

moment.locale("pt-br"); // Configurar o locale globalmente

@Injectable()
export class ScheduleMessageService {
  private readonly logger = new Logger(ScheduleMessageService.name);
  private messages = [];
  constructor(
    @InjectModel(ScheduleMessage.name)
    private schedulemessageModel: Model<ScheduleMessage>,
    private contactService: ContactService,
    private connectionService: ConnectionService,
    private evolutionService: EvolutionService,
  ) {
      this.messages = [];
    }

  async create(request: CreateScheduleMessageDto): Promise<ScheduleMessage> {
    return await this.schedulemessageModel.create(request);
  }

  async findAll(): Promise<ScheduleMessage[]> {
    return await this.schedulemessageModel.find().sort({ createdAt: -1 });
  }

  async findAllByDate(): Promise<ScheduleMessage[]> {
    const now = moment().tz("America/Sao_Paulo");
    console.log("findAllByDate now:", now);
    return await this.schedulemessageModel.find({ dateToSend: { $gt: now.toDate() } }).sort({ createdAt: -1 });
  }

  async findAllBySended(value: boolean): Promise<ScheduleMessage[]> {
    const now = moment().tz("America/Sao_Paulo");
    console.log("findAllBySended value:", value);
    return await this.schedulemessageModel.find({ sended: value }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<ScheduleMessage> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }

    return await this.schedulemessageModel.findOne({ _id: id });
  }

  async update(id: string, request: Partial<UpdateScheduleMessagetDto>) {
    return await this.schedulemessageModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateScheduleMessagetDto) {
    return await this.schedulemessageModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.schedulemessageModel.findByIdAndDelete(id);
  }

  async handleScheduleMessage() {
    this.logger.debug("handleScheduleMessage");
    this.messages = await this.findAllBySended(false);

    const now = new Date();
    console.log("now:", now);

    const offsetInHours = -3; // Para UTC-3
    const nowInUTC3 = new Date(now.getTime() + offsetInHours * 60 * 60 * 1000);
    console.log("nowInUTC3", nowInUTC3);

    const filteredMessages = this.messages.filter(message => message.dateToSend < nowInUTC3);
    console.log("filteredMessages: ", filteredMessages);
    this.messages = filteredMessages;

    for (const message of this.messages) {
      console.log("message:", message);
      const contact = await this.contactService.findOneByPhone(message.to);
      console.log("contact:", contact);
      const connection = await this.connectionService.findOneByPhone(message.from);
      console.log("connection:", connection);
      const text = message.text
                          .replace("@contact-name", contact.name)
                          .replace("Não informado", "")
                          .replace("@connection-name", connection.name);
      console.log("text:", text);
      if (contact && connection) {
        console.log("contact && connection");
        const result = await this.evolutionService.sendSimpleMessage(contact.phone, text, connection.instanceName);
        console.log("result:", result);
        if (result) {
          const request: Partial<UpdateScheduleMessagetDto> = {
            sended: true,
            sendedAt: new Date(),
          };
          const updatedMessage = await this.update(message._id, request);
          console.log("updatedMessage:", updatedMessage);
        }
      }
    }
  }

  // @Timeout(5000)
  // async handleTimeout() {
  //   return await this.handleScheduleMessage();
  // }

  @Cron("10 * * * * *")
  async handleCron() {
    return await this.handleScheduleMessage();
  }

  // async handleCron() {
  //   this.logger.debug("\n\n\nVerificando mensagens agendadas...");

  //   const now = new Date();
  //   const messages = await this.findAllBySended(false); // ou um método específico para buscar mensagens dentro do intervalo de tempo

  //   const offsetInHours = -3; // Para UTC-3
  //   const nowInUTC3 = new Date(now.getTime() + offsetInHours * 60 * 60 * 1000);
  //   console.log("nowInUTC3", nowInUTC3);

  //   const filteredMessages = this.messages.filter(message => message.dateToSend > nowInUTC3);
  //   console.log("filteredMessages: ", filteredMessages);
  //   this.messages = filteredMessages;

  //   this.logger.debug("Mensagens encontradas: ", this.messages.length);
  //   console.log("Verificando messages: ", this.messages);
  //   // for (const message of messages) {

  //   // }
  // }
}
