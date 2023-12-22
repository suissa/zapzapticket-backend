import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BadgeDto {
  @IsString()
  type: string;
}

class MessageDto {
  @IsString()
  @IsOptional()
  type: string = 'text';

  @IsString()
  @IsOptional()
  typeMessage: string = 'text';

  @IsString()
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

  @IsNotEmpty()
  @IsString()
  status: string;

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
  @IsOptional()
  ticketStatus: string;

  @IsString()
  @IsOptional()
  ticketCreatedAt: string;

  @IsString()
  @IsOptional()
  ticketClosedAt: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BadgeDto)
  @IsOptional()
  badges: BadgeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @IsOptional()
  messages: MessageDto[];
}
