import { IsString, IsUUID } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateConfirmEmailCodeDto {
    @IsString() @IsUUID() code: MongooseSchema.Types.UUID;
}
