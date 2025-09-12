

'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type PlaceStatus = 'In-progress' | 'Submitted for review' | 'Under Review' | 'Verified' | 'Published' | 'Needs Update' | 'Archived';

export interface Place {
  id: string;
  title: string;
  slug: string;
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
  imageUrl: string;
  photoGallery: { url: string; caption: string }[];
  website?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
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
        title: 'The Grand View Restaurant',
        slug: 'the-grand-view-restaurant',
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
        imageUrl: 'https://picsum.photos/seed/place-main/800/500',
        photoGallery: [
          { url: 'https://picsum.photos/seed/gallery1/600/400', caption: 'Interior view' },
          { url: 'https://picsum.photos/seed/gallery2/600/400', caption: 'Outdoor patio' },
        ],
        website: 'https://grandview.com',
        twitter: 'https://twitter.com/grandview',
        instagram: 'https://instagram.com/grandview',
        facebook: 'https://facebook.com/grandview',
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
    addPlace: (state, action: PayloadAction<Omit<Place, 'id' | 'lastUpdated' | 'status'>>) => {
      const newPlace: Place = {
        ...(action.payload as Omit<Place, 'id' | 'lastUpdated'>),
        id: `place_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`,
        lastUpdated: new Date().toISOString(),
        status: 'In-progress',
      };
      state.places.push(newPlace);
    },
    updatePlace: (state, action: PayloadAction<Place>) => {
        const index = state.places.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
            state.places[index] = { ...action.payload, lastUpdated: new Date().toISOString() };
        }
    },
    deletePlace: (state, action: PayloadAction<string>) => {
        state.places = state.places.filter(p => p.id !== action.payload);
    }
  },
});

export const { addPlace, updatePlace, deletePlace } = placesSlice.actions;

export const selectAllPlaces = (state: RootState) => state.places.places;
export const selectPlaceById = (state: RootState, id: string) => state.places.places.find(p => p.id === id);


export default placesSlice.reducer;