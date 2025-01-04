import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigration1735995587338 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE example (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE example`);
    }
}
