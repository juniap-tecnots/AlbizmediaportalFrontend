
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Event {
  id: string;
  eventTitle: string;
  eventType: 'Concert' | 'Festival' | 'Conference' | 'Sports';
  startTime: string;
  endTime: string;
  venueInfo: string;
  description: string;
}

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
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
  },
});

export const { addEvent } = eventsSlice.actions;

export const selectAllEvents = (state: RootState) => state.events.events;

export default eventsSlice.reducer;
