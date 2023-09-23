import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({description: 'Category name', type: 'string', example: 'Phones'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({description: 'Parent category name', type: 'string', example: 'Electronics'})
    @IsString()
    @IsOptional()
    parentCategory?: string;
}
