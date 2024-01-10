import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "../schema/company.schema";
import mongoose, { Model } from "mongoose";
import { UpdateCompanytDto } from "../dto/update-company.dto";
import { CreateCompanyDto } from "../dto/create-company.dto";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: Model<Company>) {}

  async create(request: CreateCompanyDto): Promise<Company> {
    return await this.companyModel.create(request);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyModel.find().sort({ createdAt: -1 });
  }

  async findActives(): Promise<Company[]> {
    return await this.companyModel.find({ isActive: true }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Company> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }

    return await this.companyModel.findOne({ _id: id });
  }


  async update(id: string, request: UpdateCompanytDto) {
    return await this.companyModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateCompanytDto) {
    return await this.companyModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.companyModel.findByIdAndDelete(id);
  }
}
