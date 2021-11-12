import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Client extends BaseEntity {
  @PrimaryColumn({ nullable: false, type: "int" })
  id!: number;

  @Column({ nullable: false })
  phone_num!: string;

  @Column({ nullable: false })
  cell_phone_num!: string;

  @Column({ nullable: false, type: "float", default: 0.0 })
  usd!: number;

  @Column({ nullable: false, type: "float", default: 0.0 })
  bitcoin!: number;

  @Column({ nullable: false, type: "int", default: 0 })
  level!: number;

  @Column({ type: "date", default: "0000-00-00" })
  last_update!: string;

  @Column({ nullable: false, type: "int" })
  trader_id!: number;
}
