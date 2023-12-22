import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  instanceName: string = "";

  @IsOptional()
  instanceStatus: boolean = false;
}