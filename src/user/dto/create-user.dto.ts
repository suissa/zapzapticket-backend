import { IsString, IsNotEmpty, IsArray, IsOptional, IsBoolean } from 'class-validator';
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
  text: string;

  @IsString()
  @IsOptional()
  createdAt: Date;

  @IsString()
  @IsOptional()
  phoneReply: string;
}

export class CreateUserDto {
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
  level: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;

  @IsBoolean()
  @IsOptional()
  isConnected: boolean = false;
}
