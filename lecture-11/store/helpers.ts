import { createAsyncThunk } from '@reduxjs/toolkit';

import { tryCatchAsync } from '@/lib/try-catch.helpers';
import { ApiError } from '@/api/api.error';

const processApiThunkError = <R extends (value: unknown) => unknown>(
  rejectWithValue: R,
  error: ApiError,
): ReturnType<R> => {
  return rejectWithValue({
    type: 'API_ERROR',
    message: error.message,
    error: error.error,
    statusCode: error.statusCode,
  }) as ReturnType<R>;
};

export const createApiThunk = <T, Arg = undefined>(
  typePrefix: string,
  apiFetcher: (arg: Arg) => Promise<T>,
) => {
  return createAsyncThunk(typePrefix, async (arg: Arg, { rejectWithValue }) => {
    const { data, error } = await tryCatchAsync<T, ApiError>(apiFetcher(arg));
    if (error) {
      return processApiThunkError(rejectWithValue, error);
    }
    return data;
  });
};
