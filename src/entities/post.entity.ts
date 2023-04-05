import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ImagePost } from "./imagePost.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  mark: string;

  @Column({ length: 100 })
  model: string;

  @Column({ length: 4 })
  year: string;

  @Column({ length: 100 })
  color: string;

  @Column({ length: 50 })
  fuelType: string;

  @Column({ length: 200 })
  kilometers: string;

  @Column({ length: 200 })
  imageCap: string;

  @Column({ length: 100 })
  price: string;

  @Column({ length: 100 })
  tablePriceFiper: string;

  @Column({ length: 200 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => ImagePost, (imagePost) => imagePost.post)
  imagePost: ImagePost[];
}
