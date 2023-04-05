import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Post } from "./entities/post.entity";
import { Image } from "./entities/image.entity";
import { ImagePost } from "./entities/imagePost.entity";
import { criacaoEntidades1680717240029 } from "./migrations/1680717240029-criacaoEntidades";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [User, Address, Post, Image, ImagePost],
        migrations: [criacaoEntidades1680717240029],
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
        entities: [User, Address, Post, Image, ImagePost],
        migrations: [criacaoEntidades1680717240029],
      }
);

export default AppDataSource;
