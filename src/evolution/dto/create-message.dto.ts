import { IsNotEmpty, IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

class OptionsDto {
  @IsNotEmpty()
  @IsNumber()
  delay: number;

  @IsOptional()
  @IsString()
  presence: string;

  @IsOptional()
  @IsBoolean()
  linkPreview: boolean;
}

class TextMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  options: OptionsDto;

  @IsNotEmpty()
  textMessage: TextMessageDto;
}

// {
// 	"number":"5515991957645",
//  	"options":{ 
// 		"delay":1200,
// 		"presence":"composing",
// 		"linkPreview":false},
// 		"textMessage":{
// 		"text":"Teste de Nest.js"
// 	}
// }