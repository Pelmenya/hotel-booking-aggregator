export const ERRORS_USER = {
    NOT_FOUND: 'Пользователь с таким email или паролем не найден',
    BAD_REQUEST: 'Неправильный email или пароль',
    BAD_PASSWORD: 'Неправильный старый пароль',
    ALREADY_EXISTS: 'Пользователь c таким email уже зарегистрирован',
    UNAUTHORIZED: 'Пользователь не авторизирован',
    NOT_EXIST_USER_SETTINGS: 'Настроек пользователя не существует',
};

export const selectUserParam = {
    _id: 0,
    id: '$_id',
    name: 1,
    email: 1,
    emailIsConfirm: 1,
    role: 1,
    avatars: 1,
    contactPhone: 1,
    phoneIsConfirm: 1,
    birthday: 1,
    address: 1,
    gender: 1,
    company: 1,
};
