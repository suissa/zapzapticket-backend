import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schema/task.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateTasktDto } from '../dto/update-task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>) {}

  async create(request: CreateTaskDto): Promise<Task> {
    return await this.taskModel.create(request);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Task> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.taskModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateTasktDto) {
    return await this.taskModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateTasktDto) {
    return await this.taskModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
