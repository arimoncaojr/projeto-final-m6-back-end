import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Image } from "./image.entity";

@Entity("image_post")
export class ImagePost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, (post) => post.imagePost, {
    onDelete: "CASCADE",
  })
  post: Post;

  @ManyToOne(() => Image, (image) => image.imagePost, { onDelete: "CASCADE" })
  image: Image;
}
