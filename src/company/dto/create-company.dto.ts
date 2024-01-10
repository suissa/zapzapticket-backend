import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

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

  @IsString()
  @IsOptional()
  campaignsEnabled: boolean;

  @IsString()
  @IsOptional()
  dueDate: string;

  @IsString()
  @IsOptional()
  recurrence: boolean;
}
