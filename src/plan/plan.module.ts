import { Module } from "@nestjs/common";
import { PlanService } from "./service/plan.service";
import { PlanController } from "./controller/plan.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Plan, PlanSchema } from "./schema/plan.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
  ],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
