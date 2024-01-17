import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsObject()
  @IsOptional()
  planId: {};  // Representando um ObjectId como string

  @IsString()
  @IsOptional()
  planName: string;  // Representando um ObjectId como string

  @IsBoolean()
  @IsOptional()
  campaignsEnabled: boolean;

  @IsString()
  @IsOptional()
  dueDate: string;

  @IsBoolean()
  @IsOptional()
  recurrence: boolean = true;

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;
}
