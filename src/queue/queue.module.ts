import { Module } from "@nestjs/common";
import { QueueService } from "./service/queue.service";
import { QueueController } from "./controller/queue.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Queue, QueueSchema } from "./schema/queue.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
