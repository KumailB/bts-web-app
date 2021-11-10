import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Client extends User {
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
  address_id!: number;
}
