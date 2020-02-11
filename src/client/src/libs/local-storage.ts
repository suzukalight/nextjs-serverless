import { createLocalStorage } from 'localstorage-ponyfill';

const localStorage = createLocalStorage();

export const getItem = (key: string) => localStorage.getItem(key);

export const setItem = (key: string, data: string) => localStorage.setItem(key, data);

export const removeItem = (key: string) => localStorage.removeItem(key);
