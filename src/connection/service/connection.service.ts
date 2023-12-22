import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection } from '../schema/connection.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateConnectionDto } from '../dto/update-connection.dto';
import { CreateConnectionDto } from '../dto/create-connection.dto';

@Injectable()
export class ConnectionService {
  constructor(@InjectModel(Connection.name) private connectionModel: Model<Connection>) {}

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

  async delete(id: string) {
    return await this.connectionModel.findByIdAndDelete(id);
  }
}
