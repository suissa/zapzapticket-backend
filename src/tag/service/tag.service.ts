import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from '../schema/tag.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateTagtDto } from '../dto/update-tag.dto';
import { CreateTagDto } from '../dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<Tag>) {}

  async create(request: CreateTagDto): Promise<Tag> {
    return await this.tagModel.create(request);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Tag> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.tagModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateTagtDto) {
    return await this.tagModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateTagtDto) {
    return await this.tagModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.tagModel.findByIdAndDelete(id);
  }
}
