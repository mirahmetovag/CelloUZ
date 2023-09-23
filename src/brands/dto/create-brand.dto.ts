import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
    @ApiProperty({description: 'Category name', type: 'string', example: 'Phones'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Parent category name', type: 'string', example: 'Electronics'})
    @IsString()
    @IsNotEmpty()
    label: string;
}