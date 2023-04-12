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
import { Image } from "./image.entity";
import { Comment } from "./comment.entity";

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

  @Column()
  isGoodPurchase: boolean;

  @Column({ default: true })
  isActive: boolean;

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

  @OneToMany(() => Image, (images) => images.post)
  images: Image[];

  @OneToMany(() => Comment, (comments) => comments.post)
  comments: Comment[];
}
