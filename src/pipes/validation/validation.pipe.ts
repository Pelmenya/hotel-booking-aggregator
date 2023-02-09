import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    Type,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types: Array<Type<any>> = [
            String,
            Boolean,
            Number,
            Array,
            Object,
        ];
        return !types.includes(metatype);
    }
}
