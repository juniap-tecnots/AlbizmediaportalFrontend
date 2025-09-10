
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


export interface WorkflowStage {
    id: string;
    name: string;
    assignedRoles: string[];
    slaHours: number;
}

export interface WorkflowTemplate {
    id: string;
    name: string;
    contentType: 'Article' | 'Video' | 'Infographic' | string[];
    version: number;
    lastModified: string;
    stages: WorkflowStage[];
}

interface WorkflowTemplatesState {
  templates: WorkflowTemplate[];
}

const initialState: WorkflowTemplatesState = {
  templates: [
    {
      id: 'template_001',
      name: 'Standard Article Workflow',
      contentType: 'Article',
      version: 2,
      lastModified: '2025-08-15T00:00:00Z',
      stages: [
        { id: 'stage_001', name: 'Draft', assignedRoles: ['Author'], slaHours: 0 },
        { id: 'stage_002', name: 'Editor Review', assignedRoles: ['Editor'], slaHours: 24 },
        { id: 'stage_003', name: 'Legal Review', assignedRoles: ['Legal'], slaHours: 48 },
        { id: 'stage_004', name: 'Final Approval', assignedRoles: ['Admin'], slaHours: 8 },
        { id: 'stage_005', name: 'Publish', assignedRoles: ['Publisher'], slaHours: 0 },
      ],
    },
    {
      id: 'template_002',
      name: 'Video Content Workflow',
      contentType: 'Video',
      version: 1,
      lastModified: '2025-07-20T00:00:00Z',
      stages: [
        { id: 'stage_101', name: 'Draft', assignedRoles: ['Producer'], slaHours: 0 },
        { id: 'stage_102', name: 'Compliance Check', assignedRoles: ['Compliance'], slaHours: 72 },
        { id: 'stage_103', name: 'Final Approval', assignedRoles: ['Admin'], slaHours: 24 },
        { id: 'stage_104', name: 'Publish', assignedRoles: ['Publisher'], slaHours: 0 },
      ],
    },
    {
      id: 'template_003',
      name: 'Sponsored Content Workflow',
      contentType: 'Article',
      version: 3,
      lastModified: '2025-09-01T00:00:00Z',
      stages: [
        { id: 'stage_201', name: 'Draft', assignedRoles: ['Author'], slaHours: 0 },
        { id: 'stage_202', name: 'Sponsor Review', assignedRoles: ['Sponsor'], slaHours: 120 },
        { id: 'stage_203', name: 'Legal Review', assignedRoles: ['Legal'], slaHours: 48 },
        { id: 'stage_204', name: 'Final Approval', assignedRoles: ['Admin'], slaHours: 24 },
        { id: 'stage_205', name: 'Publish', assignedRoles: ['Publisher'], slaHours: 0 },
      ],
    },
  ],
};

const workflowTemplatesSlice = createSlice({
  name: 'workflowTemplates',
  initialState,
  reducers: {
    addTemplate: (state, action: PayloadAction<Omit<WorkflowTemplate, 'id'>>) => {
        const newTemplate: WorkflowTemplate = {
            ...action.payload,
            id: `template_${state.templates.length + 1}`
        };
        state.templates.push(newTemplate);
    }
  },
});

export const { addTemplate } = workflowTemplatesSlice.actions;

export const selectAllWorkflowTemplates = (state: RootState) => state.workflowTemplates.templates;

export default workflowTemplatesSlice.reducer;
