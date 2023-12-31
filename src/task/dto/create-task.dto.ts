import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  userEmail: string;

  @IsOptional()
  isActive: boolean = true;
}