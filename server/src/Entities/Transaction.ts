import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  commission_payment_type!: string;

  @Column({ nullable: false, type: "float", default: 0.0 })
  value!: number;

  @Column({ type: "timestamp" })
  date!: Date;

  @Column({ nullable: false, type: "float", default: 0.0 })
  commission_paid!: number;

  @Column()
  status!: string;

  @Column()
  trader_id!: number;

  @Column()
  client_id!: number;

  @Column()
  order_type!: string;

  @Column({ nullable: false, type: "float" })
  conv_rate!: number;
}
