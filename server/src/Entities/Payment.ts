import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, type: "float", default: 0.0 })
  value!: number;

  @Column({ nullable: false, type: "timestamp" })
  date!: Date;

  @Column({ nullable: false, default: "Pending" })
  status!: string;

  @Column({ nullable: false, type: "int" })
  trader_id!: number;

  @Column({ nullable: false, type: "int" })
  client_id!: number;
}
