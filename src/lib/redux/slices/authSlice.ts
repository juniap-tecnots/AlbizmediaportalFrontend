
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from './usersSlice';

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
    }
  },
});

export const { loginSuccess, logoutSuccess, setCurrentUser } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

export default authSlice.reducer;
