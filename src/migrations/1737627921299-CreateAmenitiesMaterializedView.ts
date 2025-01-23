import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAmenitiesMaterializedView1737627921299
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE MATERIALIZED VIEW amenities_mv AS
            WITH amenities_data AS (
              SELECT
                a_ru.title,
                td_ru_title.translated_text AS title_en,
                td_ru.original_text AS name_ru,
                td_ru.translated_text AS name_en
              FROM (
                SELECT
                  jsonb_array_elements(a.amenities_list) ->> 'name' AS name,
                  a.title
                FROM
                  amenities a
                WHERE
                  a.language = 'ru' AND a.type = 'additional'
              ) a_ru
              LEFT JOIN translation_dictionary td_ru_title ON a_ru.title = td_ru_title.original_text
              LEFT JOIN translation_dictionary td_ru ON a_ru.name = td_ru.original_text
            )
            SELECT
              title,
              title_en,
              array_agg(name_ru) AS unique_names_ru,
              array_agg(name_en) AS unique_names_en
            FROM (
              SELECT DISTINCT ON (name_ru, name_en)
                title,
                title_en,
                name_ru,
                name_en
              FROM
                amenities_data
              ORDER BY name_ru, name_en
            ) AS unique_data
            GROUP BY title, title_en;
        `);

        // Optionally create an index to speed up queries on the materialized view
        await queryRunner.query(`
            CREATE INDEX idx_amenities_mv_title ON amenities_mv(title);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP MATERIALIZED VIEW IF EXISTS amenities_mv;`,
        );
    }
}
