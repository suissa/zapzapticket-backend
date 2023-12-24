import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ /* opcionalmente, configurações como a porta */ })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('your-message-event')
  handleMessage(@MessageBody() data: any): void {
    // Lógica para lidar com a mensagem recebida
    this.server.emit('response-event', { /* dados de resposta */ });
  }
}
