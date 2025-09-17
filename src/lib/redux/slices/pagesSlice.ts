'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type PageStatus = 'draft' | 'published' | 'archived' | 'scheduled';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  template: string;
  status: PageStatus;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  visibility: 'public' | 'private' | 'password';
  password?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
}

interface PagesState {
  pages: Page[];
}

const initialState: PagesState = {
  pages: [
    {
      id: '1',
      title: 'Welcome to Albiz Media',
      slug: 'welcome-to-albiz-media',
      content: '<p>Welcome to our platform...</p>',
      template: 'default',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      publishedAt: '2024-01-01T00:00:00Z',
      visibility: 'public',
      seoTitle: 'Welcome to Albiz Media - Your Content Platform',
      seoDescription: 'Discover the power of content creation with Albiz Media.',
      featuredImage: '/images/welcome.jpg'
    },
    {
      id: '2',
      title: 'About Us',
      slug: 'about-us',
      content: '<p>Learn more about our company...</p>',
      template: 'about',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-10T14:20:00Z',
      publishedAt: '2024-01-02T00:00:00Z',
      visibility: 'public',
      seoTitle: 'About Albiz Media - Our Story',
      seoDescription: 'Discover the story behind Albiz Media and our mission.',
      featuredImage: '/images/about.jpg'
    },
    {
      id: '3',
      title: 'Contact Information',
      slug: 'contact',
      content: '<p>Get in touch with us...</p>',
      template: 'contact',
      status: 'draft',
      author: 'Admin',
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-12T09:15:00Z',
      visibility: 'public',
      seoTitle: 'Contact Albiz Media',
      seoDescription: 'Reach out to our team for support and inquiries.'
    },
    {
      id: '4',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: '<p>Our privacy policy...</p>',
      template: 'legal',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-04T00:00:00Z',
      updatedAt: '2024-01-08T16:45:00Z',
      publishedAt: '2024-01-04T00:00:00Z',
      visibility: 'public',
      seoTitle: 'Privacy Policy - Albiz Media',
      seoDescription: 'Learn how we protect your privacy and data.'
    },
    {
      id: '5',
      title: 'Terms of Service',
      slug: 'terms-of-service',
      content: '<p>Our terms of service...</p>',
      template: 'legal',
      status: 'archived',
      author: 'Admin',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-06T11:30:00Z',
      publishedAt: '2024-01-05T00:00:00Z',
      visibility: 'public',
      seoTitle: 'Terms of Service - Albiz Media',
      seoDescription: 'Read our terms and conditions.'
    }
  ]
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addPage: (state, action: PayloadAction<Page>) => {
      state.pages.push(action.payload);
    },
    updatePage: (state, action: PayloadAction<Page>) => {
      const index = state.pages.findIndex(page => page.id === action.payload.id);
      if (index !== -1) {
        state.pages[index] = action.payload;
      }
    },
    deletePage: (state, action: PayloadAction<string>) => {
      state.pages = state.pages.filter(page => page.id !== action.payload);
    },
    publishPage: (state, action: PayloadAction<string>) => {
      const page = state.pages.find(page => page.id === action.payload);
      if (page) {
        page.status = 'published';
        page.publishedAt = new Date().toISOString();
        page.updatedAt = new Date().toISOString();
      }
    },
    archivePage: (state, action: PayloadAction<string>) => {
      const page = state.pages.find(page => page.id === action.payload);
      if (page) {
        page.status = 'archived';
        page.updatedAt = new Date().toISOString();
      }
    },
    schedulePage: (state, action: PayloadAction<{ id: string; scheduledAt: string }>) => {
      const page = state.pages.find(page => page.id === action.payload.id);
      if (page) {
        page.status = 'scheduled';
        page.scheduledAt = action.payload.scheduledAt;
        page.updatedAt = new Date().toISOString();
      }
    },
    draftPage: (state, action: PayloadAction<string>) => {
      const page = state.pages.find(page => page.id === action.payload);
      if (page) {
        page.status = 'draft';
        page.updatedAt = new Date().toISOString();
      }
    }
  }
});

export const {
  addPage,
  updatePage,
  deletePage,
  publishPage,
  archivePage,
  schedulePage,
  draftPage
} = pagesSlice.actions;

export const selectAllPages = (state: RootState) => state.pages.pages;
export const selectPageById = (state: RootState, id: string) => 
  state.pages.pages.find(page => page.id === id);
export const selectPagesByStatus = (state: RootState, status: PageStatus) =>
  state.pages.pages.filter(page => page.status === status);
export const selectPublishedPages = (state: RootState) =>
  state.pages.pages.filter(page => page.status === 'published');

export default pagesSlice.reducer;
