
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface AccountInfo {
  name: string;
  email: string;
  bio: string;
  photo: string;
}

interface AccountsState {
  info: AccountInfo;
}

const initialState: AccountsState = {
  info: {
    name: "Admin User",
    email: "admin@ecom.com",
    bio: "I am the lead administrator for this platform, responsible for managing content, users, and system settings.",
    photo: "https://picsum.photos/100"
  },
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    updateAccountInfo: (state, action: PayloadAction<AccountInfo>) => {
      state.info = action.payload;
    },
  },
});

export const { updateAccountInfo } = accountsSlice.actions;

export const selectAccountInfo = (state: RootState) => state.accounts.info;

export default accountsSlice.reducer;
