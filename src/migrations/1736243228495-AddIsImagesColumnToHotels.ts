import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsImagesColumnToHotels1736243228495
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        /* или сама добавится через ORM
        await queryRunner.query(`
            ALTER TABLE hotels
            ADD COLUMN is_images BOOLEAN DEFAULT false;
        `);
        */
        await queryRunner.query(`
            UPDATE hotels
            SET is_images = EXISTS (
                SELECT 1
                FROM images
                WHERE images.hotel_id = hotels.id
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE hotels
            DROP COLUMN is_images;
        `);
    }
}
