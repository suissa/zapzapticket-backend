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
} from "@nestjs/common";
import { CompanyService } from "../service/company.service";
import { CreateCompanyDto } from "../dto/create-company.dto";
// import { UpdateCompanytDto } from "../dto/update-company.dto";

@Controller("company")
export class CompanyController {
  constructor(private readonly taskService: CompanyService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateCompanyDto) {
    return this.taskService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log("findAll");
    return this.taskService.findAll();
  }

  @Get("/actives")
  @HttpCode(HttpStatus.OK)
  findActives() {
    return this.taskService.findActives();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: any) {
    return this.taskService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.taskService.delete(id);
  }
}