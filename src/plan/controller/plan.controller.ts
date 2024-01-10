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
import { PlanService } from "../service/plan.service";
import { CreatePlanDto } from "../dto/create-plan.dto";

@Controller("plans")
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreatePlanDto) {
    return this.planService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log("findAll");
    return this.planService.findAll();
  }

  @Get("/actives")
  @HttpCode(HttpStatus.OK)
  findActives() {
    return this.planService.findActives();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.planService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: any) {
    return this.planService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.planService.delete(id);
  }
}