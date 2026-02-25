import type { PathParams } from '@/router/types';

export const serializePathParams = (pathname: string, params: PathParams) => {
  for (const [key, value] of Object.entries(params)) {
    pathname = pathname.replace(`:${key}`, String(value));
  }
  return pathname;
};
