import { BadRequestException, Injectable, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
// import mongoose, { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Evolution } from "../schema/evolution.schema";
import { MessageGateway } from "../../gateways/message.gateway";
import { CreateEvolutionDto } from "../dto/create-instance.dto";
import { CreateMessageDto } from "../dto/create-message.dto";
import { GetInstanceDto } from "../dto/get-instance.dto";
import * as amqp from "amqplib";
import axios from "axios";

const SERVER_EVOLUTION = "http://localhost:6666";


@Injectable()
export class EvolutionService {
  private messagesConsumed = false;

  constructor(
    private configService: ConfigService,
    private messageGateway: MessageGateway
  ) {}


  async create(request: CreateEvolutionDto): Promise<Evolution> {
    console.log("create request", request)
    // const data = {
    //   "instanceName": "instanceNest01",
    //   "token": "tokenAOIEKdjnj1701477826237",
    //   "qrcode": true
    // }

    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    try {
      const result = await axios.post(`${SERVER_EVOLUTION}/instance/create`, request, headers);
      console.log(result);
      return result.data;
    } catch (error) {
      if (error.response) {
        // A solicitação foi feita e o servidor respondeu com um status fora do intervalo 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        console.error("No response:", error.request);
      } else {
        // Algo aconteceu ao configurar a solicitação e desencadeou um erro
        console.error("Error message:", error.message);
      }
      console.log(error)
      throw error; // Lançar o erro para cima
    }
  }
  async createAndReturnQRCode (request: CreateEvolutionDto): Promise<Evolution> {
    console.log("create request", request)
    // const data = {
    //   "instanceName": "instanceNest01",
    //   "token": "tokenAOIEKdjnj1701477826237",
    //   "qrcode": true
    // }

    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    try {
      const result = await axios.post(`${SERVER_EVOLUTION}/instance/create`, request, headers);
      console.log(result);
      return result.data && result.data.qrcode && result.data.qrcode.base64;
    } catch (error) {
      if (error.response) {
        // A solicitação foi feita e o servidor respondeu com um status fora do intervalo 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        console.error("No response:", error.request);
      } else {
        // Algo aconteceu ao configurar a solicitação e desencadeou um erro
        console.error("Error message:", error.message);
      }
      console.log(error)
      throw error; // Lançar o erro para cima
    }
  }

  async findAll(): Promise<GetInstanceDto[]> {
    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.get(`${SERVER_EVOLUTION}/instance/fetchInstances`, headers);

    return result.data;
  }

  async coonnectionState(instanceName): Promise<Evolution[]> {
    const headers = {
      headers: {
        apikey: "B6D711FCDE4D4FD5936544120E713976"
      }
    }
    const result = await axios.get(`${SERVER_EVOLUTION}/instance/connectionState/${instanceName}`, headers);
    return result.data;
  }

  async findOne(instanceName: string): Promise<Evolution> {
    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.get(`${SERVER_EVOLUTION}/instance/connectionState/${instanceName}`, headers);

    return result.data;
  }

  async logout(instanceName: string) {
    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const url = `${SERVER_EVOLUTION}/instance/logout/${instanceName}`
    const result = await axios.delete(url, headers);

    return result.data;
  }

  async delete(instanceName: string) {
    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.delete(`${SERVER_EVOLUTION}/instance/delete/${instanceName}`, headers);

    return result.data;
  }

  async sendMessagesToQueue(request: any) {
    console.log("sendMessagesToQueue: ", request)
  }

  async sendMessage(request: CreateMessageDto, instanceName: string) {
    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }

    // setTimeout(() => {
    // }, 10000);
    // this.messageGateway.server.emit("message:sent", request);

    const result = await axios.post(`${SERVER_EVOLUTION}/message/sendText/${instanceName}`, request, headers);

    return result.data;

  }

  async sendSimpleMessage(phone: string, text: string, instanceName: string) {
    const apiKey = this.configService.get<string>("APIKEY");
    const headers = {
      headers: {
        apikey: apiKey
      }
    }

      const data = {
      "number": phone,
      "options": {
        "delay": 1200,
        "presence": "composing",
        "linkPreview": false
      },
      "textMessage": {
        "text": text
      }
    }

    // setTimeout(() => {
    //   this.messageGateway.server.emit("message:received", request.number);
    // }, 10000);
    this.messageGateway.server.emit("message:sent", phone);
    console.log("sendSimpleMessage: ", phone, text, instanceName, data);
    const result = await axios.post(`${SERVER_EVOLUTION}/message/sendText/${instanceName}`, data, headers);

    return result.data;

  }

  uniquePhones(data: string[]): string[] {
    const unique = new Set<string>();
    const uniqueData = data.filter(phone => {
      if (!unique.has(phone)) {
        unique.add(phone);
        return true;
      }
      return false;
    });
    return uniqueData;
  }

  async sendBatchMessages(request: any) {
    console.log("sendBatchMessages: ", request)
    const { instanceName, text, phones } = request

  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const uniquePhones = this.uniquePhones(phones);
  console.log("uniquePhones: ", uniquePhones)
    for (const phone of uniquePhones) {
      const data = {
        "number": phone,
        "options": {
          "delay": 1200,
          "presence": "composing",
          "linkPreview": false
        },
        "textMessage": {
          "text": text
        }
      }

      this.messageGateway.server.emit("message:received", {phone, text, instanceName})

    // Declare a queue to consume from
    const queueName = "messages_queue";
    await channel.assertQueue(queueName, { durable: false });

    // Consume messages from the queue
    channel.consume(queueName, (msg) => {
      // console.log("consume msg: ", msg)
      if (msg !== null) {
        const data = JSON.parse(msg.content);
        console.log("sendBatchMessages Received in Evolution Service:", data);
        // Process the message here
        channel.ack(msg);
      }
    });

      await this.sendSimpleMessage(phone, text, instanceName)
      console.log("data: ", data, instanceName)
    }
  }


  async sendBatchMessagesModules(request: any) {
    console.log("sendBatchMessagesModules: ", request)
    // const connection = await this.connectionService.findOne(request.connectionId)
    // const message = await this.messageService.findOne(request.messageId)
    // const contacts = await this.contactService.findAllById(request.contactIds)
    // for (const contact of contacts) {
    //   const data = {
    //     "number": contact.phone,
    //     "options": {
    //       "delay": 1200,
    //       "presence": "composing",
    //       "linkPreview": false
    //     },
    //     "textMessage": {
    //       "text": message.text
    //     }
    //   }
    //   await this.sendMessage(data, connection.instanceName)
    // }
  }

}
