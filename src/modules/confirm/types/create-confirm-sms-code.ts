import { IsNumber } from 'class-validator';

export class CreateConfirmSmsCodeDto {
    @IsNumber() code: number;
}
