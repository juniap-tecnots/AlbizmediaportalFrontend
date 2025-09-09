
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AuditLog {
    id: string;
    instanceId: string;
    taskId: string;
    user: string;
    action: 'Approve' | 'Reject' | 'Comment' | 'Reassign' | 'Start';
    stage: string;
    payload: {
        comment?: string;
        reassignedTo?: string;
    };
    createdAt: string;
}

interface WorkflowAuditState {
  logs: AuditLog[];
}

const initialState: WorkflowAuditState = {
  logs: [
    {
      id: 'audit_001',
      instanceId: 'wf_001',
      taskId: 'task_001',
      user: 'Author One',
      action: 'Start',
      stage: 'Draft',
      payload: { comment: 'Workflow initiated for "AI Trends 2025"' },
      createdAt: '2025-09-08T10:00:00Z',
    },
    {
      id: 'audit_002',
      instanceId: 'wf_001',
      taskId: 'task_001',
      user: 'John Doe',
      action: 'Comment',
      stage: 'Editor Review',
      payload: { comment: 'Check references on page 3.' },
      createdAt: '2025-09-09T10:00:00Z',
    },
    {
      id: 'audit_003',
      instanceId: 'wf_002',
      taskId: 'task_003',
      user: 'Author Two',
      action: 'Start',
      stage: 'Draft',
      payload: { comment: 'Workflow initiated for "The Future of Renewable Energy"' },
      createdAt: '2025-09-10T11:00:00Z',
    },
    {
      id: 'audit_004',
      instanceId: 'wf_003',
      taskId: 'task_004',
      user: 'Dr. Emily Carter',
      action: 'Reject',
      stage: 'Expert Review',
      payload: { comment: 'Inaccurate data presented in the quantum mechanics section.' },
      createdAt: '2025-09-11T14:30:00Z',
    },
  ],
};

const workflowAuditSlice = createSlice({
  name: 'workflowAudit',
  initialState,
  reducers: {
    addAuditLog: (state, action: PayloadAction<Omit<AuditLog, 'id' | 'createdAt'>>) => {
        const newLog: AuditLog = {
            ...action.payload,
            id: `audit_${state.logs.length + 1}`,
            createdAt: new Date().toISOString(),
        }
        state.logs.push(newLog);
    }
  },
});

export const { addAuditLog } = workflowAuditSlice.actions;

export const selectAllWorkflowAudits = (state: RootState) => state.workflowAudit.logs;

export default workflowAuditSlice.reducer;
