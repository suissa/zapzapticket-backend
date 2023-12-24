import { Module } from '@nestjs/common';
import { ConnectionService } from '../connection/service/connection.service';
import { EvolutionService } from './service/evolution.service';
import { ContactService } from '../contact/service/contact.service';
import { MessageService } from '../message/service/message.service';
import { EvolutionController } from './controller/evolution.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evolution, EvolutionSchema } from './schema/evolution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evolution.name, schema: EvolutionSchema }]),
  ],
  controllers: [EvolutionController],
  providers: [EvolutionService],
  exports: [EvolutionService],
})
export class EvolutionModule {}
