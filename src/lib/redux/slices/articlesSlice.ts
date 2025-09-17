
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type BlockType = 'paragraph' | 'heading' | 'list' | 'quote' | 'image' | 'gallery';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

export type ArticleStatus = 
  | 'IN_PROGRESS'
  | 'SUBMITTED_FOR_REVIEW'
  | 'PENDING_REVIEW'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'COPY_EDIT'
  | 'FACT_CHECK'
  | 'READY_TO_PUBLISH'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'COMPLETED'
  | 'RETURNED_TO_AUTHOR'
  | 'RESUBMITTED'
  | 'ON_HOLD'
  | 'ARCHIVED'
  | 'KILLED';


export interface Article {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  content: string;
  blocks: Block[];
  status: ArticleStatus;
  author: string;
  categories: string[];
  tags: string[];
  date: string;
  visibility: 'public' | 'private' | 'password';
  excerpt: string;
  featuredImage: string;
  discussion: 'Open' | 'Closed';
  themeTemplate?: string;
  assignedEditor?: string;
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
        date: "2025-09-01T06:07:00Z",
        status: "PUBLISHED",
        content: 'This is the content for Global Update.',
        blocks: [],
        visibility: 'public',
        excerpt: 'A brief summary of global events and news.',
        featuredImage: 'https://picsum.photos/600/400?random=1',
        discussion: 'Open',
        assignedEditor: 'Liam Smith'
    },
    {
        id: '2',
        title: "One swallow does not make the spring",
        subtitle: "Exploring the meaning behind the famous proverb.",
        slug: 'one-swallow-does-not-make-the-spring',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Games"],
        date: "2025-09-01T05:40:00Z",
        status: "PUBLISHED",
        content: 'This is the content for One swallow does not make the spring.',
        blocks: [],
        visibility: 'public',
        excerpt: 'Delving into the wisdom of ancient sayings.',
        featuredImage: 'https://picsum.photos/600/400?random=2',
        discussion: 'Open',
        assignedEditor: 'Ava Davis'
    },
    {
        id: '3',
        title: "Tip of the day: That man again",
        subtitle: "A daily tip to improve your productivity.",
        slug: 'tip-of-the-day-that-man-again',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Team"],
        date: "2025-09-01T05:40:00Z",
        status: "PUBLISHED",
        content: 'This is the content for Tip of the day: That man again.',
        blocks: [],
        visibility: 'public',
        excerpt: 'A small piece of advice to make your day better.',
        featuredImage: 'https://picsum.photos/600/400?random=3',
        discussion: 'Open',
        assignedEditor: 'Liam Smith'
    },
    {
        id: '4',
        title: "Hibs and Ross County fans on final",
        subtitle: "The latest news on the upcoming final match.",
        slug: 'hibs-and-ross-county-fans-on-final',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Color"],
        date: "2025-09-01T05:40:00Z",
        status: "PUBLISHED",
        content: 'This is the content for Hibs and Ross County fans on final.',
        blocks: [],
        visibility: 'public',
        excerpt: 'Updates, predictions, and fan reactions for the big game.',
        featuredImage: 'https://picsum.photos/600/400?random=4',
        discussion: 'Open',
        assignedEditor: 'Ava Davis'
    },
    {
        id: '5',
        title: "Persuasion is often more effectual than force",
        subtitle: "The art of influence and negotiation.",
        slug: 'persuasion-is-often-more-effectual-than-force',
        author: "albiz",
        categories: ["Life Style"],
        tags: ["Content"],
        date: "2025-09-01T05:40:00Z",
        status: "PUBLISHED",
        content: 'This is the content for Persuasion is often more effectual than force.',
        blocks: [],
        visibility: 'public',
        excerpt: 'Learn how to win arguments and influence people without confrontation.',
        featuredImage: 'https://picsum.photos/600/400?random=5',
        discussion: 'Open',
        assignedEditor: 'Liam Smith'
    },
     {
        id: '6',
        title: "Archived Post Example",
        subtitle: "This is a subtitle for the archived post.",
        slug: 'archived-post-example',
        author: "albiz",
        categories: ["World"],
        tags: ["Old-News"],
        date: "2024-01-15T15:30:00Z",
        status: "ARCHIVED",
        content: 'This is a sample archived post.',
        blocks: [],
        visibility: 'public',
        excerpt: 'An example of an excerpt for an archived article.',
        featuredImage: 'https://picsum.photos/600/400?random=6',
        discussion: 'Closed',
        assignedEditor: 'Ava Davis'
      },
      {
        id: '7',
        title: "Draft Post Example",
        subtitle: "This is a subtitle for the draft.",
        slug: 'draft-post-example',
        author: "albiz",
        categories: ["Tech"],
        tags: ["Drafting"],
        date: "2025-09-02T10:00:00Z",
        status: "IN_PROGRESS",
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
        date: "2025-10-01T09:00:00Z",
        status: "SCHEDULED",
        content: 'This is a sample scheduled post.',
        blocks: [],
        visibility: 'public',
        excerpt: 'This excerpt is for a post that is scheduled to be published later.',
        featuredImage: 'https://picsum.photos/600/400?random=8',
        discussion: 'Open',
        assignedEditor: 'Liam Smith'
      },
      {
        id: '9',
        title: "Submitted for Review Example",
        subtitle: "This article has been submitted for editorial review.",
        slug: 'submitted-for-review-example',
        author: "albiz",
        categories: ["Tech"],
        tags: ["Review"],
        date: "2025-09-03T14:30:00Z",
        status: "SUBMITTED_FOR_REVIEW",
        content: 'This article is waiting for editorial review.',
        blocks: [],
        visibility: 'public',
        excerpt: 'An article that has been submitted and is awaiting review.',
        featuredImage: 'https://picsum.photos/600/400?random=9',
        discussion: 'Open',
      },
      {
        id: '10',
        title: "Under Review Example",
        subtitle: "This article is currently being reviewed by an editor.",
        slug: 'under-review-example',
        author: "albiz",
        categories: ["News"],
        tags: ["Editorial"],
        date: "2025-09-03T16:45:00Z",
        status: "UNDER_REVIEW",
        content: 'This article is actively being reviewed.',
        blocks: [],
        visibility: 'public',
        excerpt: 'An article currently under editorial review.',
        featuredImage: 'https://picsum.photos/600/400?random=10',
        discussion: 'Open',
        assignedEditor: 'Ava Davis'
      },
      {
        id: '11',
        title: "Copy Edit Example",
        subtitle: "This article is in the copy editing phase.",
        slug: 'copy-edit-example',
        author: "albiz",
        categories: ["Education"],
        tags: ["Copy-Edit"],
        date: "2025-09-04T10:15:00Z",
        status: "COPY_EDIT",
        content: 'This article is being copy edited for grammar and style.',
        blocks: [],
        visibility: 'public',
        excerpt: 'An article in the copy editing phase.',
        featuredImage: 'https://picsum.photos/600/400?random=11',
        discussion: 'Open',
        assignedEditor: 'Liam Smith'
      },
  ],
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<Omit<Article, 'id' | 'date' | 'author' | 'status'>>) => {
      const newArticle: Article = {
        ...action.payload,
        id: (state.articles.length + 1).toString(),
        date: new Date().toISOString(),
        author: 'albiz',
        status: 'SUBMITTED_FOR_REVIEW',
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

export const selectAllArticles = (state: any) => state.articles.articles;
export const selectArticleById = (state: any, articleId: string) => state.articles.articles.find((article: any) => article.id === articleId);
export const selectPublishedArticles = (state: any) => state.articles.articles.filter((a: any) => a.status === 'PUBLISHED');
export const selectDraftArticles = (state: any) => state.articles.articles.filter((a: any) => a.status === 'IN_PROGRESS');
export const selectScheduledArticles = (state: any) => state.articles.articles.filter((a: any) => a.status === 'SCHEDULED');
export const selectArchivedArticles = (state: any) => state.articles.articles.filter((a: any) => a.status === 'ARCHIVED');
export const selectSubmittedArticles = (state: any) => state.articles.articles.filter((a: any) => a.status === 'SUBMITTED_FOR_REVIEW');
export const selectPendingReviewArticles = (state: any) => state.articles.articles.filter((a: any) => a.status === 'PENDING_REVIEW');
export const selectUnderReviewArticles = (state: any) => state.articles.articles.filter((a: any) => a.status === 'UNDER_REVIEW');

// Helper function to format status display text
export const formatStatusDisplay = (status: ArticleStatus): string => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'SUBMITTED_FOR_REVIEW':
      return 'Submitted for Review';
    case 'PENDING_REVIEW':
      return 'Pending Review';
    case 'UNDER_REVIEW':
      return 'Under Review';
    case 'APPROVED':
      return 'Approved';
    case 'REJECTED':
      return 'Rejected';
    case 'COPY_EDIT':
      return 'Copy Edit';
    case 'FACT_CHECK':
      return 'Fact Check';
    case 'READY_TO_PUBLISH':
      return 'Ready to Publish';
    case 'SCHEDULED':
      return 'Scheduled';
    case 'PUBLISHED':
      return 'Published';
    case 'COMPLETED':
      return 'Completed';
    case 'RETURNED_TO_AUTHOR':
      return 'Returned to Author';
    case 'RESUBMITTED':
      return 'Resubmitted';
    case 'ON_HOLD':
      return 'On Hold';
    case 'ARCHIVED':
      return 'Archived';
    case 'KILLED':
      return 'Killed';
    default:
      return status;
  }
};

export default articlesSlice.reducer;
