import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateMessagetDto {
  @IsOptional()
  text: string;

  @IsOptional()
  title: string;

  @IsOptional()
  isActive: boolean = false;
}