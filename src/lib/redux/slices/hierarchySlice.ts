
'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface HierarchyNode {
  id: string;
  name: string;
  role: string;
  children?: HierarchyNode[];
}

interface HierarchyState {
  tree: HierarchyNode;
}

const initialState: HierarchyState = {
  tree: {
    id: '1',
    name: 'Chief Editor',
    role: 'Chief Editor',
    children: [
      {
        id: '2',
        name: 'Senior Editor',
        role: 'Editor',
        children: [
          { id: '3', name: 'Staff Writer 1', role: 'Author' },
          { id: '4', name: 'Staff Writer 2', role: 'Author' },
        ],
      },
      {
        id: '5',
        name: 'Legal Reviewer',
        role: 'Legal',
      },
    ],
  },
};

const hierarchySlice = createSlice({
  name: 'hierarchy',
  initialState,
  reducers: {
    // Actions to modify hierarchy can be added here
  },
});

// export const { ... } = hierarchySlice.actions;

export const selectHierarchyTree = (state: RootState) => state.hierarchy.tree;

export default hierarchySlice.reducer;
