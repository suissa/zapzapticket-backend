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

const groupBy = (xs, key) => xs.reduce((rv, x) => ({
  ...rv, [x[key]]: [...(rv[x[key]] || []), x]
}), {});

@Injectable()
export class EvolutionService {
  private messagesConsumed = false;
  private SERVER_EVOLUTION: string;
  private API_KEY: string;

  constructor(
    private configService: ConfigService,
    private messageGateway: MessageGateway
  ) {
    this.SERVER_EVOLUTION = this.configService.get<string>('SERVER_EVOLUTION');
    this.API_KEY = this.configService.get<string>("APIKEY");
  }

  async create(request: CreateEvolutionDto): Promise<Evolution> {
    console.log("create request", request)
    // const data = {
    //   "instanceName": "instanceNest01",
    //   "token": "tokenAOIEKdjnj1701477826237",
    //   "qrcode": true
    // }
    const SERVER_EVOLUTION = this.SERVER_EVOLUTION;
    const apiKey = this.API_KEY;
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    try {
      const result = await axios.post(`${this.SERVER_EVOLUTION}/instance/create`, request, headers);
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

    const apiKey = this.API_KEY;
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    try {
      const result = await axios.post(`${this.SERVER_EVOLUTION}/instance/create`, request, headers);
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
    const apiKey = this.API_KEY;
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.get(`${this.SERVER_EVOLUTION}/instance/fetchInstances`, headers);

    return result.data;
  }

  async coonnectionState(instanceName): Promise<Evolution[]> {
    const headers = {
      headers: {
        apikey: "B6D711FCDE4D4FD5936544120E713976"
      }
    }
    const result = await axios.get(`${this.SERVER_EVOLUTION}/instance/connectionState/${instanceName}`, headers);
    return result.data;
  }

  async findOne(instanceName: string): Promise<Evolution> {
    const apiKey = this.API_KEY;
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.get(`${this.SERVER_EVOLUTION}/instance/connectionState/${instanceName}`, headers);

    return result.data;
  }

  async logout(instanceName: string) {
    const apiKey = this.API_KEY;
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const url = `${this.SERVER_EVOLUTION}/instance/logout/${instanceName}`
    const result = await axios.delete(url, headers);

    return result.data;
  }

  async delete(instanceName: string) {
    const apiKey = this.API_KEY;
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.delete(`${this.SERVER_EVOLUTION}/instance/delete/${instanceName}`, headers);

    return result.data;
  }

  async sendMessagesToQueue(request: any) {
    console.log("sendMessagesToQueue: ", request)
  }

  async sendMessage(request: CreateMessageDto, instanceName: string) {
    const apiKey = this.API_KEY;
    const headers = {
      headers: {
        apikey: apiKey
      }
    }

    // setTimeout(() => {
    // }, 10000);
    // this.messageGateway.server.emit("message:sent", request);

    const result = await axios.post(`${this.SERVER_EVOLUTION}/message/sendText/${instanceName}`, request, headers);

    return result.data;

  }

  async sendSimpleMessage(phone: string, text: string, instanceName: string) {
    const apiKey = this.API_KEY;
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

    // setTimeout(async () => {
    // }, 10000);
    // console.log("sendSimpleMessage: ", phone, text, instanceName, data);
    const result = await axios.post(`${this.SERVER_EVOLUTION}/message/sendText/${instanceName}`, data, headers);

    this.messageGateway.server.emit("message:sent", phone);
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
  }

  
  // async getAllGroups(phone) {
  //   console.log("\n\n\n\n\ngetAllGroups", {phone});
  
  //   if (!phone) {
  //     return false;
  //   }
  //   const numero = await Numero.findOne({ phone });
  //   // console.log("\n\n\n\n\ngetAllGroups numero:", numero);
  //   const instance = numero.instancia;
  //   const url = `${SERVER}/group/fetchAllGroups/${instance}?getParticipants=true`;
  //   // console.log("\n\n\n\n\ngetAllGroups", {key, url})
  //   // if (key === "") {
  //   //   return false;
  //   // }
  //   console.log("\n\n\n\n\ngetAllGroups url:", url)
  //   const response = await axios.get(url, headers);
  //   GROUPS[instance] = response.data;
  //   console.log("\n\n\n\n\ngetAllGroups response.data:", response.data)
  //   return response.data;
  // };
  
  // async getAllParticipantsFromGroup(phone, id) {
    
  //   console.log("\n\n\n\n\ngetAllParticipantsFromGroup", {phone, id});
  
  //   // return false;
  //   const groups = await this.getAllGroups(phone);
  //   const groupsGrouped = groupBy(groups, 'id');
  //   console.log("\n\n getAllParticipantsFromGroup groups:", groups);
  //   const group = groupsGrouped[id][0];
  //   console.log("\n\n getAllParticipantsFromGroup group:", group);
  //   if(!group) {  
  //     return false;
  //   }
  //   console.log("\n\n getAllParticipantsFromGroup group.participants:", group.participants);
  //   const participants = group
  //     .participants
  //     .map(participant => ({
  //       phone: participant.id.replace(/@c.us/g, '').replace(/@s.whatsapp.net/g, ''),
  //       admin: participant.admin
  //     }))
  //     .sort((a, b) => {
  //       if (a.admin === b.admin) return 0;
  //       if (a.admin === null) return 1;
  //       if (b.admin === null) return -1;
  //       if (a.admin === 'superadmin') return -1;
  //       if (b.admin === 'superadmin') return 1;
  //       if (a.admin === 'admin') return -1;
  //       if (b.admin === 'superadmin') return 1;
  //       return 0;
  //     });
      
  //   return participants;
  // };
  
  // async getAllParticipants(groups) {
  //   console.log("\n\n getAllParticipants groups:", groups);
  //   let participants = [];
    
  //   for (const key in groups) {
  //     if (groups.hasOwnProperty(key)) {
  //       const obj = groups[key];
  //       console.log("\n\n\n");
  //       console.log(key);
  //       console.log(obj);
  //       console.log(obj.id);
  //       console.log(obj.subject);
  //       console.log(obj.participants);
  //       if (!obj.participants) {
  //         console.log("Não existe participants");
  //       }
  //       if (obj.participants.length > 0){
  //         participants.push(...obj.participants.map(participant => participant.id.replace(/@c.us/g, '').replace(/@s.whatsapp.net/g, '')));
  //       }
  //     }
  //   }
  //   return participants;
  // };
  
}
