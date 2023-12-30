import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateScheduleMessagetDto {
  @IsOptional()
  text: string;

  @IsOptional()
  from: string;

  @IsOptional()
  to: string;

  @IsOptional()
  dateToSend: Date;

  @IsOptional()
  isActive: boolean = false;

  @IsOptional()
  sended: boolean = false;

  @IsOptional()
  sendedAt: Date;
}