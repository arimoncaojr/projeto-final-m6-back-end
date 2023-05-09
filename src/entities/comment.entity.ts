import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 500 })
  description: string;

  @Column({ length: 200 })
  userComment: string;

  @Column({ length: 200 })
  userCommentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  post: Post;
}
