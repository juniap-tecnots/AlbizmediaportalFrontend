
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface WorkflowStep {
  id: number;
  name: string;
}

interface ArticleInQueue {
    id: number;
    title: string;
    author: string;
    submitted: string;
    status: 'Pending' | 'Approved' | 'Rejected';
}

interface WorkflowState {
    steps: WorkflowStep[];
    articles: ArticleInQueue[];
    activeStep: number;
}

const initialState: WorkflowState = {
  steps: [
    { id: 1, name: 'Editorial Review' },
    { id: 2, name: 'Publishing' },
    { id: 3, name: 'Live' }
  ],
  articles: [
    { id: 1, title: 'The Future of AI in Journalism', author: 'Jane Doe', submitted: '2024-05-10T00:00:00Z', status: 'Pending' },
    { id: 2, title: 'City Council Approves New Budget', author: 'John Smith', submitted: '2024-05-09T00:00:00Z', status: 'Approved' },
    { id: 3, title: 'Tech Stocks Rally on Positive News', author: 'Emily White', submitted: '2024-05-08T00:00:00Z', status: 'Rejected' },
  ],
  activeStep: 1,
};

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    nextStep: (state) => {
        if (state.activeStep < state.steps.length) {
            state.activeStep += 1;
        }
    },
    prevStep: (state) => {
        if (state.activeStep > 1) {
            state.activeStep -= 1;
        }
    }
  },
});

export const { nextStep, prevStep } = workflowSlice.actions;

export const selectWorkflowSteps = (state: RootState) => state.workflow.steps;
export const selectArticlesInQueue = (state: RootState) => state.workflow.articles;
export const selectActiveStep = (state: RootState) => state.workflow.activeStep;


export default workflowSlice.reducer;
