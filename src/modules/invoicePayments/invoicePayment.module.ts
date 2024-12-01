import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoicePaymentController } from "./invoicePayment.controller";
import { InvoicePaymentService } from "./invoicePayment.service";
import { InvoicePaymentEntity } from "src/entities/invoicePayments.entity";
import { InvoiceModule } from "../invoice/invoice.module";

@Module({
    imports: [TypeOrmModule.forFeature([InvoicePaymentEntity]), InvoiceModule],
    controllers: [InvoicePaymentController],
    providers: [InvoicePaymentService],
})
export class InvoicePaymentModule { }