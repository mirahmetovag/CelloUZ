import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber} from 'class-validator';

export class UpdateAmountDto {
    @ApiProperty({description: 'Product new available amount', type: 'number', example: '32'})
    @IsNumber()
    @IsNotEmpty()
    newAmount: number;
}
