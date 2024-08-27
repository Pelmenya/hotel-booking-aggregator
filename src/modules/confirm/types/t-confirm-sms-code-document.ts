import { Document } from 'mongoose';
import { ConfirmSmsCode } from '../schemas/confirm-sms-code';

export type TConfirmSmsCodeDocument = ConfirmSmsCode & Document;
