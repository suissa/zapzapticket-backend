import { BadRequestException, NotFoundException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection } from "../schema/connection.schema";
import mongoose, { Model } from "mongoose";
import { UpdateConnectionDto } from "src/connection/dto/update-connection.dto";
import { CreateConnectionDto } from "src/connection/dto/create-connection.dto";
import { EvolutionService } from "src/evolution/service/evolution.service"

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel(Connection.name) 
    private connectionModel: Model<Connection>,
    private evolutionService: EvolutionService) {
      this.init();
    }

  private async init() {
    await this.findInitiatedConnections();
  }

  async create(request: CreateConnectionDto): Promise<Connection> {
    const data = { 
      name: request.name,
      phone: request.phone,
      instanceName: `${request.name.replace(" ", "_")}-${request.phone}`,
      instanceStatus: false };
    console.log("create data: ", data);
    return await this.connectionModel.create(data);
  }

  async findAll(): Promise<Connection[]> {
    await this.findInitiatedConnections();
    return await this.connectionModel.find({}).sort({ name: 1 });
  }

  async findOne(id: string): Promise<any> {
    const isValidId = mongoose.isValidObjectId(id);
    console.log("findOne id: ", id);
    console.log("findOne isValidId: ", isValidId);
    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }
    // TA DANDO MERDA NO FINDONE! NAO SEI O PQ soh retorna null
    // await this.connectionModel.findOne({ _id: id })
    // await this.connectionModel.findById(id)
    const result = (await this.connectionModel.find({}).lean()).filter((connection) => connection._id.toString() == id)[0];
    console.log("findOne result: ", result);
    return result
  }

  async findOneByPhone(phone: string): Promise<Connection> {
    return await this.connectionModel.findOne({ phone });
  }

  async update(id: string, request: UpdateConnectionDto) {
    return await this.connectionModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateConnectionDto) {
    return await this.connectionModel.updateMany({}, request);
  }

  async resetAll() {
    const request =  { instanceStatus: false };
    return await this.connectionModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.connectionModel.findByIdAndDelete(id);
  }

  async shutDown(instanceName: string) {
    console.log("shutDown instanceName: ", instanceName)
    const resultLogout = await this.evolutionService.logout(instanceName);
    // const resultDelete = await this.evolutionService.delete(instanceName);
    console.log(resultLogout)
    // console.log(resultDelete)
    return await this.connectionModel.findOneAndUpdate({instanceName}, {instanceStatus: false})
  }

  async findInitiatedConnections() {
    const connections = await this.connectionModel.find({});
    const instances = await this.evolutionService.findAll();
    // console.log("findInitiatedConnections instances: ", instances);
    // console.log("findInitiatedConnections connections: ", connections);
    if (connections.length == 0) {
      // criar a conexao aqui
      return false;
    }
    // console.log("findInitiatedConnections connections: ", connections);
    // console.log("findInitiatedConnections instances: ", instances);
    for (const { instance } of instances) {
      console.log("findInitiatedConnections instance: ", instance);
      if (!instance.owner) {
        this.evolutionService.delete(instance.instanceName);
      } else {
        const connection = connections.find(({instanceName}) => instanceName == instance.instanceName);
        // console.log("findInitiatedConnections connection.name: ", connection.name);
        if (!connection) {
          // const newConnection = {
          //   name: instance.instanceName,
          //   phone: instance.owner.replace("@s.whatsapp.net", ""),
          //   instanceName: instance.instanceName,
          //   instanceStatus: true,
          // }
          // await this.connectionModel.create(newConnection);
          return false;
        }
      }
    }
    for (const connection of connections) {
      const { instanceName, instanceStatus } = connection;
      const instance = instances.find(({instance}) => instance.instanceName == instanceName);

      if (instance && instance.instance.owner && instanceStatus == false) {
        const result = await this.connectionModel.findOneAndUpdate({_id: connection._id}, {instanceStatus: true});
        return true;
      }
      if (!instance) {
        const result = await this.connectionModel.findOneAndUpdate({_id: connection._id}, {instanceStatus: false});
        return false;
      }
      if (!instance.instance.owner) {
        this.evolutionService.delete(instance.instance.instanceName);
        const result = await this.connectionModel.findOneAndUpdate({_id: connection._id}, {instanceStatus: false});
        return false;
      }
    }
  }

  async saveSentTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const connection = await this.connectionModel.findOne({ phone: request.phone });

    console.log("Connection saveSentTextMessage connection.instanceName: ", connection.instanceName);
    if (!connection) {
      // throw new NotFoundException(`Connection with phone ${request.phone} not found`);
      console.log("Sem conexao encontrada");
    }
    const message = {
      type: "sent",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    connection.messages.push(message);
    // console.log("connection depois: ", connection);
    return await connection.save();
  }

  async saveSentTextMessageWithInstanceName(request: any): Promise<any> {
    console.log("request: ", request);
    const connection = await this.connectionModel.findOne({ instanceName: request.instanceName });

    console.log("Connection saveSentTextMessage connection.instanceName: ", connection.instanceName);
    if (!connection) {
      // throw new NotFoundException(`Connection with phone ${request.phone} not found`);
      console.log("Sem conexao encontrada");
    }
    const message = {
      type: "sent",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    connection.messages.push(message);
    // console.log("connection depois: ", connection);
    return await connection.save();
  }

  async saveReceivedTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const connection = await this.connectionModel.findOne({ phone: request.phone });

    // console.log("Connection saveReceivedTextMessage connection.instanceName: ", connection?.instanceName);
    if (!connection) {
      // throw new NotFoundException(`Contact with phone ${request.phone} not found`);
      console.log("Sem conexao encontrada");
      return false
    }
    const message = {
      type: "received",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    connection.messages.push(message);
    // console.log("connection depois: ", connection);
    return await connection.save();
  }


  async getConnectionByInstanceName(instanceName: string): Promise<Connection> {
    return await this.connectionModel.findOne({ instanceName });
  }

  async sendMessage(data: any): Promise<any> {
    const { message, phone, instanceName } = data;
    console.log("sendMessage data", data);
    // const connection = this.getConnectionByInstanceName(instanceName);
    // const contact = this.findOneByPhone(phone);
    this.evolutionService.sendSimpleMessage(phone, message, instanceName);
  }
}
