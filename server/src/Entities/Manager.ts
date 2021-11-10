import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Manager extends BaseEntity {
  @PrimaryColumn()
  id!: number
}
