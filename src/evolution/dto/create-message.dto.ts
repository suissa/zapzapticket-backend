import { IsNotEmpty, IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

class OptionsDto {
  @IsNotEmpty()
  @IsNumber()
  delay: number = 1200;

  @IsOptional()
  @IsString()
  presence: string = 'composing';

  @IsOptional()
  @IsBoolean()
  linkPreview: boolean = false;
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
  options: OptionsDto = { delay: 1200, presence: 'composing', linkPreview: false };

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