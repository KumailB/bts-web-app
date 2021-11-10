import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Level extends BaseEntity {
  @PrimaryGeneratedColumn()
  classification!: number;

  @Column({ nullable: false, type: "float" })
  commission_rate!: number;
}
