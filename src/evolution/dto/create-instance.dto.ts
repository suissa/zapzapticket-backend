import { IsNotEmpty, IsOptional, Min } from "class-validator";

export class CreateEvolutionDto {
  @IsNotEmpty()
  instanceName: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  qrcode: string;
}
