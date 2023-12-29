import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateScheduleMessageDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  isActive: boolean = true;
}