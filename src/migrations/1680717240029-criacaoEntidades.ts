import { MigrationInterface, QueryRunner } from "typeorm";

export class criacaoEntidades1680717240029 implements MigrationInterface {
    name = 'criacaoEntidades1680717240029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(100) NOT NULL, "street" character varying(200) NOT NULL, "number" character varying(5), "complement" character varying(200), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageLink" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postId" uuid, "imageId" uuid, CONSTRAINT "PK_595c60d3e7e8edf1cc0912782bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mark" character varying(100) NOT NULL, "model" character varying(100) NOT NULL, "year" character varying(4) NOT NULL, "color" character varying(100) NOT NULL, "fuelType" character varying(50) NOT NULL, "kilometers" character varying(200) NOT NULL, "imageCap" character varying(200) NOT NULL, "price" character varying(100) NOT NULL, "tablePriceFiper" character varying(100) NOT NULL, "description" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_typeofaccount_enum" AS ENUM('comprador', 'anunciante')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "cpf" character varying(11) NOT NULL, "phoneNumber" character varying(11) NOT NULL, "password" character varying(150) NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "description" character varying(200), "typeOfAccount" "public"."users_typeofaccount_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image_post" ADD CONSTRAINT "FK_f281885fcb084a21c32402a70aa" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "image_post" ADD CONSTRAINT "FK_79b856ca3d79c9feda5eb03c163" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "image_post" DROP CONSTRAINT "FK_79b856ca3d79c9feda5eb03c163"`);
        await queryRunner.query(`ALTER TABLE "image_post" DROP CONSTRAINT "FK_f281885fcb084a21c32402a70aa"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_typeofaccount_enum"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "image_post"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
