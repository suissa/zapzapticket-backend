import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateScheduleMessagetDto {
  @IsOptional()
  text: string;

  @IsOptional()
  title: string;

  @IsOptional()
  isActive: boolean = false;
}