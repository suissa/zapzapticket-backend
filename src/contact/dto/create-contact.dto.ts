import { IsString, IsNotEmpty, IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class BadgeDto {
  @IsString()
  type: string;
}

class MessageDto {
  @IsString()
  @IsOptional()
  type: string = "sent";

  @IsString()
  @IsOptional()
  typeMessage: string = "text";

  @IsString()
  @IsOptional()
  text: string;

  @IsString()
  @IsOptional()
  createdAt: Date;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  read: boolean = false;
}

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string = "Não informado";

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  status: string = "Lista fria";

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsNotEmpty()
  @IsString()
  profilePictureUrl: string = "/images/avatar-01.png";

  @IsString()
  @IsOptional()
  ticketStatus: string = "inativo";

  @IsString()
  @IsOptional()
  ticketCreatedAt: string;

  @IsString()
  @IsOptional()
  ticketClosedAt: string;

  @IsString()
  @IsOptional()
  transferedTo: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  badges: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @IsOptional()
  messages: MessageDto[];
}

export type CreateContactDtoPartial = Partial<CreateContactDto>;
