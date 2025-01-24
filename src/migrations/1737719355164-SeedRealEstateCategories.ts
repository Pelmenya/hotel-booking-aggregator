import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRealEstateCategories1737719355164
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        // одним запросом не сработает из-за асинхронности
        await queryRunner.query(`
          INSERT INTO real_estate_category (name, icon, language) VALUES
          ('Гостиницы и отели', 'fa-hotel', 'ru'),
          ('Hotels and Inns', 'fa-hotel', 'en'),
          ('Квартиры', 'fa-building', 'ru'),
          ('Apartments', 'fa-building', 'en'),
          ('Дома', 'fa-home', 'ru'),
          ('Houses', 'fa-home', 'en'),
          ('Комнаты', 'fa-bed', 'ru'),
          ('Rooms', 'fa-bed', 'en');
    
        `);

        await queryRunner.query(`
   
          INSERT INTO real_estate_subcategory (name, icon, language, category_id) VALUES
          -- Гостиницы и отели
          ('Отель', 'fa-hotel', 'ru', 1),
          ('Hotel', 'fa-hotel', 'en', 2),
          ('Мини-гостиница', 'fa-concierge-bell', 'ru', 1),
          ('Mini-hotel', 'fa-concierge-bell', 'en', 2),
          -- Добавьте остальные подкатегории с переводами
          ('Гостевой дом', 'fa-house-user', 'ru', 1),
          ('Guest House', 'fa-house-user', 'en', 2),
          ('Апарт-отель', 'fa-city', 'ru', 1),
          ('Aparthotel', 'fa-city', 'en', 2),
          ('Хостел', 'fa-bed', 'ru', 1),
          ('Hostel', 'fa-bed', 'en', 2),
          ('Отель эконом-класса', 'fa-money-bill', 'ru', 1),
          ('Economy Hotel', 'fa-money-bill', 'en', 2),
          ('Капсульный отель', 'fa-cube', 'ru', 1),
          ('Capsule Hotel', 'fa-cube', 'en', 2),
          ('База отдыха', 'fa-tree', 'ru', 1),
          ('Holiday Base', 'fa-tree', 'en', 2),
          ('Пансионат', 'fa-hands-helping', 'ru', 1),
          ('Boarding House', 'fa-hands-helping', 'en', 2),
          ('Санаторий', 'fa-heart', 'ru', 1),
          ('Sanatorium', 'fa-heart', 'en', 2),
          ('Апартамент', 'fa-building', 'ru', 1),
          ('Apartment', 'fa-building', 'en', 2),
          ('Глэмпинг', 'fa-campground', 'ru', 1),
          ('Glamping', 'fa-campground', 'en', 2),
          ('Гостиница', 'fa-hotel', 'ru', 1),
          ('Hotel', 'fa-hotel', 'en', 2),
          ('Бутик-отель', 'fa-shopping-bag', 'ru', 1),
          ('Boutique Hotel', 'fa-shopping-bag', 'en', 2),
          ('Парк-отель', 'fa-leaf', 'ru', 1),
          ('Park Hotel', 'fa-leaf', 'en', 2),
          ('Эко-отель', 'fa-recycle', 'ru', 1),
          ('Eco Hotel', 'fa-recycle', 'en', 2),
    
          -- Квартиры
          ('Квартира', 'fa-building', 'ru', 3),
          ('Apartment', 'fa-building', 'en', 4),
          ('Апартамент', 'fa-city', 'ru', 3),
          ('Flat', 'fa-city', 'en', 4),
          ('Студия', 'fa-door-open', 'ru', 3),
          ('Studio', 'fa-door-open', 'en', 4),
    
          -- Дома
          ('Коттедж', 'fa-home', 'ru', 5),
          ('Cottage', 'fa-home', 'en', 6),
          ('Дом', 'fa-house-user', 'ru', 5),
          ('House', 'fa-house-user', 'en', 6),
          ('Вилла', 'fa-vihara', 'ru', 5),
          ('Villa', 'fa-vihara', 'en', 6),
          ('Часть дома с отдельным входом', 'fa-door-open', 'ru', 5),
          ('Part of the House with Separate Entrance', 'fa-door-open', 'en', 6),
          ('Эллинг', 'fa-water', 'ru', 5),
          ('Boathouse', 'fa-water', 'en', 6),
          ('Деревенский дом', 'fa-tractor', 'ru', 5),
          ('Country House', 'fa-tractor', 'en', 6),
          ('Таунхаус', 'fa-city', 'ru', 5),
          ('Townhouse', 'fa-city', 'en', 6),
          ('Целый этаж в доме', 'fa-building', 'ru', 5),
          ('Entire Floor in House', 'fa-building', 'en', 6),
          ('Гестхаус', 'fa-house-user', 'ru', 5),
          ('Guesthouse', 'fa-house-user', 'en', 6),
          ('Шале', 'fa-mountain', 'ru', 5),
          ('Chalet', 'fa-mountain', 'en', 6),
          ('Бунгало', 'fa-umbrella-beach', 'ru', 5),
          ('Bungalow', 'fa-umbrella-beach', 'en', 6),
          ('Дом на колёсах', 'fa-caravan', 'ru', 5),
          ('Caravan', 'fa-caravan', 'en', 6),
          ('Особняк', 'fa-chess-rook', 'ru', 5),
          ('Mansion', 'fa-chess-rook', 'en', 6),
          ('Яхта', 'fa-anchor', 'ru', 5),
          ('Yacht', 'fa-anchor', 'en', 6),
          ('Дача', 'fa-tree', 'ru', 5),
          ('Dacha', 'fa-tree', 'en', 6),
    
          -- Комнаты
          ('Комната в квартире', 'fa-bed', 'ru', 7),
          ('Room in Apartment', 'fa-bed', 'en', 8),
          ('Комната в частном доме', 'fa-home', 'ru', 7),
          ('Room in Private House', 'fa-home', 'en', 8),
          ('Комната в коттедже', 'fa-home', 'ru', 7),
          ('Room in Cottage', 'fa-home', 'en', 8);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DELETE FROM real_estate_subcategory;
          DELETE FROM real_estate_category;
          ALTER SEQUENCE real_estate_category_id_seq RESTART WITH 1;
          ALTER SEQUENCE real_estate_subcategory_id_seq RESTART WITH 1;
        `);
    }
}
