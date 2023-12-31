import { Module } from "@nestjs/common";
import { ContactService } from "./service/contact.service";
import { ContactController } from "./controller/contact.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Contact, ContactSchema } from "./schema/contact.schema";
import { ConnectionModule } from "../connection/connection.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
    ConnectionModule
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService, MongooseModule],
})
export class ContactModule {}
