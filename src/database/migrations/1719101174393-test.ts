import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1719101174393 implements MigrationInterface {
    name = 'Test1719101174393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deadline" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "deadline" SET NOT NULL`);
    }

}
