import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sku: string;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  price: number;
}