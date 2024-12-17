export function generateConfirmationCode(length: number): number {
    const digits = '123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        code += digits[randomIndex];
    }
    return Number(code);
}
