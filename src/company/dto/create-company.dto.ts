import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

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

  @IsString()
  @IsOptional()
  planId: string;  // Representando um ObjectId como string

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
