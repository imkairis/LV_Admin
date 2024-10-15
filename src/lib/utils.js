import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getValueFromSearchParams = (searchPrams, values) => {
    let result = {};
    values.forEach((value) => {
        if (searchPrams.has(value)) {
            result[value] = searchPrams.get(value);
        } else {
            result[value] = null;
        }
    });
    return result;
};
