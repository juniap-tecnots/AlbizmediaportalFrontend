'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { BlockConfig, BlockType } from './blocksSlice';

// Page Builder Core Types
export type PageStatus = 'draft' | 'published' | 'scheduled' | 'archived' | 'pending_review';
export type PageVisibility = 'public' | 'private' | 'password_protected';
export type PageTemplate = 'blank' | 'landing' | 'blog' | 'portfolio' | 'contact' | 'about' | 'custom';

// Page Data Model
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: BlockConfig[];
  status: PageStatus;
  visibility: PageVisibility;
  template: PageTemplate;
  seo: PageSEO;
  styling: PageStyling;
  settings: PageSettings;
  metadata: PageMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  authorId: string;
  version: number;
  parentId?: string; // For page hierarchy
  language: string;
  translations: string[]; // Array of page IDs in other languages
}

// SEO Configuration
export interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  robots: 'index,follow' | 'noindex,nofollow' | 'index,nofollow' | 'noindex,follow';
  structuredData?: Record<string, any>;
}

// Page Styling
export interface PageStyling {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  lineHeight: number;
  customCSS: string;
  theme: string;
  responsive: {
    mobile: Partial<PageStyling>;
    tablet: Partial<PageStyling>;
    desktop: Partial<PageStyling>;
  };
}

// Page Settings
export interface PageSettings {
  allowComments: boolean;
  showAuthor: boolean;
  showDate: boolean;
  showSocialShare: boolean;
  password?: string; // For password-protected pages
  redirectUrl?: string; // For redirect pages
  customFields: Record<string, any>;
  analytics: {
    trackPageViews: boolean;
    trackBlockInteractions: boolean;
    customEvents: string[];
  };
}

// Page Metadata
export interface PageMetadata {
  wordCount: number;
  readingTime: number;
  lastModifiedBy: string;
  modificationReason?: string;
  tags: string[];
  categories: string[];
  featuredImage?: string;
  customFields: Record<string, any>;
}

// Page Template
export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'blog' | 'portfolio' | 'business' | 'ecommerce' | 'custom';
  thumbnail: string;
  preview: string;
  content: BlockConfig[];
  styling: PageStyling;
  seo: Partial<PageSEO>;
  settings: Partial<PageSettings>;
  isCustom: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  tags: string[];
}

// Page Builder State
export interface PageBuilderState {
  pages: Page[];
  templates: PageTemplate[];
  currentPage: Page | null;
  isEditing: boolean;
  selectedBlockId: string | null;
  clipboard: BlockConfig | null;
  history: {
    past: Page[];
    present: Page;
    future: Page[];
  };
  previewMode: 'desktop' | 'tablet' | 'mobile';
  sidebarOpen: boolean;
  blockLibraryOpen: boolean;
  settingsPanelOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

// Page Builder Actions
export interface CreatePagePayload {
  title: string;
  template?: PageTemplate;
  parentId?: string;
  language?: string;
}

export interface UpdatePagePayload {
  id: string;
  updates: Partial<Omit<Page, 'id' | 'createdAt' | 'updatedAt'>>;
}

export interface DuplicatePagePayload {
  id: string;
  newTitle: string;
  newSlug: string;
}

export interface SchedulePagePayload {
  id: string;
  scheduledAt: string;
}

// Initial State
const initialState: PageBuilderState = {
  pages: [],
  templates: [
    {
      id: 'blank',
      name: 'Blank Page',
      description: 'Start with a clean slate',
      category: 'custom',
      thumbnail: '/templates/blank.jpg',
      preview: '/templates/blank-preview.jpg',
      content: [],
      styling: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        fontFamily: 'Inter',
        fontSize: 'medium',
        lineHeight: 1.6,
        customCSS: '',
        theme: 'default',
        responsive: {
          mobile: {},
          tablet: {},
          desktop: {}
        }
      },
      seo: {},
      settings: {},
      isCustom: false,
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      tags: ['blank', 'minimal']
    },
    {
      id: 'landing',
      name: 'Landing Page',
      description: 'Perfect for marketing campaigns',
      category: 'landing',
      thumbnail: '/templates/landing.jpg',
      preview: '/templates/landing-preview.jpg',
      content: [
        {
          id: '1',
          type: 'hero-banner',
          data: {
            heading: 'Welcome to Our Platform',
            subheading: 'Build amazing experiences with our tools',
            textAlignment: 'center',
            overlay: 'gradient',
            height: 'medium'
          },
          styling: {
            backgroundColor: 'transparent',
            textColor: 'inherit',
            padding: { top: 40, right: 20, bottom: 40, left: 20 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            borderRadius: 0
          },
          layout: {
            width: 'full',
            alignment: 'center',
            responsive: {
              mobile: { width: 'full', alignment: 'center', responsive: {} as any },
              tablet: { width: 'full', alignment: 'center', responsive: {} as any },
              desktop: { width: 'full', alignment: 'center', responsive: {} as any }
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'article-feed',
          data: {
            source: 'latest',
            limit: 6,
            showExcerpt: true,
            layout: 'grid',
            columns: 3,
            imageRatio: '16:9'
          },
          styling: {
            backgroundColor: 'transparent',
            textColor: 'inherit',
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            borderRadius: 0
          },
          layout: {
            width: 'full',
            alignment: 'left',
            responsive: {
              mobile: { width: 'full', alignment: 'left', responsive: {} as any },
              tablet: { width: 'full', alignment: 'left', responsive: {} as any },
              desktop: { width: 'full', alignment: 'left', responsive: {} as any }
            }
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      styling: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        fontFamily: 'Inter',
        fontSize: 'medium',
        lineHeight: 1.6,
        customCSS: '',
        theme: 'default',
        responsive: {
          mobile: {},
          tablet: {},
          desktop: {}
        }
      },
      seo: {
        metaTitle: 'Landing Page - Albiz Media',
        metaDescription: 'Discover our amazing platform and services',
        metaKeywords: ['landing', 'marketing', 'platform'],
        robots: 'index,follow'
      },
      settings: {
        allowComments: false,
        showAuthor: false,
        showDate: false,
        showSocialShare: true,
        analytics: {
          trackPageViews: true,
          trackBlockInteractions: true,
          customEvents: []
        }
      },
      isCustom: false,
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      tags: ['landing', 'marketing', 'hero']
    }
  ],
  currentPage: null,
  isEditing: false,
  selectedBlockId: null,
  clipboard: null,
  history: {
    past: [],
    present: {} as Page,
    future: []
  },
  previewMode: 'desktop',
  sidebarOpen: true,
  blockLibraryOpen: false,
  settingsPanelOpen: false,
  isLoading: false,
  error: null
};

// Helper Functions
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const generatePageId = (): string => {
  return `page_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Page Builder Slice
const pageBuilderSlice = createSlice({
  name: 'pageBuilder',
  initialState,
  reducers: {
    // Page Management
    createPage: (state, action: PayloadAction<CreatePagePayload>) => {
      const { title, template, parentId, language = 'en' } = action.payload;
      const selectedTemplate = template || state.templates.find(t => t.id === 'blank');
      
      const newPage: Page = {
        id: generatePageId(),
        title,
        slug: generateSlug(title),
        content: selectedTemplate ? [...selectedTemplate.content] : [],
        status: 'draft',
        visibility: 'public',
        template: selectedTemplate?.id as PageTemplate || 'blank',
        seo: {
          metaTitle: title,
          metaDescription: '',
          metaKeywords: [],
          robots: 'index,follow'
        },
        styling: selectedTemplate?.styling || {
          backgroundColor: '#ffffff',
          textColor: '#000000',
          fontFamily: 'Inter',
          fontSize: 'medium',
          lineHeight: 1.6,
          customCSS: '',
          theme: 'default',
          responsive: {
            mobile: {},
            tablet: {},
            desktop: {}
          }
        },
        settings: selectedTemplate?.settings || {
          allowComments: true,
          showAuthor: true,
          showDate: true,
          showSocialShare: true,
          analytics: {
            trackPageViews: true,
            trackBlockInteractions: true,
            customEvents: []
          }
        },
        metadata: {
          wordCount: 0,
          readingTime: 0,
          lastModifiedBy: 'current_user',
          tags: [],
          categories: [],
          customFields: {}
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: 'current_user',
        version: 1,
        parentId,
        language,
        translations: []
      };

      state.pages.push(newPage);
      state.currentPage = newPage;
      state.isEditing = true;
    },

    updatePage: (state, action: PayloadAction<UpdatePagePayload>) => {
      const { id, updates } = action.payload;
      const pageIndex = state.pages.findIndex(page => page.id === id);
      
      if (pageIndex !== -1) {
        const updatedPage = {
          ...state.pages[pageIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
          version: state.pages[pageIndex].version + 1
        };
        
        state.pages[pageIndex] = updatedPage;
        
        if (state.currentPage?.id === id) {
          state.currentPage = updatedPage;
        }
      }
    },

    deletePage: (state, action: PayloadAction<string>) => {
      state.pages = state.pages.filter(page => page.id !== action.payload);
      
      if (state.currentPage?.id === action.payload) {
        state.currentPage = null;
        state.isEditing = false;
      }
    },

    duplicatePage: (state, action: PayloadAction<DuplicatePagePayload>) => {
      const { id, newTitle, newSlug } = action.payload;
      const originalPage = state.pages.find(page => page.id === id);
      
      if (originalPage) {
        const duplicatedPage: Page = {
          ...originalPage,
          id: generatePageId(),
          title: newTitle,
          slug: newSlug,
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1
        };
        
        state.pages.push(duplicatedPage);
      }
    },

    publishPage: (state, action: PayloadAction<string>) => {
      const pageIndex = state.pages.findIndex(page => page.id === action.payload);
      
      if (pageIndex !== -1) {
        state.pages[pageIndex].status = 'published';
        state.pages[pageIndex].publishedAt = new Date().toISOString();
        state.pages[pageIndex].updatedAt = new Date().toISOString();
      }
    },

    schedulePage: (state, action: PayloadAction<SchedulePagePayload>) => {
      const { id, scheduledAt } = action.payload;
      const pageIndex = state.pages.findIndex(page => page.id === id);
      
      if (pageIndex !== -1) {
        state.pages[pageIndex].status = 'scheduled';
        state.pages[pageIndex].scheduledAt = scheduledAt;
        state.pages[pageIndex].updatedAt = new Date().toISOString();
      }
    },

    archivePage: (state, action: PayloadAction<string>) => {
      const pageIndex = state.pages.findIndex(page => page.id === action.payload);
      
      if (pageIndex !== -1) {
        state.pages[pageIndex].status = 'archived';
        state.pages[pageIndex].updatedAt = new Date().toISOString();
      }
    },

    // Page Builder State Management
    setCurrentPage: (state, action: PayloadAction<Page | null>) => {
      state.currentPage = action.payload;
      state.isEditing = action.payload !== null;
    },

    setEditingMode: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },

    setSelectedBlock: (state, action: PayloadAction<string | null>) => {
      state.selectedBlockId = action.payload;
    },

    setPreviewMode: (state, action: PayloadAction<'desktop' | 'tablet' | 'mobile'>) => {
      state.previewMode = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    toggleBlockLibrary: (state) => {
      state.blockLibraryOpen = !state.blockLibraryOpen;
    },

    toggleSettingsPanel: (state) => {
      state.settingsPanelOpen = !state.settingsPanelOpen;
    },

    // Block Management
    addBlockToPage: (state, action: PayloadAction<{ pageId: string; block: BlockConfig; index?: number }>) => {
      const { pageId, block, index } = action.payload;
      const page = state.pages.find(p => p.id === pageId);
      
      if (page) {
        if (index !== undefined) {
          page.content.splice(index, 0, block);
        } else {
          page.content.push(block);
        }
        page.updatedAt = new Date().toISOString();
      }
    },

    updateBlockInPage: (state, action: PayloadAction<{ pageId: string; blockId: string; updates: Partial<BlockConfig> }>) => {
      const { pageId, blockId, updates } = action.payload;
      const page = state.pages.find(p => p.id === pageId);
      
      if (page) {
        const blockIndex = page.content.findIndex(b => b.id === blockId);
        if (blockIndex !== -1) {
          page.content[blockIndex] = {
            ...page.content[blockIndex],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          page.updatedAt = new Date().toISOString();
        }
      }
    },

    removeBlockFromPage: (state, action: PayloadAction<{ pageId: string; blockId: string }>) => {
      const { pageId, blockId } = action.payload;
      const page = state.pages.find(p => p.id === pageId);
      
      if (page) {
        page.content = page.content.filter(b => b.id !== blockId);
        page.updatedAt = new Date().toISOString();
      }
    },

    reorderBlocksInPage: (state, action: PayloadAction<{ pageId: string; fromIndex: number; toIndex: number }>) => {
      const { pageId, fromIndex, toIndex } = action.payload;
      const page = state.pages.find(p => p.id === pageId);
      
      if (page) {
        const blocks = [...page.content];
        const [movedBlock] = blocks.splice(fromIndex, 1);
        blocks.splice(toIndex, 0, movedBlock);
        page.content = blocks;
        page.updatedAt = new Date().toISOString();
      }
    },

    // Clipboard Operations
    copyBlock: (state, action: PayloadAction<BlockConfig>) => {
      state.clipboard = action.payload;
    },

    pasteBlock: (state, action: PayloadAction<{ pageId: string; index?: number }>) => {
      const { pageId, index } = action.payload;
      const page = state.pages.find(p => p.id === pageId);
      
      if (page && state.clipboard) {
        const newBlock: BlockConfig = {
          ...state.clipboard,
          id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        if (index !== undefined) {
          page.content.splice(index, 0, newBlock);
        } else {
          page.content.push(newBlock);
        }
        page.updatedAt = new Date().toISOString();
      }
    },

    // History Management
    saveToHistory: (state, action: PayloadAction<Page>) => {
      const currentPage = action.payload;
      state.history.past.push(state.history.present);
      state.history.present = currentPage;
      state.history.future = [];
    },

    undo: (state) => {
      if (state.history.past.length > 0) {
        state.history.future.unshift(state.history.present);
        state.history.present = state.history.past.pop()!;
      }
    },

    redo: (state) => {
      if (state.history.future.length > 0) {
        state.history.past.push(state.history.present);
        state.history.present = state.history.future.shift()!;
      }
    },

    // Template Management
    createTemplate: (state, action: PayloadAction<Omit<PageTemplate, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>>) => {
      const newTemplate: PageTemplate = {
        ...action.payload,
        id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0
      };
      
      state.templates.push(newTemplate);
    },

    updateTemplate: (state, action: PayloadAction<{ id: string; updates: Partial<PageTemplate> }>) => {
      const { id, updates } = action.payload;
      const templateIndex = state.templates.findIndex(t => t.id === id);
      
      if (templateIndex !== -1) {
        state.templates[templateIndex] = {
          ...state.templates[templateIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
    },

    deleteTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter(t => t.id !== action.payload);
    },

    // Loading and Error States
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  createPage,
  updatePage,
  deletePage,
  duplicatePage,
  publishPage,
  schedulePage,
  archivePage,
  setCurrentPage,
  setEditingMode,
  setSelectedBlock,
  setPreviewMode,
  toggleSidebar,
  toggleBlockLibrary,
  toggleSettingsPanel,
  addBlockToPage,
  updateBlockInPage,
  removeBlockFromPage,
  reorderBlocksInPage,
  copyBlock,
  pasteBlock,
  saveToHistory,
  undo,
  redo,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  setLoading,
  setError
} = pageBuilderSlice.actions;

// Selectors
export const selectAllPages = (state: RootState) => state.pageBuilder.pages;
export const selectPageById = (state: RootState, pageId: string) => 
  state.pageBuilder.pages.find(page => page.id === pageId);
export const selectPagesByStatus = (state: RootState, status: PageStatus) => 
  state.pageBuilder.pages.filter(page => page.status === status);
export const selectCurrentPage = (state: RootState) => state.pageBuilder.currentPage;
export const selectIsEditing = (state: RootState) => state.pageBuilder.isEditing;
export const selectSelectedBlock = (state: RootState) => state.pageBuilder.selectedBlockId;
export const selectPreviewMode = (state: RootState) => state.pageBuilder.previewMode;
export const selectSidebarOpen = (state: RootState) => state.pageBuilder.sidebarOpen;
export const selectBlockLibraryOpen = (state: RootState) => state.pageBuilder.blockLibraryOpen;
export const selectSettingsPanelOpen = (state: RootState) => state.pageBuilder.settingsPanelOpen;
export const selectAllTemplates = (state: RootState) => state.pageBuilder.templates;
export const selectTemplateById = (state: RootState, templateId: string) => 
  state.pageBuilder.templates.find(template => template.id === templateId);
export const selectTemplatesByCategory = (state: RootState, category: string) => 
  state.pageBuilder.templates.filter(template => template.category === category);
export const selectClipboard = (state: RootState) => state.pageBuilder.clipboard;
export const selectHistory = (state: RootState) => state.pageBuilder.history;
export const selectIsLoading = (state: RootState) => state.pageBuilder.isLoading;
export const selectError = (state: RootState) => state.pageBuilder.error;

export default pageBuilderSlice.reducer;



