import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile, remove } from 'fs-extra';
import * as sharp from 'sharp';
import { ID } from 'src/types/id';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
    async saveFiles(
        hotelRoomId: ID,
        files: Express.Multer.File[],
    ): Promise<string[]> {
        const saveArray: MFile[] = [];

        for (const file of files) {
            if (file.mimetype.includes('image')) {
                const buffer = await this.convertToWebP(file.buffer);
                saveArray.push(
                    new MFile({
                        originalname: `${file.originalname.split('.')[0]}.webp`,
                        buffer,
                    }),
                );
            } else saveArray.push(new MFile(file));
        }

        const uploadFolder = `${path}/api/uploads/${hotelRoomId}`;
        await ensureDir(uploadFolder);
        const res: string[] = [];
        for (const file of saveArray) {
            await writeFile(
                `${uploadFolder}/${file.originalname}`,
                file.buffer,
            );
            res.push(`/api/uploads/${hotelRoomId}/${file.originalname}`);
        }
        return res;
    }

    async removeFiles(imageUrls: string[]) {
        if (imageUrls.length) {
            imageUrls.forEach((url) => {
                remove(`${path}${url}`);
            });
        }
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }
}
