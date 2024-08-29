export const onceTimeSms = 120000;
export const onceTimeEmail = 120000;

export const ERRORS_CONFIRM = {
    NOT_UPDATE_CONFRIM: 'Не удалось подтвердить email',
    PHONE_ALREDY_CONFIRMED: 'Телефон уже подтвержден',
    EMAIL_ALREDY_CONFIRMED: 'Почта уже подтверждена',
    EMAIL_LIMIT: `Вы можете отправить одно подтверждение в ${
        onceTimeEmail / 60 / 1000
    } минуты`,
    SMS_LIMIT: `Вы можете отправить одно подтверждение в ${
        onceTimeSms / 60 / 1000
    } минуты`,
};
