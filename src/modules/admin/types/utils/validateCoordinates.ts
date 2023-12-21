import { BadRequestException } from '@nestjs/common';

export const validateCoordinates = (coordinates?: number[]) => {
    if (coordinates) {
        if (
            /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(
                `${coordinates[0]},${coordinates[1]}`,
            ) === false
        ) {
            throw new BadRequestException(
                'Только действительные числа: -90..90,-180..180',
            );
        }
    }
};
