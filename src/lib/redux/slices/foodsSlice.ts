
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface FoodVenue {
  id: string;
  restaurantName: string;
  cuisineType: string[];
  location: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  diningStyle: 'Fast casual' | 'Fine dining' | 'Cafe';
}

interface FoodsState {
  venues: FoodVenue[];
}

const initialState: FoodsState = {
  venues: [],
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
  },
});

export const { addFoodVenue } = foodsSlice.actions;

export const selectAllFoodVenues = (state: RootState) => state.foods.venues;

export default foodsSlice.reducer;
