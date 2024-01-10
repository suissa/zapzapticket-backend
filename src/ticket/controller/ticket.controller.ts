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
import { TicketService } from "../service/ticket.service";
import { CreateTicketDto } from "../dto/create-ticket.dto";

@Controller("tasks")
export class TicketController {
  constructor(private readonly taskService: TicketService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateTicketDto) {
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

  @Patch("/accept/:id")
  @HttpCode(HttpStatus.OK)
  accept(@Param("id") id: string, @Body() request: any) {
    return this.taskService.accept(id, request);
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