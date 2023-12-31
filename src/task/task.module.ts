import { Module } from "@nestjs/common";
import { TaskService } from "./service/task.service";
import { TaskController } from "./controller/task.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "./schema/task.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
