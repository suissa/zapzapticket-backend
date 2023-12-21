import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateConnectionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  instanceName: string = "";

  @IsOptional()
  instanceStatus: boolean = false;
}