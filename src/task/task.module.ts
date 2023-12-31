import { Module } from '@nestjs/common';
import { TaskService } from './service/message.service';
import { TaskController } from './controller/message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
