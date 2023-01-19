import { Test, TestingModule } from '@nestjs/testing';
import { SupportChatController } from './support-chat.controller';

describe('SupportChatController', () => {
    let controller: SupportChatController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SupportChatController],
        }).compile();

        controller = module.get<SupportChatController>(SupportChatController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
