import type { CreateAxiosDefaults } from 'axios';

const TIMEOUT_SECONDS = 20;

export const axiosDefaultConfig: CreateAxiosDefaults = {
  baseURL: 'https://playground.zenberry.one',
  timeout: 1000 * TIMEOUT_SECONDS,
};
