import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  isActive: boolean = true;
}