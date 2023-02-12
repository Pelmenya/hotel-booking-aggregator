import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
    async saveFiles(files: Express.Multer.File[]): Promise<string[]> {
        const saveArray: MFile[] = [];

        for (const file of files) {
            saveArray.push(new MFile(file));
            if (file.mimetype.includes('image')) {
                const buffer = await this.convertToWebP(file.buffer);
                saveArray.push(
                    new MFile({
                        originalname: `${file.originalname.split('.')[0]}.webp`,
                        buffer,
                    }),
                );
            }
        }

        const dateFolder = format(new Date(), 'yyyy-MM-dd');
        const uploadFolder = `${path}/api/uploads/${dateFolder}`;
        await ensureDir(uploadFolder);
        const res: string[] = [];
        for (const file of saveArray) {
            await writeFile(
                `${uploadFolder}/${file.originalname}`,
                file.buffer,
            );
            res.push(`/api/uploads/${dateFolder}/${file.originalname}`);
        }
        return res;
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }
}
