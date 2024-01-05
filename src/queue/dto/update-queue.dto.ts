import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateQueuetDto {
  @IsOptional()
  name: string;

  @IsOptional()
  color: string;

  @IsOptional()
  adminEmail: string;

  @IsOptional()
  isActive: boolean = false;
}