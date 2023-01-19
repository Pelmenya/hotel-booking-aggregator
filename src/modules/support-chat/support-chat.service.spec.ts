import { Test, TestingModule } from '@nestjs/testing';
import { SupportChatService } from './support-chat.service';

describe('SupportChatService', () => {
    let service: SupportChatService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SupportChatService],
        }).compile();

        service = module.get<SupportChatService>(SupportChatService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
