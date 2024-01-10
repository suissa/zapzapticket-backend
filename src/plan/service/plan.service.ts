import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Plan } from "../schema/plan.schema";
import mongoose, { Model } from "mongoose";
import { CreatePlanDto } from "../dto/create-plan.dto";

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan.name)
    private planModel: Model<Plan>) {}

  async create(request: CreatePlanDto): Promise<Plan> {
    return await this.planModel.create(request);
  }

  async findAll(): Promise<Plan[]> {
    return await this.planModel.find().sort({ createdAt: -1 });
  }

  async findActives(): Promise<Plan[]> {
    return await this.planModel.find({ isActive: true }).sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<Plan> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }

    return await this.planModel.findOne({ _id: id });
  }


  async update(id: string, request: any) {
    return await this.planModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: any) {
    return await this.planModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.planModel.findByIdAndDelete(id);
  }
}
