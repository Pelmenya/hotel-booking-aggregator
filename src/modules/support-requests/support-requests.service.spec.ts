import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestsService } from './support-requests.service';

describe('SupportRequestsService', () => {
    let service: SupportRequestsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SupportRequestsService],
        }).compile();

        service = module.get<SupportRequestsService>(SupportRequestsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
