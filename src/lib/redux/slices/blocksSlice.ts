'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Enhanced Block Types based on specification
export type BlockType = 
  // News & Articles
  | 'hero-banner'
  | 'article-feed'
  | 'featured-article'
  | 'special-day-timeline'
  // Curated Content
  | 'top-places'
  | 'events-calendar'
  | 'food-restaurant'
  // Profiles
  | 'profile-cards'
  | 'team-author-spotlight'
  // Monetization
  | 'subscription-plans'
  | 'ad-slot'
  | 'sponsored-content'
  // Engagement & Community
  | 'newsletter-signup'
  | 'discussion-comments'
  | 'polls-surveys'
  // Generic UI
  | 'text'
  | 'image'
  | 'video-podcast'
  | 'carousel-slider'
  | 'call-to-action'
  // Legacy (keep existing)
  | 'paragraph'
  | 'heading'
  | 'list'
  | 'quote'
  | 'gallery';

// Block Configuration Interfaces
export interface BlockConfig {
  id: string;
  type: BlockType;
  data: Record<string, any>;
  styling: BlockStyling;
  layout: BlockLayout;
  createdAt: string;
  updatedAt: string;
}

export interface BlockStyling {
  backgroundColor?: string;
  textColor?: string;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  borderRadius?: number;
  customCSS?: string;
}

export interface BlockLayout {
  width: 'full' | 'half' | 'third' | 'quarter';
  alignment: 'left' | 'center' | 'right';
  responsive: {
    mobile: BlockLayout;
    tablet: BlockLayout;
    desktop: BlockLayout;
  };
}

// Specific Block Data Interfaces
export interface HeroBannerData {
  heading: string;
  subheading?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  ctaButton?: {
    label: string;
    link: string;
  };
  textAlignment: 'left' | 'center' | 'right';
  overlay: 'solid' | 'gradient' | 'transparent';
  height: 'small' | 'medium' | 'fullscreen';
}

export interface ArticleFeedData {
  source: 'latest' | 'trending' | 'category' | 'tagged';
  category?: string;
  tags?: string[];
  limit: number;
  showExcerpt: boolean;
  layout: 'grid' | 'list' | 'carousel' | 'masonry';
  columns: 1 | 2 | 3 | 4;
  imageRatio: '16:9' | '4:3' | 'square';
}

export interface FeaturedArticleData {
  articleId: string;
  headlineOverride?: string;
  layout: 'card' | 'banner' | 'split';
  showImage: boolean;
  showExcerpt: boolean;
}

export interface TextData {
  heading?: string;
  content: string;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  alignment: 'left' | 'center' | 'right';
  fontSize: 'small' | 'medium' | 'large';
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
}

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  link?: string;
  size: 'small' | 'medium' | 'large' | 'full';
  alignment: 'left' | 'center' | 'right';
  borderRadius?: number;
}

export interface CallToActionData {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  backgroundImage?: string;
  alignment: 'left' | 'center' | 'right';
  buttonStyle: 'primary' | 'secondary' | 'outline';
}

export interface NewsletterSignupData {
  title: string;
  description?: string;
  placeholder: string;
  buttonText: string;
  layout: 'inline' | 'modal' | 'full-width';
  emailProvider: 'firebase' | 'mailchimp' | 'custom';
}

export interface ProfileCardsData {
  source: 'leaders' | 'investors' | 'influencers' | 'custom';
  profileIds?: string[];
  limit: number;
  layout: 'grid' | 'carousel' | 'directory-list';
  showVerificationBadge: boolean;
}

export interface TopPlacesData {
  placeIds?: string[];
  manualPlaces?: Array<{
    title: string;
    description: string;
    image: string;
    mapLink?: string;
  }>;
  layout: 'grid' | 'list' | 'card-slider';
  imageRatio: 'square' | 'portrait' | 'landscape';
  showMapLink: boolean;
}

export interface EventsCalendarData {
  source: 'upcoming' | 'category';
  categoryFilter?: string;
  limit: number;
  layout: 'calendar' | 'list' | 'slider';
  colorTheme: Record<string, string>;
}

export interface FoodRestaurantData {
  restaurantIds?: string[];
  cuisineFilter?: string[];
  layout: 'grid' | 'list';
  showRating: boolean;
  showPriceRange: boolean;
}

export interface SubscriptionPlansData {
  plans: Array<{
    name: string;
    price: string;
    features: string[];
    ctaLink: string;
    highlighted?: boolean;
  }>;
  layout: 'pricing-table' | 'stacked-cards';
  highlightBestValue: boolean;
}

export interface AdSlotData {
  adType: 'image' | 'video' | 'embed-script';
  content: string; // URL or script
  targetUrl?: string;
  placement: 'inline' | 'sidebar' | 'full-banner';
  trackingId?: string;
}

export interface SponsoredContentData {
  articleIds: string[];
  label: string;
  layout: 'grid' | 'list' | 'carousel';
}

export interface DiscussionCommentsData {
  linkedContentId: string;
  layout: 'threaded-list' | 'simple-list';
  allowReplies: boolean;
  allowLikes: boolean;
}

export interface PollsSurveysData {
  question: string;
  options: string[];
  allowMultipleChoice: boolean;
  layout: 'horizontal-bar' | 'pie-chart' | 'list';
  showResults: boolean;
}

export interface VideoPodcastData {
  url: string;
  type: 'video' | 'audio';
  autoplay: boolean;
  showControls: boolean;
  aspectRatio: '16:9' | '4:3' | '1:1';
}

export interface CarouselSliderData {
  items: Array<{
    type: 'image' | 'article' | 'profile';
    content: any;
  }>;
  autoplay: boolean;
  showArrows: boolean;
  showDots: boolean;
  interval: number;
}

// Block Registry for dynamic block management
export interface BlockRegistry {
  [key: string]: {
    component: string;
    configPanel: string;
    defaultData: Record<string, any>;
    defaultStyling: BlockStyling;
    defaultLayout: BlockLayout;
  };
}

interface BlocksState {
  blocks: BlockConfig[];
  blockRegistry: BlockRegistry;
}

const defaultStyling: BlockStyling = {
  backgroundColor: 'transparent',
  textColor: 'inherit',
  padding: { top: 16, right: 16, bottom: 16, left: 16 },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  borderRadius: 0,
};

const defaultLayout: BlockLayout = {
  width: 'full',
  alignment: 'left',
  responsive: {
    mobile: { width: 'full', alignment: 'left', responsive: {} as any },
    tablet: { width: 'full', alignment: 'left', responsive: {} as any },
    desktop: { width: 'full', alignment: 'left', responsive: {} as any },
  },
};

const initialState: BlocksState = {
  blocks: [],
  blockRegistry: {
    'hero-banner': {
      component: 'HeroBannerBlock',
      configPanel: 'HeroBannerConfig',
      defaultData: {
        heading: 'Welcome to Albiz Media',
        subheading: 'Your trusted source for news and information',
        textAlignment: 'center',
        overlay: 'gradient',
        height: 'medium',
      } as HeroBannerData,
      defaultStyling,
      defaultLayout,
    },
    'article-feed': {
      component: 'ArticleFeedBlock',
      configPanel: 'ArticleFeedConfig',
      defaultData: {
        source: 'latest',
        limit: 6,
        showExcerpt: true,
        layout: 'grid',
        columns: 3,
        imageRatio: '16:9',
      } as ArticleFeedData,
      defaultStyling,
      defaultLayout,
    },
    'featured-article': {
      component: 'FeaturedArticleBlock',
      configPanel: 'FeaturedArticleConfig',
      defaultData: {
        articleId: '',
        layout: 'card',
        showImage: true,
        showExcerpt: true,
      } as FeaturedArticleData,
      defaultStyling,
      defaultLayout,
    },
    'text': {
      component: 'TextBlock',
      configPanel: 'TextConfig',
      defaultData: {
        content: 'Enter your text here...',
        headingLevel: 2,
        alignment: 'left',
        fontSize: 'medium',
        fontWeight: 'normal',
      } as TextData,
      defaultStyling,
      defaultLayout,
    },
    'image': {
      component: 'ImageBlock',
      configPanel: 'ImageConfig',
      defaultData: {
        src: '',
        alt: '',
        size: 'medium',
        alignment: 'center',
      } as ImageData,
      defaultStyling,
      defaultLayout,
    },
    'call-to-action': {
      component: 'CallToActionBlock',
      configPanel: 'CallToActionConfig',
      defaultData: {
        title: 'Ready to get started?',
        subtitle: 'Join thousands of satisfied customers',
        buttonText: 'Get Started',
        buttonLink: '#',
        alignment: 'center',
        buttonStyle: 'primary',
      } as CallToActionData,
      defaultStyling,
      defaultLayout,
    },
    'newsletter-signup': {
      component: 'NewsletterSignupBlock',
      configPanel: 'NewsletterSignupConfig',
      defaultData: {
        title: 'Subscribe to our newsletter',
        description: 'Get the latest news and updates delivered to your inbox',
        placeholder: 'Enter your email',
        buttonText: 'Subscribe',
        layout: 'inline',
        emailProvider: 'firebase',
      } as NewsletterSignupData,
      defaultStyling,
      defaultLayout,
    },
    'profile-cards': {
      component: 'ProfileCardsBlock',
      configPanel: 'ProfileCardsConfig',
      defaultData: {
        source: 'leaders',
        limit: 6,
        layout: 'grid',
        showVerificationBadge: true,
      } as ProfileCardsData,
      defaultStyling,
      defaultLayout,
    },
    'top-places': {
      component: 'TopPlacesBlock',
      configPanel: 'TopPlacesConfig',
      defaultData: {
        layout: 'grid',
        imageRatio: 'square',
        showMapLink: true,
      } as TopPlacesData,
      defaultStyling,
      defaultLayout,
    },
    'events-calendar': {
      component: 'EventsCalendarBlock',
      configPanel: 'EventsCalendarConfig',
      defaultData: {
        source: 'upcoming',
        limit: 10,
        layout: 'list',
        colorTheme: {},
      } as EventsCalendarData,
      defaultStyling,
      defaultLayout,
    },
    'food-restaurant': {
      component: 'FoodRestaurantBlock',
      configPanel: 'FoodRestaurantConfig',
      defaultData: {
        layout: 'grid',
        showRating: true,
        showPriceRange: true,
      } as FoodRestaurantData,
      defaultStyling,
      defaultLayout,
    },
    'subscription-plans': {
      component: 'SubscriptionPlansBlock',
      configPanel: 'SubscriptionPlansConfig',
      defaultData: {
        plans: [],
        layout: 'pricing-table',
        highlightBestValue: false,
      } as SubscriptionPlansData,
      defaultStyling,
      defaultLayout,
    },
    'ad-slot': {
      component: 'AdSlotBlock',
      configPanel: 'AdSlotConfig',
      defaultData: {
        adType: 'image',
        content: '',
        placement: 'inline',
      } as AdSlotData,
      defaultStyling,
      defaultLayout,
    },
    'sponsored-content': {
      component: 'SponsoredContentBlock',
      configPanel: 'SponsoredContentConfig',
      defaultData: {
        articleIds: [],
        label: 'Sponsored',
        layout: 'grid',
      } as SponsoredContentData,
      defaultStyling,
      defaultLayout,
    },
    'discussion-comments': {
      component: 'DiscussionCommentsBlock',
      configPanel: 'DiscussionCommentsConfig',
      defaultData: {
        linkedContentId: '',
        layout: 'threaded-list',
        allowReplies: true,
        allowLikes: true,
      } as DiscussionCommentsData,
      defaultStyling,
      defaultLayout,
    },
    'polls-surveys': {
      component: 'PollsSurveysBlock',
      configPanel: 'PollsSurveysConfig',
      defaultData: {
        question: 'What do you think?',
        options: ['Option 1', 'Option 2'],
        allowMultipleChoice: false,
        layout: 'horizontal-bar',
        showResults: true,
      } as PollsSurveysData,
      defaultStyling,
      defaultLayout,
    },
    'video-podcast': {
      component: 'VideoPodcastBlock',
      configPanel: 'VideoPodcastConfig',
      defaultData: {
        url: '',
        type: 'video',
        autoplay: false,
        showControls: true,
        aspectRatio: '16:9',
      } as VideoPodcastData,
      defaultStyling,
      defaultLayout,
    },
    'carousel-slider': {
      component: 'CarouselSliderBlock',
      configPanel: 'CarouselSliderConfig',
      defaultData: {
        items: [],
        autoplay: false,
        showArrows: true,
        showDots: true,
        interval: 5000,
      } as CarouselSliderData,
      defaultStyling,
      defaultLayout,
    },
  },
};

let lastId = 0;

const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<Omit<BlockConfig, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const newBlock: BlockConfig = {
        ...action.payload,
        id: (++lastId).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.blocks.push(newBlock);
    },
    updateBlock: (state, action: PayloadAction<Partial<BlockConfig> & Pick<BlockConfig, 'id'>>) => {
      const index = state.blocks.findIndex(block => block.id === action.payload.id);
      if (index !== -1) {
        state.blocks[index] = { 
          ...state.blocks[index], 
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    deleteBlock: (state, action: PayloadAction<string>) => {
      state.blocks = state.blocks.filter(block => block.id !== action.payload);
    },
    reorderBlocks: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const blocks = [...state.blocks];
      const [movedBlock] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, movedBlock);
      state.blocks = blocks;
    },
    duplicateBlock: (state, action: PayloadAction<string>) => {
      const blockToDuplicate = state.blocks.find(block => block.id === action.payload);
      if (blockToDuplicate) {
        const duplicatedBlock: BlockConfig = {
          ...blockToDuplicate,
          id: (++lastId).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        state.blocks.push(duplicatedBlock);
      }
    },
  },
});

export const { 
  addBlock, 
  updateBlock, 
  deleteBlock, 
  reorderBlocks, 
  duplicateBlock 
} = blocksSlice.actions;

export const selectAllBlocks = (state: RootState) => state.blocks.blocks;
export const selectBlockById = (state: RootState, blockId: string) => 
  state.blocks.blocks.find(block => block.id === blockId);
export const selectBlocksByType = (state: RootState, blockType: BlockType) => 
  state.blocks.blocks.filter(block => block.type === blockType);
export const selectBlockRegistry = (state: RootState) => state.blocks.blockRegistry;

export default blocksSlice.reducer;

