import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleMessage } from '../schema/schedulemessage.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateScheduleMessagetDto } from '../dto/update-schedulemessage.dto';
import { CreateScheduleMessageDto } from '../dto/create-schedulemessage.dto';

@Injectable()
export class ScheduleMessageService {
  constructor(
    @InjectModel(ScheduleMessage.name)
    private schedulemessageModel: Model<ScheduleMessage>) {}

  async create(request: CreateScheduleMessageDto): Promise<ScheduleMessage> {
    return await this.schedulemessageModel.create(request);
  }

  async findAll(): Promise<ScheduleMessage[]> {
    return await this.schedulemessageModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<ScheduleMessage> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.schedulemessageModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateScheduleMessagetDto) {
    return await this.schedulemessageModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateScheduleMessagetDto) {
    return await this.schedulemessageModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.schedulemessageModel.findByIdAndDelete(id);
  }
}
