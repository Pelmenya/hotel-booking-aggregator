import { IsNumberString, Matches } from 'class-validator';
import { countNumPhoneCode, ERRORS_CONFIRM } from '../confirm.constants';

export class CreateConfirmSmsCodeDto {
    @IsNumberString(
        { no_symbols: true },
        { message: ERRORS_CONFIRM.SMS_CODE_IS_DIGIT },
    )
    @Matches(new RegExp(`^\\d{${countNumPhoneCode}}$`), {
        message: ERRORS_CONFIRM.SMS_CODE_LENGTH,
    })
    code: string;
}
