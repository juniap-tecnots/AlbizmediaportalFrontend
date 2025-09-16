
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface RolesState {
  roles: Role[];
}

const initialState: RolesState = {
  roles: [
    {
      id: '1',
      name: 'Admin',
      description: 'Has all permissions',
      permissions: ['manage-users', 'edit-articles', 'delete-articles', 'manage-settings', 'edit-pages', 'delete-pages', 'publish-pages'],
    },
    {
      id: '2',
      name: 'Editor',
      description: 'Can edit and publish articles and pages',
      permissions: ['edit-articles', 'delete-articles', 'edit-pages', 'publish-pages'],
    },
    {
      id: '3',
      name: 'Author',
      description: 'Can create and edit their own articles and pages',
      permissions: ['edit-articles', 'edit-pages'],
    },
  ],
};

let lastId = initialState.roles.length;

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Omit<Role, 'id'>>) => {
      lastId++;
      const newRole: Role = {
        ...action.payload,
        id: lastId.toString(),
      };
      state.roles.push(newRole);
    },
    updateRole: (state, action: PayloadAction<Role>) => {
        const index = state.roles.findIndex(role => role.id === action.payload.id);
        if (index !== -1) {
            state.roles[index] = action.payload;
        }
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
  },
});

export const { addRole, updateRole, deleteRole } = rolesSlice.actions;

export const selectAllRoles = (state: RootState) => state.roles.roles;
export const selectRoleById = (state: RootState, roleId: string) => state.roles.roles.find(role => role.id === roleId);

export default rolesSlice.reducer;
