
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type MediaType = 'image' | 'video' | 'document' | 'audio';

export interface MediaItem {
  id: string;
  src: string;
  alt: string;
  type: MediaType;
  'data-ai-hint': string;
}

interface MediaState {
  items: MediaItem[];
}

const initialState: MediaState = {
  items: [
    { id: '1', src: "https://picsum.photos/300/200?random=1", alt: "Newspaper on a table", type: 'image', 'data-ai-hint': 'newspaper' },
    { id: '2', src: "https://picsum.photos/300/200?random=2", alt: "Man reading a newspaper", type: 'image', 'data-ai-hint': 'man newspaper' },
    { id: '3', src: "https://picsum.photos/300/200?random=3", alt: "Business newspaper", type: 'image', 'data-ai-hint': 'business newspaper' },
    { id: '4', src: "https://picsum.photos/300/200?random=4", alt: "Architectural detail", type: 'image', 'data-ai-hint': 'architecture detail' },
    { id: '5', src: "https://picsum.photos/300/200?random=5", alt: "Mountain peak", type: 'image', 'data-ai-hint': 'mountain peak' },
    { id: '6', src: "https://picsum.photos/300/200?random=6", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '7', src: "https://picsum.photos/300/200?random=7", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '8', src: "https://picsum.photos/300/200?random=8", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '9', src: "https://picsum.photos/300/200?random=9", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '10', src: "https://picsum.photos/300/200?random=10", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '11', src: "https://picsum.photos/300/200?random=11", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '12', src: "https://picsum.photos/300/200?random=12", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '13', src: "https://picsum.photos/300/200?random=13", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '14', src: "https://picsum.photos/300/200?random=14", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '15', src: "https://picsum.photos/300/200?random=15", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '16', src: "https://picsum.photos/300/200?random=16", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '17', src: "https://picsum.photos/300/200?random=17", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
    { id: '18', src: "https://picsum.photos/300/200?random=18", alt: "Placeholder", type: 'image', 'data-ai-hint': 'placeholder' },
  ]
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    addMediaItem: (state, action: PayloadAction<Omit<MediaItem, 'id'>>) => {
        const newItem: MediaItem = {
            ...action.payload,
            id: (state.items.length + 1).toString()
        };
        state.items.unshift(newItem);
    }
  },
});

export const { addMediaItem } = mediaSlice.actions;

export const selectAllMedia = (state: RootState) => state.media.items;
export const selectImages = (state: RootState) => state.media.items.filter(item => item.type === 'image');
export const selectVideos = (state: RootState) => state.media.items.filter(item => item.type === 'video');
export const selectDocuments = (state: RootState) => state.media.items.filter(item => item.type === 'document');
export const selectAudio = (state: RootState) => state.media.items.filter(item => item.type === 'audio');


export default mediaSlice.reducer;
