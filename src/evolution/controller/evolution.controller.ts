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
  UseGuards
} from "@nestjs/common";
import { EvolutionService } from "../service/evolution.service";
import { CreateEvolutionDto } from "../dto/create-instance.dto";
import { CreateMessageDto } from "../dto/create-message.dto";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  @Post("connection/send/message")
  @HttpCode(HttpStatus.OK)
  sendConnectionMessage(@Body() request: any) {
    return this.evolutionService.sendSimpleMessage(request.phone, request.text, request.instanceName);
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

  @Delete("instances/logout/:instanceName")
  @HttpCode(HttpStatus.OK)
  logout(@Param("instanceName") instanceName: string) {
    return this.evolutionService.delete(instanceName);
  }

  @Delete("instances/delete/:instanceName")
  @HttpCode(HttpStatus.OK)
  delete(@Param("instanceName") instanceName: string) {
    console.log("delete controller: ", instanceName)
    return this.evolutionService.delete(instanceName);
  }
  
  @Get("instances/:instanceName")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("instanceName") instanceName: string) {
    return this.evolutionService.findOne(instanceName);
  }


  // @Post("messages/send/batch")
  // @HttpCode(HttpStatus.OK)
  // sendBatchMessages(@Body() request: any) {
  //   console.log("controller request: ", request)
  //   return this.evolutionService.sendBatchMessages(request);
  // }

  @Post("messages/send/queue")
  @HttpCode(HttpStatus.OK)
  sendMessagesToQueue(@Body() request: any, @Res() res: any) {
    return this.evolutionService.sendBatchMessages(request);
  }

  @Post("messages/send/:instanceName")
  @HttpCode(HttpStatus.OK)
  post(@Body() request: CreateMessageDto, @Param("instanceName") instanceName: string) {
    return this.evolutionService.sendMessage(request, instanceName);
  }

  @Get("groups/:instanceName")
  @HttpCode(HttpStatus.OK)
  getAllGroups(@Param("instanceName") instanceName: string) {
    return this.evolutionService.getAllGroups(instanceName);
  }

  @Get("profile/:instanceName/:number")
  @HttpCode(HttpStatus.OK)
  getProfileData(@Param("instanceName") instanceName: string, @Param("number") number: string) {
    return this.evolutionService.getProfileData(instanceName, number);
  }
}
