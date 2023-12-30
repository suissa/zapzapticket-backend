import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection } from '../schema/connection.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateConnectionDto } from '../dto/update-connection.dto';
import { CreateConnectionDto } from '../dto/create-connection.dto';
import { EvolutionService } from "../../evolution/service/evolution.service"

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
    return await this.connectionModel.create(request);
  }

  async findAll(): Promise<Connection[]> {
    await this.findInitiatedConnections();
    return await this.connectionModel.find({}).sort({ name: 1 });
  }

  async findOne(id: string): Promise<Connection> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.connectionModel.findOne({ _id: id });
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
    // return await this.connectionModel.findOneAndUpdate({instanceName}, {instanceStatus: false})
  }

  async findInitiatedConnections() {
    const connections = await this.connectionModel.find({});
    const instances = await this.evolutionService.findAll();

    if (connections.length == 0) {
      // criar a conexao aqui
      return false;
    }

    connections.forEach(async (connection) => {
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
    });
  }

  async saveSentTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const connection = await this.connectionModel.findOne({ phone: request.phone });

    console.log("connection: ", connection);
    if (!connection) {
      throw new NotFoundException(`Contact with phone ${request.phone} not found`);
    }
    const message = {
      type: "sent",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    connection.messages.push(message);
    console.log("connection depois: ", connection);
    return await connection.save();
  }

  async saveReceivedTextMessage(request: any): Promise<any> {
    console.log("request: ", request);
    const connection = await this.connectionModel.findOne({ phone: request.phone });

    console.log("connection: ", connection);
    if (!connection) {
      throw new NotFoundException(`Contact with phone ${request.phone} not found`);
    }
    const message = {
      type: "received",
      typeMessage: "text",
      text: request.message,
      createdAt: new Date(),
      phone: request.phoneReply,
    }
    connection.messages.push(message);
    console.log("connection depois: ", connection);
    return await connection.save();
  }


  async getConnectionByInstanceName(instanceName: string): Promise<Connection> {
    return await this.connectionModel.findOne({ instanceName });
  }
}
