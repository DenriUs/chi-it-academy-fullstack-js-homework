import zod from 'zod';

import type { PaginationSearchParams } from '@/navigation/types';

export const PAGINATION_SEARCH_PARAMS_FALLBACK: PaginationSearchParams = {
  page: 1,
  limit: 10,
} as const;

const schema = zod.object({
  page: zod.coerce.number().int().positive(),
  limit: zod.literal(PAGINATION_SEARCH_PARAMS_FALLBACK.limit),
}) satisfies zod.ZodType<PaginationSearchParams>;

export const paginationSearchParamsSchemaConfig = {
  schema,
  fallbackValues: PAGINATION_SEARCH_PARAMS_FALLBACK,
};
