import axios from 'axios';

export function keysToArray(o) {
    if (!o) {
        return [];
    }

    return Object.keys(o);
}

export function getSafe(fn) {
    try {
        return fn();
    } catch (e) {
        return undefined;
    }
}

export function getLocalStorage(key) {
    return getSafe(() => JSON.parse(window.localStorage.getItem(key)));
}

export function setLocalStorage(key, value) {
    const string = JSON.stringify(value);
    window.localStorage.setItem(key, string);
}

export const axiosInstance = axios.create({
    baseURL: 'https://api.esv.org/v3/passage/text/',
    headers: {
        Authorization: 'Token cd6c85f89ca6fb3075cc9e79e953b17369785277'
    }
});
