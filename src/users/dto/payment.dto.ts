import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PaymentDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number
}