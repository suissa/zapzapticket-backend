import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCompanytDto {
  @IsOptional()
  text: string;

  @IsOptional()
  userEmail: string;

  @IsOptional()
  isActive: boolean = false;
}