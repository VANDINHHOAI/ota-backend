import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HotelEntity } from "./hotel.entity";
import { InvoiceEntity } from "./invoice.entity";

@Entity('expense')
export class ExpenseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    code: string;

    @Column({ nullable: false })
    amount: number;

    @Column({
        type: 'enum',
        enum: ['Cash', 'Credit_card', 'Bank_transfer'],
        default: 'Cash', // Giá trị mặc định là 'Cash'
    })
    payment_method: 'Cash' | 'Credit_card' | 'Bank_transfer';

    @Column({ type: "text", nullable: true })
    note: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: "varchar", nullable: false })
    customer_name: string;

    @Column({ type: "varchar", nullable: false })
    created_by: string;

    @ManyToOne(() => HotelEntity, hotel => hotel.id)
    @JoinColumn({ name: 'hotel_id' })
    hotel: HotelEntity;

    @Column()
    hotel_id: number;

    // Trường category giúp xác định loại hóa đơn
    @Column({
        type: 'enum',
        enum: ['Room_Payment', 'Service', 'Other'], // Các loại hóa đơn
        default: 'Other', // Giá trị mặc định là 'Other'
    })
    category: 'Room_Payment' | 'Service' | 'Other';

    @ManyToOne(() => InvoiceEntity, invoice => invoice.id)
    @JoinColumn({ name: 'invoice_id' })
    invoice: InvoiceEntity;

    @Column({ nullable: true })
    invoice_id: number;
}