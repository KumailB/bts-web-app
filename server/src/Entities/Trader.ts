import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Trader extends BaseEntity {
  @PrimaryColumn()
  id!: number;

}
