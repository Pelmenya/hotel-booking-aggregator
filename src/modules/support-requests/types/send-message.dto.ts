import { ID } from 'src/types/id';

export class SendMessageDto {
    author: ID;
    supportRequest: ID;
    text: string;
}
