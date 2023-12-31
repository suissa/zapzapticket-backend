import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/message.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateTasktDto } from '../dto/update-message.dto';
import { CreateTaskDto } from '../dto/create-message.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private messageModel: Model<Task>) {}

  async create(request: CreateTaskDto): Promise<Task> {
    return await this.messageModel.create(request);
  }

  async findAll(): Promise<Task[]> {
    return await this.messageModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.messageModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateTasktDto) {
    return await this.messageModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateTasktDto) {
    return await this.messageModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.messageModel.findByIdAndDelete(id);
  }
}
