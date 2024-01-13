import { Injectable } from "@nestjs/common";
import { UserService } from "../user/service/user.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import mongoose from "mongoose";

const SECRET = "ManoVeioSuissebas#666"
@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
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
    return {
      access_token: jwt.sign(payload, SECRET, { expiresIn: "60m" }),
    };
  }
}
