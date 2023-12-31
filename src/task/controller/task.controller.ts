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
} from '@nestjs/common';
import { TaskService } from '../service/message.service';
import { CreateTaskDto } from '../dto/create-message.dto';
import { UpdateTasktDto } from '../dto/update-message.dto';

@Controller('messages')
export class TaskController {
  constructor(private readonly messageService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateTaskDto) {
    return this.messageService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log('findAll');
    return this.messageService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() request: UpdateTasktDto) {
    return this.messageService.update(id, request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.messageService.delete(id);
  }
}