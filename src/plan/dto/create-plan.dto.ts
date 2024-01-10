import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePlanDto {
  @IsNotEmpty()
  text: string;

  // userEmail tem q pegar o email do usuário logado
  // @IsNotEmpty()
  // userEmail: string;

  @IsOptional()
  isActive: boolean = true;
}