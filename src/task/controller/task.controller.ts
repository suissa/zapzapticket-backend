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
import { TaskService } from '../service/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTasktDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() request: CreateTaskDto) {
    return this.taskService.create(request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log('findAll');
    return this.taskService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() request: UpdateTasktDto) {
    return this.taskService.update(id, request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}