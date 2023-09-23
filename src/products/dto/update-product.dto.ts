import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @ApiProperty({description: 'Product name', type: 'string', example: 'IPhone 14Pro'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Product description', type: 'string', example: '256GB 2023year'})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({description: 'Category id', type: 'string', example: '2hhsadnbkasrg7832gd'})
    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @ApiProperty({description: 'Product brand id', type: 'string', example: 'sfdkhr8934y'})
    @IsString()
    @IsNotEmpty()
    brandId: string;

    @ApiProperty({description: 'Product price per unit', type: 'number', example: '320.000'})
    @IsNumber()
    @IsNotEmpty()
    pricePerUnit: number;

    @ApiProperty({description: 'Product available amount', type: 'number', example: '32'})
    @IsNumber()
    @IsNotEmpty()
    availableAmount: number;

    @ApiPropertyOptional({description: 'Product price per unit', type: 'string', example: 'M'})
    @IsNumber()
    @IsOptional()
    size: string;

    @ApiProperty({description: 'Product image saved name', type: 'string', example: 'afgesjr63wi7ehd'})
    @IsString()
    @IsNotEmpty()
    imageName: string;
}
