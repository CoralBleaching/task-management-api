import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1719101029621 implements MigrationInterface {
    name = 'Test1719101029621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deadline" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deadline" SET DEFAULT now()`);
    }

}
