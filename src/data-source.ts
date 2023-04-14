import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Post } from "./entities/post.entity";
import { Image } from "./entities/image.entity";
import { Comment } from "./entities/comment.entity";
<<<<<<< HEAD
=======
import { createEntities1681307165440 } from "./migrations/1681307165440-createEntities";
import { fixColumns1681334191156 } from "./migrations/1681334191156-fixColumns";
>>>>>>> b569838d388d69dbed03e5329128a2a09a8f1cd2

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [User, Address, Post, Image, Comment],
<<<<<<< HEAD
        migrations: [],
=======
        migrations: [createEntities1681307165440, fixColumns1681334191156],
>>>>>>> b569838d388d69dbed03e5329128a2a09a8f1cd2
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
        migrations: [],
=======
        migrations: [createEntities1681307165440, fixColumns1681334191156],
>>>>>>> b569838d388d69dbed03e5329128a2a09a8f1cd2
      }
);

export default AppDataSource;
