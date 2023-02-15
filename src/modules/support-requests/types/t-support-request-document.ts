import { Document } from 'mongoose';
import { SupportRequest } from '../schemas/support-request';

export type TSupportRequestDocument = SupportRequest & Document;
