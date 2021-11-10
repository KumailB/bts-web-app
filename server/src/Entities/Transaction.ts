import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  commission_payment_type!: string;

  @Column({ nullable: false, type: "float", default: 0.0 })
  value!: number;

  @Column({ type: "date" })
  date!: string;

  @Column({ nullable: false, type: "float", default: 0.0 })
  commission_paid!: number;

  @Column()
  status!: string;

  @Column()
  trader_id!: number;

  @Column()
  client_id!: number;
}
