import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AddProductDto {
    @ApiProperty({description: 'Product id', type: 'string', example: '650b498e5272461a10b90238'})
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({description: 'Product amount', type: 'number', example: 2})
    @IsString()
    @IsNotEmpty()
    amount: number
}