
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ContractStatus } from './contractsSlice';

export type UserRole = 'Admin' | 'Editor' | 'Author';
export type UserStatus = 'Active' | 'Suspended';
export type UserContractStatus = ContractStatus | 'N/A';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  contractStatus: UserContractStatus;
  lastLogin: string;
  type: 'Platform' | 'Staff';
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: '1', firstName: 'Emma', lastName: 'Wilson', email: 'emma.wilson@example.com', avatar: 'https://picsum.photos/100?a=6', role: 'Admin', status: 'Active', contractStatus: 'Active', lastLogin: '2024-05-10T00:00:00Z', type: 'Staff' },
    { id: '2', firstName: 'Liam', lastName: 'Smith', email: 'liam.smith@example.com', avatar: 'https://picsum.photos/100?a=7', role: 'Editor', status: 'Active', contractStatus: 'Pending', lastLogin: '2024-05-12T00:00:00Z', type: 'Staff' },
    { id: '3', firstName: 'Olivia', lastName: 'Jones', email: 'olivia.jones@example.com', avatar: 'https://picsum.photos/100?a=8', role: 'Author', status: 'Suspended', contractStatus: 'Expired', lastLogin: '2024-04-28T00:00:00Z', type: 'Staff' },
    { id: '4', firstName: 'Noah', lastName: 'Brown', email: 'noah.brown@example.com', avatar: 'https://picsum.photos/100?a=9', role: 'Author', status: 'Active', contractStatus: 'Draft', lastLogin: '2024-05-13T00:00:00Z', type: 'Platform' },
    { id: '5', firstName: 'Ava', lastName: 'Davis', email: 'ava.davis@example.com', avatar: 'https://picsum.photos/100?a=10', role: 'Editor', status: 'Active', contractStatus: 'N/A', lastLogin: '2024-05-11T00:00:00Z', type: 'Platform' },
  ],
};

let lastId = initialState.users.length;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'id' | 'lastLogin' | 'avatar' | 'status' | 'type' | 'contractStatus'>>) => {
      lastId++;
      const newUser: User = {
        ...action.payload,
        id: lastId.toString(),
        lastLogin: new Date().toISOString(),
        avatar: `https://picsum.photos/100?a=${lastId}`,
        status: 'Active',
        contractStatus: 'N/A',
        type: 'Platform', 
      };
      state.users.unshift(newUser);
    },
    updateUser: (state, action: PayloadAction<Partial<User> & Pick<User, 'id'>>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;

    