import { BadRequestException, Injectable } from '@nestjs/common';
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
    return await this.connectionModel.find();
  }

  async findOne(id: string): Promise<Connection> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.connectionModel.findOne({ _id: id });
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
    return await this.connectionModel.updateMany(
      {},
      { instanceName: "", instanceStatus: false });
  }

  async delete(id: string) {
    return await this.connectionModel.findByIdAndDelete(id);
  }

  async findInitiatedConnections() {
    await this.resetAll();
    const instances = await this.evolutionService.findAll();

    for(const { instance } of instances){
      // console.log("instance: ", instance)

      const { instanceName, owner, status } = instance;
      if (!owner){
        if (status == "close") {
          const data = this.evolutionService.delete(instanceName)
          console.log("DELETADA:", data);
        }
        return false;
      }

      const [ name, phone ] = instanceName.split("-");
      const filter = { phone: phone }
      const update = {
        $set: {
          name: name.replace("_", " "),
          instanceStatus: true,
          instanceName: instanceName
        }
      };
      const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      };

      const result = await this.connectionModel.findOneAndUpdate(filter, update, options);
      console.log("findInitiatedConnections result: ", result)
    }
  }
}
