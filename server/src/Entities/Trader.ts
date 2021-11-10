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
}
