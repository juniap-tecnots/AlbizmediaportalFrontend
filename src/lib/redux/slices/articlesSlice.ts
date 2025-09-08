
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type BlockType = 'paragraph' | 'heading' | 'list' | 'quote' | 'image' | 'gallery';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  blocks: Block[];
  status: 'Draft' | 'Published' | 'Archived' | 'Scheduled';
  author: string;
  categories: string[];
  tags: string[];
  date: string;
  visibility: 'public' | 'private' | 'password';
  excerpt: string;
  featuredImage: string;
  discussion: 'Open' | 'Closed';
}

interface ArticlesState {
  articles: Article[];
}

const initialState: ArticlesState = {
  articles: [
    {
        id: '1',
        title: "Global Update",
        subtitle: "A look at what's happening around the world.",
        slug: 'global-update',
        author: "albiz",
        categories: ["Uncategorized"],
        tags: [],
        date: "2025/09/01 at 6:07 am",
        status: "Published",
        content: 'This is the content for Global Update.',
        blocks: [],
        visibility: 'public',
        excerpt: 'A brief summary of global events and news.',
        featuredImage: 'https://picsum.photos/600/400?random=1',
        discussion: 'Open',
    },
    {
        id: '2',
        title: "One swallow does not make the spring",
        subtitle: "Exploring the meaning behind the famous proverb.",
        slug: 'one-swallow-does-not-make-the-spring',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Games"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        content: 'This is the content for One swallow does not make the spring.',
        blocks: [],
        visibility: 'public',
        excerpt: 'Delving into the wisdom of ancient sayings.',
        featuredImage: 'https://picsum.photos/600/400?random=2',
        discussion: 'Open',
    },
    {
        id: '3',
        title: "Tip of the day: That man again",
        subtitle: "A daily tip to improve your productivity.",
        slug: 'tip-of-the-day-that-man-again',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Team"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        content: 'This is the content for Tip of the day: That man again.',
        blocks: [],
        visibility: 'public',
        excerpt: 'A small piece of advice to make your day better.',
        featuredImage: 'https://picsum.photos/600/400?random=3',
        discussion: 'Open',
    },
    {
        id: '4',
        title: "Hibs and Ross County fans on final",
        subtitle: "The latest news on the upcoming final match.",
        slug: 'hibs-and-ross-county-fans-on-final',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Color"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        content: 'This is the content for Hibs and Ross County fans on final.',
        blocks: [],
        visibility: 'public',
        excerpt: 'Updates, predictions, and fan reactions for the big game.',
        featuredImage: 'https://picsum.photos/600/400?random=4',
        discussion: 'Open',
    },
    {
        id: '5',
        title: "Persuasion is often more effectual than force",
        subtitle: "The art of influence and negotiation.",
        slug: 'persuasion-is-often-more-effectual-than-force',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Content"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        content: 'This is the content for Persuasion is often more effectual than force.',
        blocks: [],
        visibility: 'public',
        excerpt: 'Learn how to win arguments and influence people without confrontation.',
        featuredImage: 'https://picsum.photos/600/400?random=5',
        discussion: 'Open',
    },
     {
        id: '6',
        title: "Archived Post Example",
        subtitle: "This is a subtitle for the archived post.",
        slug: 'archived-post-example',
        author: "albiz",
        categories: ["World"],
        tags: ["Old-News"],
        date: "2024/01/15 at 3:30 pm",
        status: "Archived",
        content: 'This is a sample archived post.',
        blocks: [],
        visibility: 'public',
        excerpt: 'An example of an excerpt for an archived article.',
        featuredImage: 'https://picsum.photos/600/400?random=6',
        discussion: 'Closed',
      },
      {
        id: '7',
        title: "Draft Post Example",
        subtitle: "This is a subtitle for the draft.",
        slug: 'draft-post-example',
        author: "albiz",
        categories: ["Tech"],
        tags: ["Drafting"],
        date: "2025/09/02 at 10:00 am",
        status: "Draft",
        content: 'This is a sample draft.',
        blocks: [],
        visibility: 'public',
        excerpt: 'An excerpt for the draft post goes here.',
        featuredImage: 'https://picsum.photos/600/400?random=7',
        discussion: 'Open',
      },
      {
        id: '8',
        title: "Scheduled Post Example",
        subtitle: "A subtitle for the scheduled article.",
        slug: 'scheduled-post-example',
        author: "albiz",
        categories: ["Business"],
        tags: ["Planning"],
        date: "2025/10/01 at 9:00 am",
        status: "Scheduled",
        content: 'This is a sample scheduled post.',
        blocks: [],
        visibility: 'public',
        excerpt: 'This excerpt is for a post that is scheduled to be published later.',
        featuredImage: 'https://picsum.photos/600/400?random=8',
        discussion: 'Open',
      },
  ],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<Omit<Article, 'id' | 'date' | 'author'>>) => {
      const newArticle: Article = {
        ...action.payload,
        id: (state.articles.length + 1).toString(),
        date: new Date().toISOString(),
        author: 'albiz', 
      };
      state.articles.push(newArticle);
    },
    updateArticle: (state, action: PayloadAction<Article>) => {
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
            state.articles[index] = action.payload;
        }
    },
    deleteArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(article => article.id !== action.payload);
    },
  },
});

export const { addArticle, updateArticle, deleteArticle } = articlesSlice.actions;

export const selectAllArticles = (state: RootState) => state.articles.articles;
export const selectArticleById = (state: RootState, articleId: string) => state.articles.articles.find(article => article.id === articleId);
export const selectPublishedArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Published');
export const selectDraftArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Draft');
export const selectScheduledArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Scheduled');
export const selectArchivedArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Archived');


export default articlesSlice.reducer;
