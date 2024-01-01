import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string = "#ff0000";

  // pega o email do usuário logado
  // @IsNotEmpty()
  // adminEmail: string;
}