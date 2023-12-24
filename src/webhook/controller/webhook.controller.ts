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
} from '@nestjs/common';
import { WebhookService } from '../service/webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  receiveWebhook(@Body() body: any) {
    console.log(body);
    // Faça algo com o body
    return { message: 'Webhook recebido!' };
  }
}
