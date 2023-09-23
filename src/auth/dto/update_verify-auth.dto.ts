import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, MaxLength, IsAlphanumeric } from "class-validator";

export class UpdateVerifyAuthDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    @IsAlphanumeric()
    @ApiProperty({ description: 'username', type: 'string', example: 'eshmat07' })
    username: string;  
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'Verification code', type: 'number', example: 12345678 })
    otp: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'New password', type: 'string', example: '0000' })
    newPassword: string;
}
