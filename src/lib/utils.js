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

export const formatDate = (date, locales = 'vi-VN', opt = {}) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString(locales, opt);
};

export const detectNearExpiredProducts = (date, delta) => {
    const current = new Date();
    const expirationDate = new Date(date);
    const diffTime = expirationDate - current;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
        nearExpired: diffDays <= delta && diffDays >= 0,
        daysLeft: diffDays,
        hadExpired: diffDays < 0,
    };
};
