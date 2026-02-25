import type { Middleware, UnknownAction } from '@reduxjs/toolkit';

import { LocalStorageService } from '@lib/local-storage/local-storage.service';
import { getCurrentUserApiThunk, loginApiThunk, logout } from '@/store/slices/user.slice';

export const accessTokenMiddleware: Middleware = () => (next) => (interceptedAction) => {
  const result = next(interceptedAction);
  const action = interceptedAction as UnknownAction;

  if (loginApiThunk.fulfilled.match(action)) {
    LocalStorageService.setItem('access-token', action.payload.accessToken);
  } else if (getCurrentUserApiThunk.rejected.match(action) || logout.match(action)) {
    LocalStorageService.removeItem('access-token');
  }

  return result;
};
