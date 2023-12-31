import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTasktDto {
  @IsOptional()
  text: string;

  @IsOptional()
  title: string;

  @IsOptional()
  isActive: boolean = false;
}