'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { BlockConfig } from './blocksSlice';

// Theme Layout Types
export type ThemeLayoutType = 'blocks' | 'grids' | 'columns' | 'rows' | 'sidebar';
export type ThemeCategory = 'default' | 'news' | 'blog' | 'magazine';

// Theme Layout Configuration
export interface ThemeLayout {
  id: string;
  name: string;
  type: ThemeLayoutType;
  description: string;
  thumbnail: string;
  blocks: BlockConfig[];
  styling: {
    backgroundColor: string;
    textColor: string;
    padding: string;
    margin: string;
  };
}

// Theme Component Configuration
export interface ThemeComponent {
  id: string;
  name: string;
  type: 'navbar' | 'hero-banner' | 'footer' | 'sidebar';
  config: Record<string, any>;
  styling: Record<string, any>;
}

// Theme Styles
export interface ThemeStyles {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    fontSize: {
      base: string;
      h1: string;
      h2: string;
      h3: string;
    };
  };
  spacing: {
    sectionPadding: string;
    contentMargin: string;
    gridGap: string;
  };
  layout: {
    maxWidth: string;
    sidebarWidth: string;
    headerHeight: string;
  };
}

// Main Theme Interface
export interface Theme {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  thumbnail: string;
  previewImages: string[];
  category: ThemeCategory;
  isActive: boolean;
  isDefault: boolean;
  isCustom: boolean;
  
  // Theme Components
  navbar: ThemeComponent;
  heroBanner: ThemeComponent;
  footer: ThemeComponent;
  layouts: ThemeLayout[];
  
  // Theme Styling
  styles: ThemeStyles;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
}

// Theme Customization
export interface ThemeCustomization {
  id: string;
  themeId: string;
  userId: string;
  customizations: {
    colors?: Partial<ThemeStyles['colors']>;
    typography?: Partial<ThemeStyles['typography']>;
    spacing?: Partial<ThemeStyles['spacing']>;
    layout?: Partial<ThemeStyles['layout']>;
  };
  customCSS?: string;
  createdAt: string;
  updatedAt: string;
}

interface ThemesState {
  themes: Theme[];
  activeTheme: Theme | null;
  customizations: ThemeCustomization[];
  isLoading: boolean;
  error: string | null;
}

// Default Theme Styles
const defaultStyles: ThemeStyles = {
  colors: {
    primary: '#673AB7',
    secondary: '#2196F3',
    accent: '#FF9800',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: {
      primary: '#212121',
      secondary: '#757575',
      muted: '#BDBDBD',
    },
    border: '#E0E0E0',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    headingFont: 'Inter, sans-serif',
    fontSize: {
      base: '16px',
      h1: '32px',
      h2: '24px',
      h3: '20px',
    },
  },
  spacing: {
    sectionPadding: '40px',
    contentMargin: '20px',
    gridGap: '24px',
  },
  layout: {
    maxWidth: '1200px',
    sidebarWidth: '300px',
    headerHeight: '80px',
  },
};

// Default Theme Components
const defaultNavbar: ThemeComponent = {
  id: 'default-navbar',
  name: 'Default Navigation',
  type: 'navbar',
  config: {
    logo: 'Albiz Media',
    menuItems: [
      { label: 'Home', href: '/' },
      { label: 'News', href: '/news' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    showSearch: true,
    showUserMenu: true,
  },
  styling: {
    backgroundColor: '#FFFFFF',
    textColor: '#212121',
    height: '80px',
    padding: '0 24px',
  },
};

const defaultHeroBanner: ThemeComponent = {
  id: 'default-hero-banner',
  name: 'Default Hero Banner',
  type: 'hero-banner',
  config: {
    heading: 'Welcome to Albiz Media',
    subheading: 'Your trusted source for news and information',
    backgroundImage: 'https://picsum.photos/1200/600?random=1',
    ctaButton: {
      label: 'Read More',
      link: '/articles',
    },
    textAlignment: 'center',
    overlay: 'gradient',
    height: 'medium',
  },
  styling: {
    backgroundColor: '#673AB7',
    textColor: '#FFFFFF',
    padding: '80px 24px',
  },
};

const defaultFooter: ThemeComponent = {
  id: 'default-footer',
  name: 'Default Footer',
  type: 'footer',
  config: {
    copyright: '© 2024 Albiz Media. All rights reserved.',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact Us', href: '/contact' },
    ],
    socialLinks: [
      { platform: 'twitter', href: '#' },
      { platform: 'facebook', href: '#' },
      { platform: 'linkedin', href: '#' },
    ],
  },
  styling: {
    backgroundColor: '#212121',
    textColor: '#FFFFFF',
    padding: '40px 24px',
  },
};

// Default Theme Layouts
const defaultLayouts: ThemeLayout[] = [
  {
    id: 'blocks-layout',
    name: 'Blocks Layout',
    type: 'blocks',
    description: 'Flexible block-based layout for dynamic content',
    thumbnail: 'https://picsum.photos/300/200?random=1',
    blocks: [
      {
        id: '1',
        type: 'hero-banner',
        data: {
          heading: 'Breaking News',
          subheading: 'Stay updated with the latest developments',
          backgroundImage: 'https://picsum.photos/1200/400?random=1',
          textAlignment: 'center',
          overlay: 'gradient',
          height: 'medium',
        },
        styling: {
          backgroundColor: 'transparent',
          textColor: '#FFFFFF',
          padding: { top: 40, right: 20, bottom: 40, left: 20 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          borderRadius: 0,
        },
        layout: {
          width: 'full',
          alignment: 'center',
          responsive: {
            mobile: { width: 'full', alignment: 'center', responsive: {} as any },
            tablet: { width: 'full', alignment: 'center', responsive: {} as any },
            desktop: { width: 'full', alignment: 'center', responsive: {} as any },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
          imageRatio: '16:9',
        },
        styling: {
          backgroundColor: '#FFFFFF',
          textColor: '#212121',
          padding: { top: 40, right: 20, bottom: 40, left: 20 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          borderRadius: 8,
        },
        layout: {
          width: 'full',
          alignment: 'left',
          responsive: {
            mobile: { width: 'full', alignment: 'left', responsive: {} as any },
            tablet: { width: 'full', alignment: 'left', responsive: {} as any },
            desktop: { width: 'full', alignment: 'left', responsive: {} as any },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    styling: {
      backgroundColor: '#F5F5F5',
      textColor: '#212121',
      padding: '20px',
      margin: '0',
    },
  },
  {
    id: 'grids-layout',
    name: 'Grids Layout',
    type: 'grids',
    description: 'Organized grid system for structured content',
    thumbnail: 'https://picsum.photos/300/200?random=2',
    blocks: [
      {
        id: '3',
        type: 'text',
        data: {
          heading: 'Grid Layout',
          content: 'This layout uses a structured grid system for organized content display.',
          headingLevel: 2,
          alignment: 'center',
          fontSize: 'medium',
          fontWeight: 'normal',
        },
        styling: {
          backgroundColor: '#FFFFFF',
          textColor: '#212121',
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          borderRadius: 8,
        },
        layout: {
          width: 'full',
          alignment: 'center',
          responsive: {
            mobile: { width: 'full', alignment: 'center', responsive: {} as any },
            tablet: { width: 'full', alignment: 'center', responsive: {} as any },
            desktop: { width: 'full', alignment: 'center', responsive: {} as any },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    styling: {
      backgroundColor: '#F8F9FA',
      textColor: '#212121',
      padding: '20px',
      margin: '0',
    },
  },
  {
    id: 'columns-layout',
    name: 'Columns Layout',
    type: 'columns',
    description: 'Multi-column layout for diverse content types',
    thumbnail: 'https://picsum.photos/300/200?random=3',
    blocks: [
      {
        id: '4',
        type: 'featured-article',
        data: {
          articleId: '1',
          layout: 'card',
          showImage: true,
          showExcerpt: true,
        },
        styling: {
          backgroundColor: '#FFFFFF',
          textColor: '#212121',
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          borderRadius: 8,
        },
        layout: {
          width: 'half',
          alignment: 'left',
          responsive: {
            mobile: { width: 'full', alignment: 'left', responsive: {} as any },
            tablet: { width: 'half', alignment: 'left', responsive: {} as any },
            desktop: { width: 'half', alignment: 'left', responsive: {} as any },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    styling: {
      backgroundColor: '#FFFFFF',
      textColor: '#212121',
      padding: '20px',
      margin: '0',
    },
  },
  {
    id: 'rows-layout',
    name: 'Rows Layout',
    type: 'rows',
    description: 'Horizontal row-based layout for sequential content',
    thumbnail: 'https://picsum.photos/300/200?random=4',
    blocks: [
      {
        id: '5',
        type: 'call-to-action',
        data: {
          title: 'Join Our Community',
          subtitle: 'Stay connected with the latest news and updates',
          buttonText: 'Subscribe Now',
          buttonLink: '/subscribe',
          alignment: 'center',
          buttonStyle: 'primary',
        },
        styling: {
          backgroundColor: '#673AB7',
          textColor: '#FFFFFF',
          padding: { top: 40, right: 20, bottom: 40, left: 20 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          borderRadius: 8,
        },
        layout: {
          width: 'full',
          alignment: 'center',
          responsive: {
            mobile: { width: 'full', alignment: 'center', responsive: {} as any },
            tablet: { width: 'full', alignment: 'center', responsive: {} as any },
            desktop: { width: 'full', alignment: 'center', responsive: {} as any },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    styling: {
      backgroundColor: '#F5F5F5',
      textColor: '#212121',
      padding: '20px',
      margin: '0',
    },
  },
  {
    id: 'sidebar-layout',
    name: 'Sidebar Layout',
    type: 'sidebar',
    description: 'Layout with sidebar for additional content and navigation',
    thumbnail: 'https://picsum.photos/300/200?random=5',
    blocks: [
      {
        id: '6',
        type: 'newsletter-signup',
        data: {
          title: 'Newsletter Signup',
          description: 'Get the latest news delivered to your inbox',
          placeholder: 'Enter your email',
          buttonText: 'Subscribe',
          layout: 'inline',
          emailProvider: 'firebase',
        },
        styling: {
          backgroundColor: '#FFFFFF',
          textColor: '#212121',
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          borderRadius: 8,
        },
        layout: {
          width: 'third',
          alignment: 'left',
          responsive: {
            mobile: { width: 'full', alignment: 'left', responsive: {} as any },
            tablet: { width: 'third', alignment: 'left', responsive: {} as any },
            desktop: { width: 'third', alignment: 'left', responsive: {} as any },
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    styling: {
      backgroundColor: '#F8F9FA',
      textColor: '#212121',
      padding: '20px',
      margin: '0',
    },
  },
];

// Additional Themes
const newsTheme: Theme = {
  id: 'news-theme',
  name: 'News Theme',
  description: 'Professional news layout with clean typography and structured content',
  version: '1.0.0',
  author: 'Albiz Media',
  thumbnail: 'https://picsum.photos/400/300?random=10',
  previewImages: [
    'https://picsum.photos/800/600?random=11',
    'https://picsum.photos/800/600?random=12',
  ],
  category: 'news',
  isActive: false,
  isDefault: false,
  isCustom: false,
  navbar: {
    ...defaultNavbar,
    id: 'news-navbar',
    name: 'News Navigation',
    styling: {
      ...defaultNavbar.styling,
      backgroundColor: '#1a1a1a',
      textColor: '#FFFFFF',
    },
  },
  heroBanner: {
    ...defaultHeroBanner,
    id: 'news-hero-banner',
    name: 'News Hero Banner',
    config: {
      ...defaultHeroBanner.config,
      heading: 'Latest News',
      subheading: 'Breaking news and updates',
      backgroundImage: 'https://picsum.photos/1200/600?random=13',
    },
  },
  footer: defaultFooter,
  layouts: defaultLayouts,
  styles: {
    ...defaultStyles,
    colors: {
      ...defaultStyles.colors,
      primary: '#1a1a1a',
      secondary: '#dc3545',
      accent: '#ffc107',
    },
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const blogTheme: Theme = {
  id: 'blog-theme',
  name: 'Blog Theme',
  description: 'Modern blog layout with focus on readability and content',
  version: '1.0.0',
  author: 'Albiz Media',
  thumbnail: 'https://picsum.photos/400/300?random=20',
  previewImages: [
    'https://picsum.photos/800/600?random=21',
    'https://picsum.photos/800/600?random=22',
  ],
  category: 'blog',
  isActive: false,
  isDefault: false,
  isCustom: false,
  navbar: {
    ...defaultNavbar,
    id: 'blog-navbar',
    name: 'Blog Navigation',
    styling: {
      ...defaultNavbar.styling,
      backgroundColor: '#FFFFFF',
      textColor: '#2c3e50',
    },
  },
  heroBanner: {
    ...defaultHeroBanner,
    id: 'blog-hero-banner',
    name: 'Blog Hero Banner',
    config: {
      ...defaultHeroBanner.config,
      heading: 'Blog',
      subheading: 'Thoughts, insights, and stories',
      backgroundImage: 'https://picsum.photos/1200/600?random=23',
    },
  },
  footer: defaultFooter,
  layouts: defaultLayouts,
  styles: {
    ...defaultStyles,
    colors: {
      ...defaultStyles.colors,
      primary: '#2c3e50',
      secondary: '#3498db',
      accent: '#e74c3c',
    },
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};


// Default Theme (Active)
const defaultTheme: Theme = {
  id: 'default-theme',
  name: 'Default Theme',
  description: 'Clean and modern default theme with flexible layouts',
  version: '1.0.0',
  author: 'Albiz Media',
  thumbnail: 'https://picsum.photos/400/300?random=1',
  previewImages: [
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
  ],
  category: 'default',
  isActive: true,
  isDefault: true,
  isCustom: false,
  navbar: defaultNavbar,
  heroBanner: defaultHeroBanner,
  footer: defaultFooter,
  layouts: defaultLayouts,
  styles: defaultStyles,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const initialState: ThemesState = {
  themes: [defaultTheme, newsTheme, blogTheme],
  activeTheme: defaultTheme,
  customizations: [],
  isLoading: false,
  error: null,
};

let lastId = initialState.themes.length;

const themesSlice = createSlice({
  name: 'themes',
  initialState,
  reducers: {
    setActiveTheme: (state, action: PayloadAction<string>) => {
      const themeId = action.payload;
      const theme = state.themes.find(t => t.id === themeId);
      if (theme) {
        // Deactivate current active theme
        state.themes.forEach(t => t.isActive = false);
        // Activate new theme
        theme.isActive = true;
        state.activeTheme = theme;
      }
    },
    addTheme: (state, action: PayloadAction<Omit<Theme, 'id' | 'createdAt' | 'updatedAt'>>) => {
      lastId++;
      const newTheme: Theme = {
        ...action.payload,
        id: `theme-${lastId}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.themes.push(newTheme);
    },
    updateTheme: (state, action: PayloadAction<Partial<Theme> & Pick<Theme, 'id'>>) => {
      const index = state.themes.findIndex(theme => theme.id === action.payload.id);
      if (index !== -1) {
        state.themes[index] = { 
          ...state.themes[index], 
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    deleteTheme: (state, action: PayloadAction<string>) => {
      const themeId = action.payload;
      const theme = state.themes.find(t => t.id === themeId);
      // Prevent deletion of default theme
      if (theme && !theme.isDefault) {
        state.themes = state.themes.filter(theme => theme.id !== themeId);
        // If deleted theme was active, set default theme as active
        if (theme.isActive) {
          const defaultTheme = state.themes.find(t => t.isDefault);
          if (defaultTheme) {
            defaultTheme.isActive = true;
            state.activeTheme = defaultTheme;
          }
        }
      }
    },
    addCustomization: (state, action: PayloadAction<Omit<ThemeCustomization, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newCustomization: ThemeCustomization = {
        ...action.payload,
        id: `customization-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.customizations.push(newCustomization);
    },
    updateCustomization: (state, action: PayloadAction<Partial<ThemeCustomization> & Pick<ThemeCustomization, 'id'>>) => {
      const index = state.customizations.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customizations[index] = { 
          ...state.customizations[index], 
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setActiveTheme, 
  addTheme, 
  updateTheme, 
  deleteTheme, 
  addCustomization, 
  updateCustomization,
  setLoading,
  setError
} = themesSlice.actions;

export const selectAllThemes = (state: RootState) => state.themes.themes;
export const selectActiveTheme = (state: RootState) => state.themes.activeTheme;
export const selectThemeById = (state: RootState, themeId: string) => 
  state.themes.themes.find(theme => theme.id === themeId);
export const selectThemesByCategory = (state: RootState, category: ThemeCategory) => 
  state.themes.themes.filter(theme => theme.category === category);
export const selectThemeCustomizations = (state: RootState) => state.themes.customizations;
export const selectThemesLoading = (state: RootState) => state.themes.isLoading;
export const selectThemesError = (state: RootState) => state.themes.error;

export default themesSlice.reducer;
