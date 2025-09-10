
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type ContractStatus = 'Draft' | 'Pending Signature' | 'Active' | 'Expired' | 'Terminated';
export type ContractType = 'Author Agreement' | 'Vendor' | 'Sponsorship' | 'NDA';

export interface Contract {
  id: string;
  title: string;
  type: ContractType;
  terms: string;
  validityStartDate: string;
  validityEndDate: string;
  signatories: string[];
  status: ContractStatus;
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
      id: 'contract_001',
      title: 'Contributor Agreement - John Doe',
      type: 'Author Agreement',
      terms: 'Standard contributor terms apply. All content submitted is original and exclusive to Albiz Media for 90 days.',
      validityStartDate: '2024-01-01',
      validityEndDate: '2025-01-01',
      signatories: ['John Doe', 'Admin User'],
      status: 'Active',
      linkedUserId: '2',
    },
    {
      id: 'contract_002',
      title: 'Sponsorship Deal - TechCorp',
      type: 'Sponsorship',
      terms: 'TechCorp will be the exclusive sponsor for the "Future of Tech" series.',
      validityStartDate: '2024-06-01',
      validityEndDate: '2024-12-31',
      signatories: ['TechCorp CEO', 'Admin User'],
      status: 'Active',
    },
    {
      id: 'contract_003',
      title: 'Old Vendor Agreement - StockPhotos Inc.',
      type: 'Vendor',
      terms: 'Agreement for monthly subscription to stock photo service.',
      validityStartDate: '2023-01-01',
      validityEndDate: '2023-12-31',
      signatories: ['StockPhotos Inc.', 'Admin User'],
      status: 'Expired',
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
            id: `contract_${state.contracts.length + 1}`
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
