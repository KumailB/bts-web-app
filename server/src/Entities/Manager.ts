import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Manager extends BaseEntity {
  @PrimaryColumn({nullable: false})
  id!: number;
}
