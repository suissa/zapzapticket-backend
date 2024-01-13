import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUsertDto } from "../dto/update-user.dto";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateUserDto) {
    return this.userService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log("findAll");
    return this.userService.findAll();
  }

  @Get("/all")
  @HttpCode(HttpStatus.OK)
  findAllWithNoActive() {
    console.log("findAllWithNoActive");
    return this.userService.findAllWithNoActive();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: UpdateUsertDto) {
    return this.userService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }

  @Delete("soft/:id")
  @HttpCode(HttpStatus.OK)
  softDelete(@Param("id") id: string) {
    return this.userService.softDelete(id);
  }
}