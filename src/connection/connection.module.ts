import { Module } from '@nestjs/common';
import { ConnectionService } from './service/connection.service';
import { ConnectionController } from './controller/connection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, ConnectionSchema } from './schema/connection.schema';
import { EvolutionModule } from "../evolution/evolution.module"
import { EvolutionService } from 'src/evolution/service/evolution.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Connection.name, schema: ConnectionSchema }]),
  ],
  controllers: [ConnectionController],
  providers: [ConnectionService, EvolutionService],
})
export class ConnectionModule {}
