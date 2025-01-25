import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateIconsToCamelCase1737796558956 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          UPDATE real_estate_category
          SET icon = CASE 
            WHEN icon = 'fa-hotel' THEN 'faHotel'
            WHEN icon = 'fa-building' THEN 'faBuilding'
            WHEN icon = 'fa-home' THEN 'faHome'
            WHEN icon = 'fa-bed' THEN 'faBed'
            ELSE icon
          END;
        `);

        await queryRunner.query(`
          UPDATE real_estate_subcategory
          SET icon = CASE 
            WHEN icon = 'fa-hotel' THEN 'faHotel'
            WHEN icon = 'fa-concierge-bell' THEN 'faConciergeBell'
            WHEN icon = 'fa-house-user' THEN 'faHouseUser'
            WHEN icon = 'fa-city' THEN 'faCity'
            WHEN icon = 'fa-bed' THEN 'faBed'
            WHEN icon = 'fa-money-bill' THEN 'faMoneyBill'
            WHEN icon = 'fa-cube' THEN 'faCube'
            WHEN icon = 'fa-tree' THEN 'faTree'
            WHEN icon = 'fa-hands-helping' THEN 'faHandsHelping'
            WHEN icon = 'fa-heart' THEN 'faHeart'
            WHEN icon = 'fa-campground' THEN 'faCampground'
            WHEN icon = 'fa-shopping-bag' THEN 'faShoppingBag'
            WHEN icon = 'fa-leaf' THEN 'faLeaf'
            WHEN icon = 'fa-recycle' THEN 'faRecycle'
            WHEN icon = 'fa-door-open' THEN 'faDoorOpen'
            WHEN icon = 'fa-vihara' THEN 'faVihara'
            WHEN icon = 'fa-water' THEN 'faWater'
            WHEN icon = 'fa-tractor' THEN 'faTractor'
            WHEN icon = 'fa-mountain' THEN 'faMountain'
            WHEN icon = 'fa-umbrella-beach' THEN 'faUmbrellaBeach'
            WHEN icon = 'fa-caravan' THEN 'faCaravan'
            WHEN icon = 'fa-chess-rook' THEN 'faChessRook'
            WHEN icon = 'fa-anchor' THEN 'faAnchor'
            ELSE icon
          END;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          UPDATE real_estate_category
          SET icon = CASE 
            WHEN icon = 'faHotel' THEN 'fa-hotel'
            WHEN icon = 'faBuilding' THEN 'fa-building'
            WHEN icon = 'faHome' THEN 'fa-home'
            WHEN icon = 'faBed' THEN 'fa-bed'
            ELSE icon
          END;
        `);

        await queryRunner.query(`
          UPDATE real_estate_subcategory
          SET icon = CASE 
            WHEN icon = 'faHotel' THEN 'fa-hotel'
            WHEN icon = 'faConciergeBell' THEN 'fa-concierge-bell'
            WHEN icon = 'faHouseUser' THEN 'fa-house-user'
            WHEN icon = 'faCity' THEN 'fa-city'
            WHEN icon = 'faBed' THEN 'fa-bed'
            WHEN icon = 'faMoneyBill' THEN 'fa-money-bill'
            WHEN icon = 'faCube' THEN 'fa-cube'
            WHEN icon = 'faTree' THEN 'fa-tree'
            WHEN icon = 'faHandsHelping' THEN 'fa-hands-helping'
            WHEN icon = 'faHeart' THEN 'fa-heart'
            WHEN icon = 'faCampground' THEN 'fa-campground'
            WHEN icon = 'faShoppingBag' THEN 'fa-shopping-bag'
            WHEN icon = 'faLeaf' THEN 'fa-leaf'
            WHEN icon = 'faRecycle' THEN 'fa-recycle'
            WHEN icon = 'faDoorOpen' THEN 'fa-door-open'
            WHEN icon = 'faVihara' THEN 'fa-vihara'
            WHEN icon = 'faWater' THEN 'fa-water'
            WHEN icon = 'faTractor' THEN 'fa-tractor'
            WHEN icon = 'faMountain' THEN 'fa-mountain'
            WHEN icon = 'faUmbrellaBeach' THEN 'fa-umbrella-beach'
            WHEN icon = 'faCaravan' THEN 'fa-caravan'
            WHEN icon = 'faChessRook' THEN 'fa-chess-rook'
            WHEN icon = 'faAnchor' THEN 'fa-anchor'
            ELSE icon
          END;
        `);
    }
}
