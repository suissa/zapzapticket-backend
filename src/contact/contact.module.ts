import { Module } from '@nestjs/common';
import { ContactService } from './service/contact.service';
import { ContactController } from './controller/contact.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schema/contact.schema';
import { EvolutionModule } from "../evolution/evolution.module"
import { EvolutionService } from 'src/evolution/service/evolution.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
  controllers: [ContactController],
  providers: [ContactService, EvolutionService],
})
export class ContactModule {}
