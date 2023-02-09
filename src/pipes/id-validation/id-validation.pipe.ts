import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { BAD_OBJECT_ID } from './id-validation.pipe.constatnts';

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: Types.ObjectId) {
        if (Types.ObjectId.isValid(value)) return value;
        throw new BadRequestException(BAD_OBJECT_ID);
    }
}
