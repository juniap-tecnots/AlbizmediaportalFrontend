

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
  openingHours: string; 
  contactInfo: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  status: PlaceStatus;
  amenities: string[];
  photoGallery: { url: string; caption: string }[];
  website?: string;
  accessibilityInfo?: string;
  bestVisitTimes?: string;
  curator: {
      name: string;
      verificationDate?: string;
  };
  lastUpdated: string;
  partnershipStatus?: string;
  internalRating?: number;
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
        status: 'Published',
        amenities: ['wifi', 'parking', 'outdoor-seating'],
        photoGallery: [],
        website: 'https://grandview.com',
        curator: {
            name: 'Admin User',
            verificationDate: new Date().toISOString(),
        },
        lastUpdated: new Date().toISOString(),
    }
  ],
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<Omit<Place, 'id' | 'lastUpdated'>>) => {
      const newPlace: Place = {
        ...action.payload,
        id: `place_${state.places.length + 101}`,
        lastUpdated: new Date().toISOString(),
      };
      state.places.push(newPlace);
    },
  },
});

export const { addPlace } = placesSlice.actions;

export const selectAllPlaces = (state: RootState) => state.places.places;

export default placesSlice.reducer;
