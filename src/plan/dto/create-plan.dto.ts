import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  users: number = 1;

  @IsNumber()
  @IsOptional()
  connections: number = 1;

  @IsNumber()
  @IsOptional()
  queues: number = 1;

  @IsNumber()
  @IsOptional()
  value: number = 100;

  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;
}
