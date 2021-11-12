import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Client extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  phone_num!: string;

  @Column()
  cell_phone_num!: string;

  @Column({ nullable: false, type: "float", default: 0.0 })
  usd!: number;

  @Column({ nullable: false, type: "float", default: 0.0 })
  bitcoin!: number;

  @Column()
  level!: number;

  @Column({ type: "date", default: "0000-00-00" })
  last_update!: string;

  @Column()
  trader_id!: number;
}
