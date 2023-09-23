import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsAlphanumeric } from "class-validator";

export class LoginSellerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @IsAlphanumeric()
  @ApiProperty({ description: 'email', type: 'string', example: 'bershka@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'password', type: 'string', example: '0000' })
  password: string;
}