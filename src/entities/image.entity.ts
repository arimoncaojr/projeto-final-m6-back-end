import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  imageLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.images, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  post: Post;
}
