import { IsInt, IsEnum } from 'class-validator';

export class CreateInvoiceDto {

    @IsInt()
    total_amount: number;

    @IsEnum(['Cash' , 'Credit_card' , 'Bank_transfer'])
    payment_method: 'Cash' | 'Credit_card' | 'Bank_transfer';

    @IsEnum(['Paid' , 'Unpaid'])
    status: 'Paid' | 'Unpaid';

    @IsInt()
    booking_id: number;

    @IsInt()
    hotel_id: number;
}
