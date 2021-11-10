import { Entity } from "typeorm";
import { User } from "./User";

@Entity()
export class Manager extends User {}
