import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from '../schema/contact.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<Contact>) {}

  async create(request: CreateContactDto): Promise<Contact> {
    return await this.contactModel.create(request);
  }

  async findAll(): Promise<Contact[]> {
    return await this.contactModel.find();
  }

  async findAllById(request: string[]): Promise<Contact[]> {
    return await this.contactModel.find({ _id: { $in: request } }).exec();
  }

  async findOne(id: string): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.contactModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateContactDto) {
    return await this.contactModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateContactDto) {
    return await this.contactModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.contactModel.findByIdAndDelete(id);
  }
}
