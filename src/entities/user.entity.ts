import { hashSync, getRounds } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Address } from "./address.entity";
import { Post } from "./post.entity";

export enum AccountType {
  comprador = "comprador",
  anunciante = "anunciante",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 11 })
  phoneNumber: string;

  @Column({ length: 150 })
  password: string;

  @Column()
  dateOfBirth: Date;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column({ type: "enum", enum: AccountType })
  typeOfAccount: AccountType;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Address, (address) => address.user, {
    eager: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Post, (posts) => posts.user, {
    eager: true,
    onDelete: "CASCADE",
  })
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;
}
