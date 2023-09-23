import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AddMoneyDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsString()
    @IsNotEmpty()
    paymentId: string;
}