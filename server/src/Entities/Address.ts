import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address extends BaseEntity {

    @PrimaryColumn()
    client_id!: number;

    @Column()
    street_address!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    zip!: string;
}