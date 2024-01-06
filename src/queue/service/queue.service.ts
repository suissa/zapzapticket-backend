import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Queue } from "../schema/queue.schema";
import mongoose, { Model } from "mongoose";
import { UpdateQueuetDto } from "../dto/update-queue.dto";
import { CreateQueueDto } from "../dto/create-queue.dto";

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name)
    private queueModel: Model<Queue>) {}

  async create(request: CreateQueueDto): Promise<Queue> {
    // pegar o email do usuário logado
    // const adminEmail = request.adminEmail;
    const adminEmail = "admin@admin.com"
    const data = {...request, adminEmail}
    return await this.queueModel.create(data);
  }

  async findAll(): Promise<Queue[]> {
    return await this.queueModel.find().sort({ createdAt: -1 });
  }

  async findActives(): Promise<Queue[]> {
    return await this.queueModel.find({ isActive: true }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Queue> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }

    return await this.queueModel.findOne({ _id: id });
  }


  async update(id: string, request: UpdateQueuetDto) {
    return await this.queueModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateQueuetDto) {
    return await this.queueModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.queueModel.findByIdAndDelete(id);
  }
}
