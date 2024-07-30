import { Document } from 'mongoose';
import { ConfirmEmailCode } from '../schemas/confirm-email-code';

export type TConfirmEmailCodeDocument = ConfirmEmailCode & Document;
