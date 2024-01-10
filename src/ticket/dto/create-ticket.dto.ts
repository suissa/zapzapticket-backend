import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsArray, IsDate } from 'class-validator';

class CreateMessageDto {
  @IsString()
  @IsOptional()
  type: string = 'sent';

  @IsString()
  @IsOptional()
  typeMessage: string = 'text';

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsBoolean()
  @IsOptional()
  read: boolean = false;
}

export class CreateTicketDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  userEmail: string;

  @IsString()
  @IsOptional()
  adminEmail: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;

  @IsBoolean()
  @IsOptional()
  isOpen: boolean = true;

  @IsArray()
  @IsOptional()
  messages: CreateMessageDto[];

  @IsOptional()
  @IsDate() // Correto uso do IsDate
  statusUpdate: Date;

  @IsOptional()
  @IsDate() // Correto uso do IsDate
  statusOpen: Date;

  @IsOptional()
  @IsDate() // Correto uso do IsDate
  statusClosed: Date;
}
