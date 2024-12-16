export function filterSpaces(str: string): string {
    return str.split(' ').filter(item => item !== '').join(' ');
}