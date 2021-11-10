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
  @Column()
  first_name!: string;

  @Column()
  last_name!: string;
}
