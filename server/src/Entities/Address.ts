import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Address extends BaseEntity {
  @PrimaryColumn({ nullable: false })
  client_id!: number;

  @Column({ nullable: false })
  street_address!: string;

  @Column({ nullable: false })
  city!: string;

  @Column({ nullable: false })
  state!: string;

  @Column({ nullable: false })
  zip_code!: string;
}
