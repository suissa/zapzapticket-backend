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

let MESSAGE = "";
let PHONE = "";
let INSTANCENAME = "";

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
    console.log(`Cliente conectado: ${client.id}`, new Date());
  }

  // Este método é chamado quando um cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage("message")
  handleMessage(@MessageBody() data: any): void {
    console.log("Mensagem recebida:", data);

    // Aqui você pode adicionar qualquer lógica adicional que desejar

    // Emitindo uma resposta para todos os clientes conectados
    this.server.emit("message", { text: "Resposta do servidor para a mensagem recebida." });
  }

  @SubscribeMessage("message:chat:send")
  handleMessageChatSend(@MessageBody() data: any): void {
    console.log("Mensagem para enviar:", data);
    const { message, phone, instanceName } = JSON.parse(data);
    if (message == MESSAGE && phone == PHONE && instanceName == INSTANCENAME) {
      console.log("Mensagem duplicada, ignorar");
      return;
    }
    MESSAGE = message;
    PHONE = phone;
    INSTANCENAME = instanceName;
    // Aqui você pode adicionar qualquer lógica adicional que desejar

    // Emitindo uma resposta para todos os clientes conectados
    this.server.emit("message", { text: "Resposta do servidor para a mensagem a ser enviada recebida. "+message });
  }

}
