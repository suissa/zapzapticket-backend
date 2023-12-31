import { IsString, IsObject, IsOptional, IsBoolean, IsNumber } from "class-validator";

class WebhookKeyDto {
  @IsString()
  remoteJid: string;

  @IsOptional()
  @IsBoolean()
  fromMe?: boolean;

  @IsString()
  id: string;
}

class WebhookMessageDto {
  @IsOptional()
  @IsString()
  conversation?: string;

  @IsOptional()
  messageContextInfo?: any; // Você pode querer definir um tipo mais específico
}

class WebhookDataDto {
  @IsObject()
  key: WebhookKeyDto;

  @IsOptional()
  @IsString()
  pushName?: string;

  @IsObject()
  message: WebhookMessageDto;

  @IsString()
  messageType: string;

  @IsOptional()
  @IsNumber()
  messageTimestamp?: number;

  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsString()
  source?: string;
}

export class CreateWebhookDto {
  @IsString()
  event: string;

  @IsObject()
  data: WebhookDataDto;

  @IsString()
  instance: string;

  @IsString()
  date_time: string;

  @IsString()
  sender: string;

  @IsString()
  apikey: string;

  @IsOptional()
  @IsString()
  server_url?: string; // Adicionado campo server_url
}
