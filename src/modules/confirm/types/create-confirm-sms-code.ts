import { IsNumber } from 'class-validator';

export class CreateConfirmEmailCodeDto {
    @IsNumber() code: number;
}
