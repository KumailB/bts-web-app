import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  commission_payment_type!: string;

  @Column({ nullable: false, type: "float", default: 0.0 })
  value!: number;

  @Column({ nullable: false, type: "timestamp" })
  date!: Date;

  @Column({ nullable: false, type: "float", default: 0.0 })
  commission_paid!: number;

  @Column({ nullable: false, default: "Pending" })
  status!: string;

  @Column({ nullable: false, type: "int" })
  trader_id!: number;

  @Column({ nullable: false, type: "int" })
  client_id!: number;

  @Column({ nullable: false })
  order_type!: string;

  @Column({ nullable: false, type: "float" })
  conv_rate!: number;
}
