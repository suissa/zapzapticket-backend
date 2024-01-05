import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateQueueDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
  // userEmail tem q pegar o email do usuário logado
  @IsNotEmpty()
  adminEmail: string;

  @IsOptional()
  isActive: boolean = true;
}