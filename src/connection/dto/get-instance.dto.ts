import { IsString, IsNotEmpty, IsOptional, IsUrl, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class InstanceDetails {
  @IsNotEmpty()
  @IsString()
  instanceName: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  profileName: string;

  @IsUrl()
  profilePictureUrl: string;

  @IsString()
  profileStatus: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  serverUrl: string;

  @IsNotEmpty()
  @IsString()
  apikey: string;
}

export class GetInstanceDto {
  @ValidateNested()
  @Type(() => InstanceDetails)
  instance: InstanceDetails;
}