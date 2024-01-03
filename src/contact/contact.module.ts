import { Module } from "@nestjs/common";
import { ContactService } from "./service/contact.service";
import { ContactController } from "./controller/contact.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Contact, ContactSchema } from "./schema/contact.schema";
import { ConnectionModule } from "../connection/connection.module";
import { EvolutionModule } from "../evolution/evolution.module";
import { EvolutionService } from "../evolution/service/evolution.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    ConnectionModule,
    EvolutionModule
  ],
  controllers: [ContactController],
  providers: [ContactService, EvolutionService],
  exports: [ContactService, MongooseModule],
})
export class ContactModule {}
