export function isEmpty(array?: any[]) {
    return array === undefined || array.length === 0;
}

export function toString(array: any[] = []) {
    return `[${array.map((a) => a.toString()).join(', ')}]`;
}