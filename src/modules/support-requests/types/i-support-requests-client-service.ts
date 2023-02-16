import { CreateSupportRequestDto } from './create-support-request.dto';
import { ISupportRequestRes } from './i-support-request-res';

export interface ISupportRequestsClientService {
    createSupportRequest(
        dto: CreateSupportRequestDto,
    ): Promise<Partial<ISupportRequestRes>>;
}
