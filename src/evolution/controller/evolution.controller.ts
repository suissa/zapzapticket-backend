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
import { CreateEvolutionDto } from "../dto/create-instance.dto";
import { CreateMessageDto } from "../dto/create-message.dto";

@Controller("evolution")
export class EvolutionController {
  constructor(private readonly evolutionService: EvolutionService) {}

  @Post("instances")
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateEvolutionDto) {
    return this.evolutionService.create(request);
  }

  @Post("instances/qrcode")
  @HttpCode(HttpStatus.OK)
  createAndReturnQRCode(@Body() request: CreateEvolutionDto) {
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

  @Delete("instances/logout/:instanceName")
  @HttpCode(HttpStatus.OK)
  logout(@Param("instanceName") instanceName: string) {
    return this.evolutionService.delete(instanceName);
  }

  @Delete("instances/delete/:instanceName")
  @HttpCode(HttpStatus.OK)
  delete(@Param("instanceName") instanceName: string) {
    return this.evolutionService.delete(instanceName);
  }

  @Post("messages/send/batch")
  @HttpCode(HttpStatus.OK)
  sendBatchMessages(@Body() request: CreateMessageDto) {
    return this.evolutionService.sendBatchMessages(request);
  }

  @Post("messages/send/:instanceName")
  @HttpCode(HttpStatus.OK)
  post(@Body() request: CreateMessageDto, @Param("instanceName") instanceName: string) {
    return this.evolutionService.sendMessage(request, instanceName);
  }

}
