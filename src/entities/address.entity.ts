import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 200 })
  street: string;

  @Column({ length: 5, nullable: true })
  number: string;

  @Column({ length: 200, nullable: true })
  complement: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
