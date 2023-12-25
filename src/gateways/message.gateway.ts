import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ 
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
 })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("message")
  handleMessage(@MessageBody() data: any): void {
    // Lógica para lidar com a mensagem recebida
    this.server.emit("response-event", { /* dados de resposta */ });
  }
}
