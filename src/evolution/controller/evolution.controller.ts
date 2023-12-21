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
  Res,
} from "@nestjs/common";
import { EvolutionService } from "../service/evolution.service";
import { CreateEvolutionDto } from "../dto/create-evolution.dto";
import axios from "axios";

@Controller("evolution")
export class EvolutionController {
  constructor(private readonly evolutionService: EvolutionService) {}

  @Post("instances")
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateEvolutionDto) {
    return this.evolutionService.create(request);
  }

  @Get("instances")
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.evolutionService.findAll();
  }

  @Get("instances/connectionState/:instance")
  @HttpCode(HttpStatus.OK)
  coonnectionState(@Param() params: any) {

    return this.evolutionService.coonnectionState(params.instance);
  }

  @Get("instances/:instanceName")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("instanceName") instanceName: string) {
    return this.evolutionService.findOne(instanceName);
  }

  // @Delete(":id")
  // @HttpCode(HttpStatus.OK)
  // delete(@Param("id") id: string) {
  //   return this.evolutionService.delete(id);
  // }
}
