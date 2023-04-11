import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Post } from "./entities/post.entity";
import { Image } from "./entities/image.entity";
import { Comment } from "./entities/comment.entity";
<<<<<<< HEAD
import { Inicial1681225224047 } from "./migrations/1681225224047-inicial";
=======
import { createEntites1681223413654 } from "./migrations/1681223413654-createEntites";
>>>>>>> 091a66fb9077a39e0469a29550053415a68fbe6f

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [User, Address, Post, Image, Comment],
<<<<<<< HEAD
        migrations: [Inicial1681225224047],
=======
        migrations: [createEntites1681223413654],
>>>>>>> 091a66fb9077a39e0469a29550053415a68fbe6f
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
<<<<<<< HEAD
        migrations: [Inicial1681225224047],
=======
        migrations: [createEntites1681223413654],
>>>>>>> 091a66fb9077a39e0469a29550053415a68fbe6f
      }
);

export default AppDataSource;
