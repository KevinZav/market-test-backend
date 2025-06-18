import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleEnum } from "../enums/roles.enum";

export class createAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  name?: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}

export class authLoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}