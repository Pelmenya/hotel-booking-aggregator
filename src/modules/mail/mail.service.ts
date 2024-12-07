import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmationEmail(
        user: { email: string; name: string },
        code: MongooseSchema.Types.UUID,
    ) {
        await this.mailerService.sendMail({
            to: user.email,
            from: '"На-День.рф" <on-day.rf@yandex.ru>', // override default from
            subject: 'Добро пожаловать на На-День.рф! Подтвердите Ваш Email',
            template: './confirm-email',
            // either change to ./transactional or rename transactional.html to confirmation.html
            context: {
                name: user.name,
                code,
            },
        });
    }
}
