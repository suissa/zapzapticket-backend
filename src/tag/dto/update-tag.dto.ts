import { IsNotEmpty } from 'class-validator';

export class UpdateTagtDto {
  @IsNotEmpty()
  name: string;
}