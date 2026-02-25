import type { CreateAxiosDefaults } from 'axios';

const TIMEOUT_SECONDS = 20;

export const axiosDefaultConfig: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * TIMEOUT_SECONDS,
};
