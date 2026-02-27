import { NextRequest, NextResponse } from 'next/server';

import { APP_ROUTE_SEARCH_PARAMS_CONFIGS } from './navigation/constants';
import { AppRoutePath } from './navigation/types';
import {
  createNewSearchParams,
  validateSearchParams,
} from './lib/search-params/search-params.helpers';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const searchParamsValidationConfig = APP_ROUTE_SEARCH_PARAMS_CONFIGS[pathname as AppRoutePath];
  if (!searchParamsValidationConfig) {
    return NextResponse.next();
  }

  const { schema, fallbackValues } = searchParamsValidationConfig;

  const validatedSearchParams = validateSearchParams(schema, searchParams, fallbackValues);
  const newSearchParams = createNewSearchParams(validatedSearchParams);
  const newSerializedSearchParams = newSearchParams.toString();

  if (newSerializedSearchParams === searchParams.toString()) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.search = newSerializedSearchParams;

  return NextResponse.redirect(url.toString());
}

export const config = {
  matcher: ['/', '/my-posts'],
};
