import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsAlphanumeric, IsNotEmpty, MaxLength } from "class-validator/types/decorator/decorators";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    @IsAlphanumeric()
    @ApiProperty({ description: 'username', type: 'string', example: 'eshmat07' })
    username: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'password', type: 'string', example: '0000' })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    @ApiProperty({ description: 'email', type: 'string', example: 'eshmat@gmail.com' })
    email: string;

    @IsString()
    role: string;
}
