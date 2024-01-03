import { Module } from "@nestjs/common";
import { ConnectionService } from "./service/connection.service";
import { ConnectionController } from "./controller/connection.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Connection, ConnectionSchema } from "./schema/connection.schema";
import { EvolutionModule } from "src/evolution/evolution.module"
import { EvolutionService } from "src/evolution/service/evolution.service"
import { MessageGateway } from "src/gateways/message.gateway";
import { GatewayModule } from "src/gateways/gateway.module";
import { RabbitmqService } from "src/evolution/service/rabbitmq.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Connection.name, schema: ConnectionSchema }]),
    MessageGateway,
    GatewayModule
  ],
  controllers: [ConnectionController],
  providers: [ConnectionService, EvolutionService, MessageGateway, RabbitmqService],
  exports: [ConnectionService, MongooseModule],
})
export class ConnectionModule {}
