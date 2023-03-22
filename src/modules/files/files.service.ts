import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile, remove } from 'fs-extra';
import * as sharp from 'sharp';
import { ID } from 'src/types/id';
import { MFile } from './mfile.class';

@Injectable()
export class FilesService {
    async saveFiles(id: ID, files: Express.Multer.File[]): Promise<string[]> {
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

        const uploadFolder = `${path}/api/uploads/${id}`;
        await ensureDir(uploadFolder);
        const res: string[] = [];
        for (const file of saveArray) {
            await writeFile(
                `${uploadFolder}/${file.originalname}`,
                file.buffer,
            );
            res.push(`/api/uploads/${id}/${file.originalname}`);
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

    async updateFiles(
        item: { _id: ID; images?: string[] },
        files: Express.Multer.File[],
        dto: { images?: string[] },
    ): Promise<string[]> {
        const { images: imagesDB = [] } = item;
        const { images: imagesBody = [] } = dto;
        const imagesUpload = await this.saveFiles(item._id, files);
        let imagesSave: string[] = [];
        if (Array.isArray(imagesBody)) {
            imagesSave = [
                ...imagesUpload,
                ...imagesBody.filter((image) => imagesDB.includes(image)),
            ];
        } else {
            imagesSave = [...imagesUpload];
            if (imagesDB.includes(imagesBody)) {
                imagesSave.push(imagesBody);
            }
        }
        const imagesRemove = imagesDB.filter(
            (image) => !imagesSave.includes(image),
        );
        await this.removeFiles(imagesRemove);

        return imagesSave;
    }

    convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }
}
