import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket } from "../schema/ticket.schema";
import mongoose, { Model } from "mongoose";
import { CreateTicketDto } from "../dto/create-ticket.dto";

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private taskModel: Model<Ticket>) {}

  async create(request: CreateTicketDto): Promise<Ticket> {
    return await this.taskModel.create(request);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.taskModel.find().sort({ createdAt: -1 });
  }

  async findActives(): Promise<Ticket[]> {
    return await this.taskModel.find({ isActive: true }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Ticket> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }

    return await this.taskModel.findOne({ _id: id });
  }

  async update(id: string, request: any) {
    return await this.taskModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async accept(id: string, request: any) {

    return await this.taskModel.findByIdAndUpdate(id, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: any) {
    return await this.taskModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
