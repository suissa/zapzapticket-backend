import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BadgeDto {
  @IsString()
  type: string;
}

class MessageDto {
  @IsString()
  @IsOptional()
  type: string = 'sent';

  @IsString()
  @IsOptional()
  typeMessage: string = 'text';

  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  createdAt: Date;

  @IsString()
  @IsOptional()
  phoneReply: string;
}

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  status: string = "Lista fria";

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  ticketStatus: string = "inativo";

  @IsString()
  @IsOptional()
  ticketCreatedAt: string;

  @IsString()
  @IsOptional()
  ticketClosedAt: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  badges: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @IsOptional()
  messages: MessageDto[];
}
