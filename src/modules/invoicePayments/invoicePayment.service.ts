import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateInvoicePaymentDto } from "./dto/createInvoicePayment.dto";
import { UpdateInvoicePaymentDto } from "./dto/updateInvoicePayment.dto";
import { InvoicePaymentEntity } from "src/entities/invoicePayments.entity";
import { InvoicePayment } from "src/models/invoicePayment.model";
import { InvoiceService } from "../invoice/invoice.service";

@Injectable()
export class InvoicePaymentService {
    constructor(
        @InjectRepository(InvoicePaymentEntity)
        private readonly invoicePaymentRepository: Repository<InvoicePaymentEntity>,

        private readonly invoiceService: InvoiceService,
    ) { }

    async getInvoicePayments(): Promise<InvoicePayment[]> {
        const invoicePayments = await this.invoicePaymentRepository.find();
        return invoicePayments.map(invoicePayment => new InvoicePayment(invoicePayment.id, invoicePayment.payment_date, invoicePayment.amount, invoicePayment.payment_method, invoicePayment.note, invoicePayment.invoice_id));
    }

    async findOneInvoicePayment(id: number): Promise<InvoicePayment> {
        const invoicePayment = await this.invoicePaymentRepository.findOne({ where: { id } });
        return new InvoicePayment(invoicePayment.id, invoicePayment.payment_date, invoicePayment.amount, invoicePayment.payment_method, invoicePayment.note, invoicePayment.invoice_id);
    }

    async createInvoicePayment(createInvoicePaymentDto: CreateInvoicePaymentDto): Promise<InvoicePayment> {
        const invoicePayment = new InvoicePayment();
        invoicePayment.amount = createInvoicePaymentDto.amount;
        invoicePayment.payment_method = createInvoicePaymentDto.payment_method;
        invoicePayment.note = createInvoicePaymentDto.note;
        invoicePayment.invoice_id = createInvoicePaymentDto.invoice_id;

        await this.invoicePaymentRepository.save(invoicePayment);
        return new InvoicePayment(invoicePayment.id, invoicePayment.payment_date, invoicePayment.amount, invoicePayment.payment_method, invoicePayment.note, invoicePayment.invoice_id);
    }

    async updateInvoicePayment(updateInvoicePaymentDto: UpdateInvoicePaymentDto): Promise<InvoicePayment> {
        const { id, ...updateInvoicePaymentData } = updateInvoicePaymentDto;

        await this.invoicePaymentRepository.update(id, updateInvoicePaymentData);

        const invoicePayment = await this.invoicePaymentRepository.findOne({ where: { id } })
        return new InvoicePayment(invoicePayment.id, invoicePayment.payment_date, invoicePayment.amount, invoicePayment.payment_method, invoicePayment.note, invoicePayment.invoice_id);
    }

    async deleteInvoicePayment(id: number): Promise<string> {
        await this.invoicePaymentRepository.delete(id);
        return `Delete invoicePayment ${id} success`;
    }

    async getAllInvoicePaymentByInvoiceId(invoice_id: number): Promise<any> {
        const invoice = await this.invoiceService.getInvoiceById(invoice_id);
    
        const invoicePayments = await this.invoicePaymentRepository.find({
          where: { invoice_id },
        });
    
        return {
          invoice,
          payments: invoicePayments.map((payment) => ({
            id: payment.id,
            payment_date: payment.payment_date,
            amount: payment.amount,
            payment_method: payment.payment_method,
            note: payment.note,
          })),
        };
      }
}