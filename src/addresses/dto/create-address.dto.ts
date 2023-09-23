import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({description: 'Name of the city', type: 'string', example: 'Phones'})
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({description: 'Name of the street', type: 'string', example: 'Phones'})
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({description: 'Number of the house', type: 'string', example: 'Phones'})
    @IsNumber()
    @IsNotEmpty()
    house: number;

    @ApiProperty({description: 'Number of the appartment', type: 'string', example: 'Phones'})
    @IsNumber()
    @IsNotEmpty()
    apartment: number;
}
