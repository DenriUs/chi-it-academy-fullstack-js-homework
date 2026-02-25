import zod from 'zod';

import { PAGINATION_SEARCH_PARAMS_FALLBACK } from '@/router/constants';
import type { PaginationSearchParams } from '@/router/types';

const schema = zod.object({
  page: zod.coerce.number().int().positive(),
  limit: zod.literal(PAGINATION_SEARCH_PARAMS_FALLBACK.limit),
}) satisfies zod.ZodType<PaginationSearchParams>;

export const paginationSearchParamsSchemaConfig = {
  schema,
  fallbackValues: PAGINATION_SEARCH_PARAMS_FALLBACK,
};
