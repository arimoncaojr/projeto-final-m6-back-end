import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Post } from "./entities/post.entity";
import { Image } from "./entities/image.entity";
import { Comment } from "./entities/comment.entity";
import { CreateEntities1681240167913 } from "./migrations/1681240167913-createEntities";
import { AlterTable1681315760952 } from "./migrations/1681315760952-alterTable";
import { AlterTableUser1682429451128 } from "./migrations/1682429451128-AlterTableUser"

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [User, Address, Post, Image, Comment],
        migrations: [CreateEntities1681240167913, AlterTable1681315760952, AlterTableUser1682429451128],
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
        migrations: [CreateEntities1681240167913, AlterTable1681315760952, AlterTableUser1682429451128],
      }
);

export default AppDataSource;
