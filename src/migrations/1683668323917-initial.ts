import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1683668323917 implements MigrationInterface {
    name = 'Initial1683668323917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "userCommentId" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userCommentId"`);
    }

}
