import { Module } from '@nestjs/common';
import { EvolutionService } from './service/evolution.service';
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
