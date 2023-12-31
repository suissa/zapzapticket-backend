import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateScheduleMessageDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  dateToSend: Date;

  @IsOptional()
  isActive: boolean = true;

  @IsOptional()
  sended: boolean = false;
  
  @IsOptional()
  sendedAt: Date;
}