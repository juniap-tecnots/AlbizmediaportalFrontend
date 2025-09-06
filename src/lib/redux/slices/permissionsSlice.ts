
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type PermissionRight = 'read' | 'write' | 'delete';

export interface Permission {
  id: string;
  name: string;
  description: string;
  rights: PermissionRight[];
  parentId?: string;
}

interface PermissionsState {
  permissions: Permission[];
}

const initialState: PermissionsState = {
  permissions: [
    { id: 'articles', name: 'Articles', description: 'Manage articles', rights: ['read'], parentId: undefined },
    { id: 'edit-articles', name: 'Edit Articles', description: 'Create and edit articles', rights: ['write'], parentId: 'articles' },
    { id: 'delete-articles', name: 'Delete Articles', description: 'Delete articles', rights: ['delete'], parentId: 'articles' },
    { id: 'users', name: 'Users', description: 'Manage users', rights: ['read'], parentId: undefined },
    { id: 'manage-users', name: 'Manage Users', description: 'Add, edit, delete users', rights: ['write', 'delete'], parentId: 'users' },
    { id: 'settings', name: 'Settings', description: 'Manage application settings', rights: ['read'], parentId: undefined },
    { id: 'manage-settings', name: 'Manage Settings', description: 'Modify system settings', rights: ['write'], parentId: 'settings' },
  ],
};

let lastId = initialState.permissions.length;
const createPermissionId = (name: string) => name.toLowerCase().replace(/\s+/g, '-');


const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    addPermission: (state, action: PayloadAction<Omit<Permission, 'id'>>) => {
      const newPermission: Permission = {
        ...action.payload,
        id: createPermissionId(action.payload.name),
      };
      // prevent duplicate ids
      if (state.permissions.some(p => p.id === newPermission.id)) {
        newPermission.id = `${newPermission.id}-${lastId++}`;
      }
      state.permissions.push(newPermission);
    },
  },
});

export const { addPermission } = permissionsSlice.actions;

export const selectAllPermissions = (state: RootState) => state.permissions.permissions;

export default permissionsSlice.reducer;
