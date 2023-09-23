import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString  } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @ApiProperty({description: 'Category name', type: 'string', example: 'Phones'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({description: 'Parent category id', type: 'string', example: '650b498e5272461a10b90238'})
    parentCategory?: string;
}
