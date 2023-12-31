import { IsNotEmpty } from 'class-validator';

export class UpdateTagtDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string = "#ff0000";
}