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
import { ConnectionService } from "../service/connection.service";
import { CreateConnectionDto } from "../dto/create-connection.dto";
import { UpdateConnectionDto } from "../dto/update-connection.dto";
import { MessageConnectionDto } from "../dto/message-connection.dto";

@Controller("connections")
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateConnectionDto) {
    return this.connectionService.create(request);
  }

  @Post("/message/send")
  @HttpCode(HttpStatus.OK)
  sendMessage(@Body() request: MessageConnectionDto) {
    return this.connectionService.sendMessage(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.connectionService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.connectionService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: UpdateConnectionDto) {
    return this.connectionService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.connectionService.delete(id);
  }

  @Delete("/shutdown/:instanceName")
  @HttpCode(HttpStatus.OK)
  shutdown(@Param("instanceName") instanceName: string) {
    console.log("shutdown controller: ", instanceName)
    return this.connectionService.shutDown(instanceName);
  }
}
