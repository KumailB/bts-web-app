import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Trader extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;
}
