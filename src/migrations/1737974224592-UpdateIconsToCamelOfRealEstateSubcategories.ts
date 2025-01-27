import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIconsToCamelOfRealEstateSubcategories1737974224592
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          UPDATE real_estate_subcategory
          SET icon = CASE 
            WHEN icon = 'fa-home' THEN 'faHome'
            WHEN icon = 'fa-building' THEN 'faBuilding'
            ELSE icon
          END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          UPDATE real_estate_subcategory
          SET icon = CASE 
            WHEN icon = 'faHome' THEN 'fa-home'
            WHEN icon = 'faBuilding' THEN 'fa-building'
            ELSE icon
          END;
        `);
    }
}
