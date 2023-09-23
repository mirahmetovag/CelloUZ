import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class RegisterSellerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Name of your company', type: 'string', example: 'Bershka'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Description of your company', type: 'string', example: 'Women clothes'})
    description: string;

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty({description: 'Pinfl of your company', type: 'string', example: '234222342143'})
    stir:  string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Password for log in of your company', type: 'string', example: 'BeR2023'})
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Official email of your company', type: 'string', example: 'bershka@gmail.com'})
    email: string;
}