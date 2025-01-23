import { ApiProperty } from '@nestjs/swagger';

export class LanguageAmenitiesDto {
    @ApiProperty({
        description: 'The title of the category in the specified language',
        example: 'Бассейн и пляж',
    })
    title: string;

    @ApiProperty({
        description: 'List of amenities in the specified language',
        example: [
            'Рядом с пляжем',
            'Крытый бассейн',
            // ... другие примеры
        ],
    })
    amenities: string[];
}

export class TAmenityViewResDto {
    @ApiProperty({
        description: 'Amenities in Russian',
        type: LanguageAmenitiesDto,
    })
    ru: LanguageAmenitiesDto;

    @ApiProperty({
        description: 'Amenities in English',
        type: LanguageAmenitiesDto,
    })
    en: LanguageAmenitiesDto;
}
