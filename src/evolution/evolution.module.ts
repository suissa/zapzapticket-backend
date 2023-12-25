import { Module } from '@nestjs/common';
import { EvolutionService } from './service/evolution.service';
import { EvolutionController } from './controller/evolution.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evolution, EvolutionSchema } from './schema/evolution.schema';
import { MessageGateway }  from "../gateways/message.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Evolution.name, schema: EvolutionSchema }]),
    MessageGateway
  ],
  controllers: [EvolutionController],
  providers: [EvolutionService, MessageGateway],
  exports: [EvolutionService],
})
export class EvolutionModule {}
