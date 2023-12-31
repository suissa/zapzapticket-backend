import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "../schema/message.schema";
import mongoose, { Model } from "mongoose";
import { UpdateMessagetDto } from "../dto/update-message.dto";
import { CreateMessageDto } from "../dto/create-message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>) {}

  async create(request: CreateMessageDto): Promise<Message> {
    return await this.messageModel.create(request);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Message> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }

    return await this.messageModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateMessagetDto) {
    return await this.messageModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateMessagetDto) {
    return await this.messageModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.messageModel.findByIdAndDelete(id);
  }
}
