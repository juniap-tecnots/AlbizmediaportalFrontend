
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Comment {
  user: string;
  message: string;
  time: string;
}

export type TaskStatus = 'Pending' | 'Approved' | 'Rejected' | 'In Progress';
export type TaskPriority = 'High' | 'Medium' | 'Low';

interface Task {
  taskId: string;
  stage: string;
  assignedTo: string;
  assignedRole: string;
  priority: TaskPriority;
  dueDate: string;
  status: TaskStatus;
  comments: Comment[];
}

export interface WorkflowInstance {
  instanceId: string;
  contentId: string;
  contentType: 'Article' | 'Video' | 'Infographic';
  title: string;
  currentStage: string;
  status: TaskStatus;
  tasks: Task[];
}

interface WorkflowQueueState {
  workflows: WorkflowInstance[];
}

const initialState: WorkflowQueueState = {
  workflows: [
    {
      "instanceId": "wf_001",
      "contentId": "art_123",
      "contentType": "Article",
      "title": "AI Trends 2025",
      "currentStage": "Editor Review",
      "status": "Pending",
      "tasks": [
        {
          "taskId": "task_001",
          "stage": "Editor Review",
          "assignedTo": "John Doe",
          "assignedRole": "Editor",
          "priority": "High",
          "dueDate": new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
          "status": "Pending",
          "comments": [
            {"user": "editor_01", "message": "Check references", "time": "2025-09-09T10:00:00Z"}
          ]
        },
        {
          "taskId": "task_002",
          "stage": "Legal Approval",
          "assignedTo": "Jane Smith",
          "assignedRole": "Legal",
          "priority": "Medium",
          "dueDate": new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
          "status": "Pending",
          "comments": []
        }
      ]
    },
    {
      "instanceId": "wf_002",
      "contentId": "vid_456",
      "contentType": "Video",
      "title": "The Future of Renewable Energy",
      "currentStage": "Final Approval",
      "status": "In Progress",
      "tasks": [
        {
          "taskId": "task_003",
          "stage": "Final Approval",
          "assignedTo": "Admin User",
          "assignedRole": "Admin",
          "priority": "Low",
          "dueDate": new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
          "status": "Pending",
          "comments": []
        }
      ]
    },
     {
      "instanceId": "wf_003",
      "contentId": "art_789",
      "contentType": "Article",
      "title": "Quantum Computing Explained",
      "currentStage": "Expert Review",
      "status": "Pending",
      "tasks": [
        {
          "taskId": "task_004",
          "stage": "Expert Review",
          "assignedTo": "Dr. Emily Carter",
          "assignedRole": "Expert",
          "priority": "High",
          "dueDate": new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago (overdue)
          "status": "Pending",
          "comments": []
        }
      ]
    }
  ]
};

const workflowQueueSlice = createSlice({
  name: 'workflowQueue',
  initialState,
  reducers: {
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatus }>) => {
      const { taskId, status } = action.payload;
      for (const workflow of state.workflows) {
        const task = workflow.tasks.find(t => t.taskId === taskId);
        if (task) {
          task.status = status;
          break;
        }
      }
    },
  },
});

export const { updateTaskStatus } = workflowQueueSlice.actions;

export const selectAllWorkflowTasks = (state: RootState) => {
    return state.workflowQueue.workflows.flatMap(wf => 
        wf.tasks.map(task => ({
            ...task,
            contentId: wf.contentId,
            contentType: wf.contentType,
            title: wf.title,
        }))
    );
}

export default workflowQueueSlice.reducer;
