export const ERRORS_USER = {
    NOT_FOUND: 'Пользователь с таким email или паролем не найден',
    BAD_REQUEST: 'Неправильный email или пароль',
    ALREADY_EXISTS: 'Пользователь c таким email уже зарегистрирован',
    UNAUTHORIZED: 'Пользователь не авторизирован',
};

export const populateUserParam = {
    path: 'user',
    select: {
        _id: 0,
        id: '$_id',
        name: 1,
        email: 1,
        role: 1,
        avatars: 1,
    },
};
