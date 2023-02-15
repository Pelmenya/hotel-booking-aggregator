import { Document } from 'mongoose';
import { Message } from '../schemas/message';

export type TMessageDocument = Message & Document;
