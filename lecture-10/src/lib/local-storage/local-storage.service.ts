import { tryCatch } from '@lib/try-catch.helpers';

export const LOCAL_STORAGE_KEYS = {
  accessToken: 'access-token',
} as const;

type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

export abstract class LocalStorageService {
  public static setItem = (key: LocalStorageKey, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  public static getItem = <T = unknown>(key: LocalStorageKey) => {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    const { data, error } = tryCatch<T>(() => JSON.parse(value));
    if (error) {
      return null;
    }
    return data;
  };

  public static removeItem = (key: LocalStorageKey) => {
    localStorage.removeItem(key);
  };
}
