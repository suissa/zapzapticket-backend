import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "../schema/company.schema";
import { Plan } from "../schema/iPlan";
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
    const companies = await this.companyModel.find()
      .populate({
        path: "planId", // path é o nome do campo que refere o plano
        select: "name" // seleciona apenas o campo "name" e exclui o campo "_id" do plano
      }) // Substitua "planId" pelo nome do campo que você usa para referenciar o plano
      .sort({ createdAt: -1 })
      .exec();

      return companies.map(company => {
        const companyObj = company.toObject();
        const planName = (company.planId as Plan).name; // Casting para Plan, pois sabemos que foi populado
        return {
          ...companyObj,
          planName // Adiciona a propriedade planName com o valor do nome do plano
        };
      });
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
