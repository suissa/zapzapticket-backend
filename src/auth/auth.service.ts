import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../user/schema/user.schema"; // Ajuste o caminho conforme necessário

const SECRET = "ManoVeioPeriferico#666"
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    console.log("user", user);
    if (user && bcrypt.compareSync(pass, user.password)) {
      console.log("if user", user);
      const { password, ...userWithoutPassword } = user;
      console.log("userWithoutPassword", userWithoutPassword);
      return userWithoutPassword;
    }
    return null;
}


  async login(user: any) {
    const payload = { email: user.email, _id: user._id };
    const token = jwt.sign(payload, SECRET, { expiresIn: "60m" })
    console.log("auth.service.ts login token", token)
    return {
      access_token: token,
    };
  }
}
