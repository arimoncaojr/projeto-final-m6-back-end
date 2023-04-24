import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Post } from "./entities/post.entity";
import { Image } from "./entities/image.entity";
import { Comment } from "./entities/comment.entity";
import { createEntities1681307165440 } from "./migrations/1681307165440-createEntities";
import { fixColumns1681334191156 } from "./migrations/1681334191156-fixColumns";
import { addNewFieldUser1682347662677 } from "./migrations/1682347662677-addNewFieldUser";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "production"
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [User, Address, Post, Image, Comment],
        migrations: [
          createEntities1681307165440,
          fixColumns1681334191156,
          addNewFieldUser1682347662677,
        ],
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
        migrations: [
          createEntities1681307165440,
          fixColumns1681334191156,
          addNewFieldUser1682347662677,
        ],
      }
);

export default AppDataSource;
