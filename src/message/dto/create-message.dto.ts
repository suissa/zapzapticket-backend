import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  isActive: boolean = true;
}