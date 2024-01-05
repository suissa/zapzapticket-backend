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
import { QueueService } from "../service/queue.service";
import { CreateQueueDto } from "../dto/create-queue.dto";
import { UpdateQueuetDto } from "../dto/update-queue.dto";

@Controller("queues")
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateQueueDto) {
    return this.queueService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log("findAll");
    return this.queueService.findAll();
  }

  @Get("/actives")
  @HttpCode(HttpStatus.OK)
  findActives() {
    return this.queueService.findActives();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  findOne(@Param("id") id: string) {
    return this.queueService.findOne(id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() request: UpdateQueuetDto) {
    return this.queueService.update(id, request);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string) {
    return this.queueService.delete(id);
  }
}