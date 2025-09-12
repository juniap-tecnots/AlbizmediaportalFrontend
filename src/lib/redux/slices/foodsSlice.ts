
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type FoodVenueStatus = 'In-progress' | 'Submitted for review' | 'Published';

export interface FoodVenue {
  id: string;
  title: string;
  slug: string;
  cuisineType: string[];
  location: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  diningStyle: 'Fast casual' | 'Fine dining' | 'Cafe';
  description: string;
  status: FoodVenueStatus;
}

interface FoodsState {
  venues: FoodVenue[];
}

const initialState: FoodsState = {
  venues: [
    {
      id: 'food_101',
      title: 'The Golden Spoon',
      slug: 'the-golden-spoon',
      cuisineType: ['Italian', 'Modern'],
      location: 'Downtown Cityville',
      priceRange: '$$$',
      diningStyle: 'Fine dining',
      description: 'An exquisite fine dining experience with a modern twist on Italian classics.',
      status: 'Published',
    },
    {
      id: 'food_102',
      title: 'The Daily Grind',
      slug: 'the-daily-grind',
      cuisineType: ['Coffee', 'Bakery'],
      location: 'Uptown Plaza',
      priceRange: '$$',
      diningStyle: 'Cafe',
      description: 'Your neighborhood-friendly cafe for the best coffee and pastries.',
      status: 'Published',
    }
  ],
};

const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    addFoodVenue: (state, action: PayloadAction<Omit<FoodVenue, 'id'>>) => {
      const newVenue: FoodVenue = {
        ...action.payload,
        id: `food_${state.venues.length + 101}`,
      };
      state.venues.push(newVenue);
    },
    updateFoodVenue: (state, action: PayloadAction<FoodVenue>) => {
      const index = state.venues.findIndex(v => v.id === action.payload.id);
      if (index !== -1) {
        state.venues[index] = action.payload;
      }
    },
    deleteFoodVenue: (state, action: PayloadAction<string>) => {
      state.venues = state.venues.filter(v => v.id !== action.payload);
    }
  },
});

export const { addFoodVenue, updateFoodVenue, deleteFoodVenue } = foodsSlice.actions;

export const selectAllFoodVenues = (state: RootState) => state.foods.venues;

export default foodsSlice.reducer;
