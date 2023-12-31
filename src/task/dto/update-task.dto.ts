import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTasktDto {
  @IsOptional()
  text: string;

  @IsOptional()
  userEmail: string;

  @IsOptional()
  isActive: boolean = false;
}