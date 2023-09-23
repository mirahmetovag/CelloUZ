import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength, IsAlphanumeric } from "class-validator";

export class UpdateRequestAuthDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(32)
    @IsAlphanumeric()
    @ApiProperty({ description: 'username', type: 'string', example: 'eshmat07' })
    username: string;  
}
