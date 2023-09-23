import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class VerifySellerDto {
    @ApiProperty({ description: 'email', type: 'string', example: 'bershka@gmail.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'otp', type: 'number', example: '00001111' })
    @IsNumber()
    @IsNotEmpty()
    otp: number;
}