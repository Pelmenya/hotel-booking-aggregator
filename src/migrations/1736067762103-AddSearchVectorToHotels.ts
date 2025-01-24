import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSearchVectorToHotels1736067762103
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        /*         // Добавляем колонку search_vector для hotels или сама добавится через ORM
        await queryRunner.query(`
            ALTER TABLE hotels ADD COLUMN search_vector tsvector;
        `);

        // Добавляем колонку search_vector для locations
        await queryRunner.query(`
            ALTER TABLE locations ADD COLUMN search_vector tsvector;
        `); */

        // Инициализируем данные в search_vector для hotels
        await queryRunner.query(`
            UPDATE hotels
            SET search_vector = 
                setweight(to_tsvector('russian', coalesce(name, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(address, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(name_en, '') || ' ' || coalesce(address, '')), 'B');
        `);

        // Инициализируем данные в search_vector для locations
        await queryRunner.query(`
            UPDATE locations
            SET search_vector = 
                setweight(to_tsvector('russian', coalesce(address, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(address, '')), 'B');
        `);

        // Создаём GIN-индексы
        await queryRunner.query(`
            CREATE INDEX hotels_search_vector_idx ON hotels USING GIN (search_vector);
        `);
        await queryRunner.query(`
            CREATE INDEX locations_search_vector_idx ON locations USING GIN (search_vector);
        `);

        // Создаём функции для обновления search_vector
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_hotel_search_vector()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.search_vector = 
                    setweight(to_tsvector('russian', coalesce(NEW.name, '') || ' ' || coalesce(NEW.name_en, '') || ' ' || coalesce(NEW.address, '')), 'A') ||
                    setweight(to_tsvector('english', coalesce(NEW.name, '') || ' ' || coalesce(NEW.name_en, '') || ' ' || coalesce(NEW.address, '')), 'B');
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_location_search_vector()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.search_vector = 
                    setweight(to_tsvector('russian', coalesce(NEW.address, '')), 'A') ||
                    setweight(to_tsvector('english', coalesce(NEW.address, '')), 'B');
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        // Создаём триггеры для обновления search_vector
        await queryRunner.query(`
            CREATE TRIGGER update_hotel_search_vector_trigger
            BEFORE INSERT OR UPDATE ON hotels
            FOR EACH ROW
            EXECUTE FUNCTION update_hotel_search_vector();
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_location_search_vector_trigger
            BEFORE INSERT OR UPDATE ON locations
            FOR EACH ROW
            EXECUTE FUNCTION update_location_search_vector();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Удаляем триггеры, функции, индексы и колонки
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS update_hotel_search_vector_trigger ON hotels;`,
        );
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS update_location_search_vector_trigger ON locations;`,
        );
        await queryRunner.query(
            `DROP FUNCTION IF EXISTS update_hotel_search_vector;`,
        );
        await queryRunner.query(
            `DROP FUNCTION IF EXISTS update_location_search_vector;`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS hotels_search_vector_idx;`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS locations_search_vector_idx;`,
        );
        await queryRunner.query(
            `ALTER TABLE hotels DROP COLUMN search_vector;`,
        );
        await queryRunner.query(
            `ALTER TABLE locations DROP COLUMN search_vector;`,
        );
    }
}
