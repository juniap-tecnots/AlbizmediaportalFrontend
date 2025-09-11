
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type PlaceStatus = 'Draft' | 'Under Review' | 'Verified' | 'Published' | 'Needs Update' | 'Archived';

export interface Place {
  id: string;
  placeName: string;
  category: 'Restaurant' | 'Attraction' | 'Shopping' | 'Entertainment';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  description: string;
  openingHours: string; // Could be a structured object
  contactInfo: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  status: PlaceStatus;
}

interface PlacesState {
  places: Place[];
}

const initialState: PlacesState = {
  places: [
    {
        id: 'place_001',
        placeName: 'The Grand View Restaurant',
        category: 'Restaurant',
        location: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: '123 Main St, New York, NY'
        },
        description: 'A fine dining experience with a view.',
        openingHours: 'Mon-Fri: 5pm - 11pm, Sat-Sun: 12pm - 12am',
        contactInfo: 'contact@grandview.com',
        priceRange: '$$$',
        status: 'Published'
    }
  ],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<Omit<Place, 'id'>>) => {
      const newPlace: Place = {
        ...action.payload,
        id: `place_${state.places.length + 101}`,
      };
      state.places.push(newPlace);
    },
  },
});

export const { addPlace } = placesSlice.actions;

export const selectAllPlaces = (state: RootState) => state.places.places;

export default placesSlice.reducer;
