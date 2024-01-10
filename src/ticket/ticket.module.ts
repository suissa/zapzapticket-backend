import { Module } from "@nestjs/common";
import { TicketService } from "./service/ticket.service";
import { TicketController } from "./controller/ticket.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Ticket, TicketSchema } from "./schema/ticket.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
