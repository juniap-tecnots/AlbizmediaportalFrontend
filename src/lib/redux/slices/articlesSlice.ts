'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type BlockType = 'paragraph' | 'heading' | 'list' | 'quote' | 'image' | 'gallery';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  blocks: Block[];
  status: 'Draft' | 'Published' | 'Archived' | 'Scheduled';
  author: string;
  categories: string[];
  tags: string[];
  date: string;
  visibility: 'public' | 'private' | 'password';
  excerpt: string;
  featuredImage: string;
}

interface ArticlesState {
  articles: Article[];
}

const initialState: ArticlesState = {
  articles: [
    {
        id: '1',
        title: "Global Update",
        slug: 'global-update',
        author: "albiz",
        categories: ["Uncategorized"],
        tags: [],
        date: "2025/09/01 at 6:07 am",
        status: "Published",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
    },
    {
        id: '2',
        title: "One swallow does not make the spring",
        slug: 'one-swallow-does-not-make-the-spring',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Games"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
    },
    {
        id: '3',
        title: "Tip of the day: That man again",
        slug: 'tip-of-the-day-that-man-again',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Team"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
    },
    {
        id: '4',
        title: "Hibs and Ross County fans on final",
        slug: 'hibs-and-ross-county-fans-on-final',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Color"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
    },
    {
        id: '5',
        title: "Persuasion is often more effectual than force",
        slug: 'persuasion-is-often-more-effectual-than-force',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Content"],
        date: "2025/09/01 at 5:40 am",
        status: "Published",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
    },
     {
        id: '6',
        title: "Archived Post Example",
        slug: 'archived-post-example',
        author: "albiz",
        categories: ["World"],
        tags: ["Old-News"],
        date: "2024/01/15 at 3:30 pm",
        status: "Archived",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
      },
      {
        id: '7',
        title: "Draft Post Example",
        slug: 'draft-post-example',
        author: "albiz",
        categories: ["Tech"],
        tags: ["Drafting"],
        date: "2025/09/02 at 10:00 am",
        status: "Draft",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
      },
      {
        id: '8',
        title: "Scheduled Post Example",
        slug: 'scheduled-post-example',
        author: "albiz",
        categories: ["Business"],
        tags: ["Planning"],
        date: "2025/10/01 at 9:00 am",
        status: "Scheduled",
        blocks: [],
        visibility: 'public',
        excerpt: '',
        featuredImage: ''
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
    deleteArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(article => article.id !== action.payload);
    },
  },
});

export const { addArticle, deleteArticle } = articlesSlice.actions;

export const selectAllArticles = (state: RootState) => state.articles.articles;
export const selectPublishedArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Published');
export const selectDraftArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Draft');
export const selectScheduledArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Scheduled');
export const selectArchivedArticles = (state: RootState) => state.articles.articles.filter(a => a.status === 'Archived');


export default articlesSlice.reducer;
