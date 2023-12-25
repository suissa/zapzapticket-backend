// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  Inject
} from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}


  @Post("messages/send/batch")
  @HttpCode(HttpStatus.OK)
  async sendBatchMessages(@Body() request: any) {
    const message = { text: JSON.stringify(request) };
    await this.client.emit<any>('messages_queue', message);
    return 'Mensagem enviada';
  }

  @Post('send')
  async sendMessage() {
    const message = { text: 'Hello RabbitMQ!' };
    await this.client.emit<any>('messages_queue', message);
    return 'Mensagem enviada';
  }
}
