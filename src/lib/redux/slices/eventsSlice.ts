

'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type EventStatus = 'In-progress' | 'Submitted for review' | 'Published';

export interface Event {
  id: string;
  title: string;
  slug: string;
  eventType: 'Concert' | 'Festival' | 'Conference' | 'Sports';
  startTime: string;
  endTime: string;
  venueInfo: string;
  description: string;
  organizerDetails: string;
  ticketInfo: {
    price: string;
    link: string;
    availability: string;
  };
  ageRestrictions: string;
  dressCode: string;
  socialMediaLinks: string[];
  rsvpLink: string;
  status: EventStatus;
  imageUrl: string;
}

interface EventsState {
  events: Event[];
}

const sampleEvents: Event[] = [
    {
      id: 'evt_101',
      title: 'Annual Tech Summit 2025',
      slug: 'annual-tech-summit-2025',
      eventType: 'Conference',
      startTime: '2025-10-20T09:00:00Z',
      endTime: '2025-10-22T17:00:00Z',
      venueInfo: 'The Grand Hall, 123 Event St, Cityville',
      description: 'The premier conference for tech enthusiasts.',
      organizerDetails: 'Tech Events Inc.',
      ticketInfo: { price: '$499', link: 'https://example.com/tickets', availability: 'Early Bird' },
      ageRestrictions: '18+',
      dressCode: 'Business Casual',
      socialMediaLinks: ['https://twitter.com/techsummit'],
      rsvpLink: 'https://example.com/rsvp',
      status: 'Published',
      imageUrl: 'https://picsum.photos/seed/event1/800/400'
    },
    {
      id: 'evt_102',
      title: 'Summer Music Fest',
      slug: 'summer-music-fest',
      eventType: 'Festival',
      startTime: '2025-07-15T12:00:00Z',
      endTime: '2025-07-17T23:00:00Z',
      venueInfo: 'Green Park, Cityville',
      description: 'Three days of music, food, and fun.',
      organizerDetails: 'Music Makers',
      ticketInfo: { price: '$150', link: 'https://example.com/tickets', availability: 'On Sale' },
      ageRestrictions: 'All ages',
      dressCode: 'Casual',
      socialMediaLinks: ['https://instagram.com/summermusicfest'],
      rsvpLink: 'https://example.com/rsvp-fest',
      status: 'Published',
      imageUrl: 'https://picsum.photos/seed/event2/800/400'
    },
  ];


const initialState: EventsState = {
  events: sampleEvents,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
      const newEvent: Event = {
        ...action.payload,
        id: `evt_${state.events.length + 101}`,
      };
      state.events.push(newEvent);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
});

export const { addEvent, updateEvent } = eventsSlice.actions;

export const selectAllEvents = (state: RootState) => state.events.events;

export default eventsSlice.reducer;
