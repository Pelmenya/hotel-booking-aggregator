import { Injectable } from '@nestjs/common';
import { AboutsRepository } from './abouts.repository';

@Injectable()
export class AboutsService {
    constructor(private readonly aboutsRepository: AboutsRepository) {}
}
