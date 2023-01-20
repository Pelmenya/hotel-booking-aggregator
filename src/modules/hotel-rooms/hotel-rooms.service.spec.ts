import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoomsService } from './hotel-rooms.service';

describe('HotelRoomsService', () => {
    let service: HotelRoomsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HotelRoomsService],
        }).compile();

        service = module.get<HotelRoomsService>(HotelRoomsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
