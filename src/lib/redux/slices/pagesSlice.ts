'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { MediaItem } from './mediaSlice';
import { BlockConfig } from './blocksSlice';

export type PageStatus = 'draft' | 'published' | 'archived' | 'scheduled';
export type PageTemplate = 'homepage' | 'article-listing' | 'about' | 'contact' | 'landing' | 'custom';
export type PageVisibility = 'public' | 'private' | 'password';

export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
}

export interface PageSettings {
  visibility: PageVisibility;
  allowComments: boolean;
  customCSS?: string;
  password?: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  template: PageTemplate;
  status: PageStatus;
  author: string;
  featuredImage?: string;
  media: MediaItem[];
  blocks: BlockConfig[]; // Enhanced block-based content
  seo: PageSEO;
  settings: PageSettings;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

interface PagesState {
  pages: Page[];
}

const initialState: PagesState = {
  pages: [
    {
      id: '1',
      title: 'Homepage',
      slug: 'home',
      content: '<h1>Welcome to Albiz Media</h1><p>Your trusted source for news and information.</p>',
      excerpt: 'Welcome to Albiz Media - Your trusted source for news and information.',
      template: 'homepage',
      status: 'published',
      author: 'albiz',
      featuredImage: 'https://picsum.photos/800/400?random=1',
      media: [],
      blocks: [],
      seo: {
        title: 'Albiz Media - Homepage',
        description: 'Welcome to Albiz Media - Your trusted source for news and information.',
        keywords: ['news', 'media', 'information', 'homepage']
      },
      settings: {
        visibility: 'public',
        allowComments: true
      },
      publishDate: '2024-01-01T00:00:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1
    },
    {
      id: '2',
      title: 'About Us',
      slug: 'about',
      content: '<h1>About Albiz Media</h1><p>We are committed to delivering accurate and timely news.</p>',
      excerpt: 'Learn more about Albiz Media and our mission.',
      template: 'about',
      status: 'published',
      author: 'albiz',
      featuredImage: 'https://picsum.photos/800/400?random=2',
      media: [],
      blocks: [],
      seo: {
        title: 'About Us - Albiz Media',
        description: 'Learn more about Albiz Media and our mission to deliver accurate news.',
        keywords: ['about', 'mission', 'company', 'news']
      },
      settings: {
        visibility: 'public',
        allowComments: false
      },
      publishDate: '2024-01-01T00:00:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1
    },
    {
      id: '3',
      title: 'Contact Us',
      slug: 'contact',
      content: '<h1>Contact Information</h1><p>Get in touch with our team.</p>',
      excerpt: 'Contact information and ways to reach us.',
      template: 'contact',
      status: 'draft',
      author: 'albiz',
      media: [],
      blocks: [],
      seo: {
        title: 'Contact Us - Albiz Media',
        description: 'Contact information and ways to reach Albiz Media.',
        keywords: ['contact', 'reach', 'information']
      },
      settings: {
        visibility: 'public',
        allowComments: false
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      version: 1
    }
  ],
};

let lastId = initialState.pages.length;

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addPage: (state, action: PayloadAction<Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'version'>>) => {
      lastId++;
      const newPage: Page = {
        ...action.payload,
        id: lastId.toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      };
      state.pages.unshift(newPage);
    },
    updatePage: (state, action: PayloadAction<Partial<Page> & Pick<Page, 'id'>>) => {
      const index = state.pages.findIndex(page => page.id === action.payload.id);
      if (index !== -1) {
        state.pages[index] = { 
          ...state.pages[index], 
          ...action.payload,
          updatedAt: new Date().toISOString(),
          version: state.pages[index].version + 1
        };
      }
    },
    deletePage: (state, action: PayloadAction<string>) => {
      state.pages = state.pages.filter(page => page.id !== action.payload);
    },
    publishPage: (state, action: PayloadAction<string>) => {
      const index = state.pages.findIndex(page => page.id === action.payload);
      if (index !== -1) {
        state.pages[index].status = 'published';
        state.pages[index].publishDate = new Date().toISOString();
        state.pages[index].updatedAt = new Date().toISOString();
      }
    },
    archivePage: (state, action: PayloadAction<string>) => {
      const index = state.pages.findIndex(page => page.id === action.payload);
      if (index !== -1) {
        state.pages[index].status = 'archived';
        state.pages[index].updatedAt = new Date().toISOString();
      }
    },
    schedulePage: (state, action: PayloadAction<{ id: string; publishDate: string }>) => {
      const index = state.pages.findIndex(page => page.id === action.payload.id);
      if (index !== -1) {
        state.pages[index].status = 'scheduled';
        state.pages[index].publishDate = action.payload.publishDate;
        state.pages[index].updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { 
  addPage, 
  updatePage, 
  deletePage, 
  publishPage, 
  archivePage, 
  schedulePage 
} = pagesSlice.actions;

export const selectAllPages = (state: RootState) => state.pages.pages;
export const selectPageById = (state: RootState, pageId: string) => 
  state.pages.pages.find(page => page.id === pageId);
export const selectPublishedPages = (state: RootState) => 
  state.pages.pages.filter(page => page.status === 'published');
export const selectDraftPages = (state: RootState) => 
  state.pages.pages.filter(page => page.status === 'draft');
export const selectScheduledPages = (state: RootState) => 
  state.pages.pages.filter(page => page.status === 'scheduled');
export const selectArchivedPages = (state: RootState) => 
  state.pages.pages.filter(page => page.status === 'archived');
export const selectPageBySlug = (state: RootState, slug: string) => 
  state.pages.pages.find(page => page.slug === slug);

export default pagesSlice.reducer;
