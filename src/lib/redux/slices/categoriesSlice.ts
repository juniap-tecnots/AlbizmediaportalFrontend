
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Category {
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface Tag {
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface CategoriesState {
  categories: Category[];
  tags: Tag[];
}

const initialState: CategoriesState = {
  categories: [
    { name: "Business", slug: "business", description: "Articles about the business world", count: 5 },
    { name: "Life Style", slug: "life-style", description: "Content related to lifestyle", count: 12 },
    { name: "Tech", slug: "tech", description: "Latest in technology", count: 8 },
    { name: "Uncategorized", slug: "uncategorized", description: "Articles that have not been categorized", count: 2 },
    { name: "World", slug: "world", description: "Global news and events", count: 3 },
  ],
  tags: [
    { name: "Color", slug: "color", description: "-", count: 1 },
    { name: "Content", slug: "content", description: "-", count: 1 },
    { name: "Foods", slug: "foods", description: "-", count: 1 },
    { name: "Games", slug: "games", description: "-", count: 2 },
    { name: "Life Style", slug: "life-style", description: "-", count: 4 },
  ]
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    addTag: (state, action: PayloadAction<Tag>) => {
        state.tags.push(action.payload);
    }
  },
});

export const { addCategory, addTag } = categoriesSlice.actions;

export const selectAllCategories = (state: RootState) => state.categories.categories;
export const selectAllTags = (state: RootState) => state.categories.tags;

export default categoriesSlice.reducer;
