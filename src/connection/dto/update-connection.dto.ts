import { IsNotEmpty, IsOptional, Min } from "class-validator";

export class UpdateConnectionDto {

  @IsOptional()
  instanceStatus: boolean;
}
