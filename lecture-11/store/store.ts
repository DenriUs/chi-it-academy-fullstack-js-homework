import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/user.slice';
import { accessTokenMiddleware } from './middlewares/access-token.middleware';

export const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(accessTokenMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
