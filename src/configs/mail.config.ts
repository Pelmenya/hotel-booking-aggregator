import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { path } from 'app-root-path';

export const getMailConfig = async (config: ConfigService) => ({
    transport: {
        host: config.get('MAIL_HOST'),
        port: config.get('MAIL_PORT'),
        secure: true,
        auth: {
            user: config.get('MAIL_LOGIN'),
            pass: config.get('MAIL_PASSWORD'),
        },
    },
    defaults: {
        from: `"No Reply" <${config.get('MAIL_FROM_EMAIL')}>`, // важно для яндекса
    },
    template: {
        dir: `${path}/src/modules/mail/templates`,
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
});
