import { MigrationInterface, QueryRunner } from "typeorm";

export class fixColumns1681334191156 implements MigrationInterface {
    name = 'fixColumns1681334191156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "description" SET NOT NULL`);
    }

}
