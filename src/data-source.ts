import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Post } from "./entities/post.entity";
import { Image } from "./entities/image.entity";
import { Comment } from "./entities/comment.entity";
import { createEntites1681223413654 } from "./migrations/1681223413654-createEntites";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [User, Address, Post, Image, Comment],
        migrations: [createEntites1681223413654],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.DB,
        logging: true,
        synchronize: false,
        entities: [User, Address, Post, Image, Comment],
        migrations: [createEntites1681223413654],
      }
);

export default AppDataSource;
