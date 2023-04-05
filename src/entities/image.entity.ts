import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { ImagePost } from "./imagePost.entity";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  imageLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ImagePost, (imagePost) => imagePost.image)
  imagePost: ImagePost[];
}
