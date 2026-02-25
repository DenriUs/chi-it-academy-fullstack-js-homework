import { createSlice, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { getCurrentUser, login, register } from '@api/users/users.actions';
import { createApiThunk } from '@/store/helpers';

export type UserState = {
  id: number | null;
  username: string | null;
  isAuthorized: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
};

const initialState: UserState = {
  id: null,
  username: null,
  isAuthorized: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const loginApiThunk = createApiThunk('users/login', login);

export const registerApiThunk = createApiThunk('users/register', register);

export const getCurrentUserApiThunk = createApiThunk('users/get-current-user', getCurrentUser);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout() {
      return { ...initialState, isInitialized: true };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApiThunk.fulfilled, (state, action) => {
      state.id = action.payload.userId;
      state.username = action.payload.username;
      state.isAuthorized = true;
    });
    builder.addCase(getCurrentUserApiThunk.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.isAuthorized = true;
    });

    builder.addMatcher(getCurrentUserApiThunk.settled, (state) => {
      state.isInitialized = true;
    });
    builder.addMatcher(isPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isRejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
    builder.addMatcher(isAnyOf(isFulfilled, isRejected), (state) => {
      state.isLoading = false;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
