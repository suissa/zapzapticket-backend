import { IsNotEmpty, IsOptional } from "class-validator";

export class MessageConnectionDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  instanceName: string = "";

  @IsNotEmpty()
  message: string = "";
}