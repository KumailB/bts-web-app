import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Trader extends BaseEntity {
  @PrimaryColumn({ nullable: false, type: "int" })
  id!: number;

}
