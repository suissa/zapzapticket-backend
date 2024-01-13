import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schema/user.schema";
import mongoose, { Model } from "mongoose";
import { UpdateUsertDto } from "../dto/update-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>) {}

    async create(request: CreateUserDto): Promise<User> {
      const hashedPassword = await bcrypt.hash(request.password, 10); // Criptografe a senha
      const createUser = { ...request, password: hashedPassword }; // Substitua a senha pela senha criptografada
  
      return await this.userModel.create(createUser);
    }
  
  async findAll(): Promise<User[]> {
    return await this.userModel.find({ isActive: true });
  }

  async findAllWithNoActive(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException("Please enter correct id.");
    }

    return await this.userModel.findOne({ _id: id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).lean();
  }

  async update(id: string, request: UpdateUsertDto) {
    return await this.userModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async updateAll(request: UpdateUsertDto) {
    return await this.userModel.updateMany({}, request);
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async softDelete(id: string) {
    const request = { isActive: false }
    console.log("softDelete id", id)
    console.log("softDelete request", request)
    return await this.userModel.findByIdAndUpdate(id, request);
  }

}
