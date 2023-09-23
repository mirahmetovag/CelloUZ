import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({description: 'Product id', type: 'string', example: '650b498e5272461a10b90238'})
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({description: 'Product name', type: 'number', example: 2})
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({description: 'Product name', type: 'string', example: '650b498e5272461a10b90238'})
    @IsString()
    @IsNotEmpty()
    addressId: string;
}