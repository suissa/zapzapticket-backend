import { Module } from "@nestjs/common";
import { CompanyService } from "./service/company.service";
import { CompanyController } from "./controller/company.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Company, CompanySchema } from "./schema/company.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
