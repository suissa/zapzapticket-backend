import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
// import { EvolutionService } from "../evolution/service/evolution.service"

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // constructor(private evolutionService: EvolutionService) {}
  // @SubscribeMessage("message")
  // handleMessage(@MessageBody() data: any): void {
  //   // Lógica para lidar com a mensagem recebida
  //   this.server.emit("response-event", { /* dados de resposta */ });
  // }

  // Este método é chamado quando um cliente se conecta
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  // Este método é chamado quando um cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage("message")
  handleMessage(@MessageBody() data: any): void {
    console.log('Mensagem recebida:', data);

    // Aqui você pode adicionar qualquer lógica adicional que desejar

    // Emitindo uma resposta para todos os clientes conectados
    this.server.emit("message", { text: "Resposta do servidor para a mensagem recebida." });
  }

}
