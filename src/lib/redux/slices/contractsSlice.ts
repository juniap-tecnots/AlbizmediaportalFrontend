
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type ContractStatus = 'Draft' | 'Pending' | 'Pending Signature' | 'Active' | 'Expired' | 'Terminated';
export type ContractType = 'Author Agreement' | 'Vendor' | 'Sponsorship' | 'NDA' | 'Vendor Agreement' | 'Custom';

export interface Contract {
  id: string;
  title: string;
  partyName: string;
  type: ContractType;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  lastModified: string;
  terms?: string;
  signatories?: string[];
  linkedUserId?: string;
  fileUrl?: string;
}


export interface ContractTemplate {
    id: string;
    name: string;
    type: ContractType;
    defaultTerms: string;
}

interface ContractsState {
  contracts: Contract[];
  templates: ContractTemplate[];
}

const initialState: ContractsState = {
  contracts: [
    {
      id: 'C-1001',
      title: 'Contributor Agreement',
      partyName: 'John Reporter',
      type: 'Author Agreement',
      status: 'Active',
      startDate: '2025-06-01',
      endDate: '2026-06-01',
      lastModified: '2025-09-05',
    },
    {
      id: 'C-1002',
      title: 'Sponsorship Deal',
      partyName: 'ABC Media Co.',
      type: 'Sponsorship',
      status: 'Pending',
      startDate: '2025-09-10',
      endDate: '2026-09-10',
      lastModified: '2025-09-08',
    },
    {
      id: 'C-1003',
      title: 'NDA - Freelance Team',
      partyName: 'Jane Writer',
      type: 'NDA',
      status: 'Expired',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      lastModified: '2024-12-31',
    },
    {
      id: 'C-1004',
      title: 'Vendor Contract',
      partyName: 'PhotoPress',
      type: 'Vendor Agreement',
      status: 'Draft',
      startDate: '2025-09-12',
      endDate: '2026-09-12',
      lastModified: '2025-09-10',
    },
  ],
  templates: [
      { id: 'template_01', name: 'Standard Contributor Agreement', type: 'Author Agreement', defaultTerms: 'Enter standard terms for authors here...' },
      { id: 'template_02', name: 'Standard NDA', type: 'NDA', defaultTerms: 'Enter non-disclosure agreement terms here...' },
      { id: 'template_03', name: 'Basic Sponsorship Deal', type: 'Sponsorship', defaultTerms: 'Enter standard sponsorship terms here...' },
  ]
};

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    addContract: (state, action: PayloadAction<Omit<Contract, 'id'>>) => {
        const newContract: Contract = {
            ...action.payload,
            id: `C-${state.contracts.length + 1001}`
        };
        state.contracts.push(newContract);
    },
    updateContract: (state, action: PayloadAction<Contract>) => {
        const index = state.contracts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
            state.contracts[index] = action.payload;
        }
    },
  },
});

export const { addContract, updateContract } = contractsSlice.actions;

export const selectAllContracts = (state: RootState) => state.contracts.contracts;
export const selectActiveContracts = (state: RootState) => state.contracts.contracts.filter(c => c.status === 'Active');
export const selectExpiredContracts = (state: RootState) => state.contracts.contracts.filter(c => c.status === 'Expired' || c.status === 'Terminated');
export const selectAllContractTemplates = (state: RootState) => state.contracts.templates;


export default contractsSlice.reducer;
