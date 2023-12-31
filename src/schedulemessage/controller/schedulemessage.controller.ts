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
import { ScheduleMessageService } from "../service/schedulemessage.service";
import { CreateScheduleMessageDto } from "../dto/create-schedulemessage.dto";
import { UpdateScheduleMessagetDto } from "../dto/update-schedulemessage.dto";

@Controller("schedulemessages")
export class ScheduleMessageController {
  constructor(private readonly schedulemessageService: ScheduleMessageService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateScheduleMessageDto) {
    return this.schedulemessageService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log("findAll");
    return this.schedulemessageService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.schedulemessageService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: UpdateScheduleMessagetDto) {
    return this.schedulemessageService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.schedulemessageService.delete(id);
  }
}