import { IsOptional, IsInt, IsEnum, IsDateString } from 'class-validator';

export class UpdateInvoiceDto {
    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsInt()
    total_amount?: number;

    @IsOptional()
    @IsEnum(['Cash' , 'Credit_card' , 'Bank_transfer'])
    payment_method?: 'Cash' | 'Credit_card' | 'Bank_transfer';

    @IsOptional()
    @IsEnum(['Paid' , 'Unpaid'])
    status?: 'Paid' | 'Unpaid';

    @IsOptional()
    @IsInt()
    booking_id?: number;

    @IsOptional()
    @IsInt()
    hotel_id?: number;
}