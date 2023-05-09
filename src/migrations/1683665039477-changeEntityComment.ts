import { MigrationInterface, QueryRunner } from "typeorm";

export class changeEntityComment1683665039477 implements MigrationInterface {
    name = 'changeEntityComment1683665039477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "userCommentId" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userCommentId"`);
    }

}
