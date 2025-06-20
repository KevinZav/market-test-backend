import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RoleEnum } from "../enums/roles.enum";
import { ApiProperty } from "@nestjs/swagger";

export class createAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  @ApiProperty()
  role: RoleEnum;
}

export class authLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}