import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateUsertDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  instanceName: string;

  @IsOptional()
  instanceStatus: boolean;
}
