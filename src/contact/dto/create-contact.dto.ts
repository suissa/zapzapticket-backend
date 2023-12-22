import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  instanceName: string = "";

  @IsOptional()
  instanceStatus: boolean = false;
}