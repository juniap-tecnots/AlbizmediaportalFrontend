
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type SlaStage = 'Editorial Review' | 'Expert Review' | 'Legal Review';
export type EscalationAction = 'notify-manager' | 'reassign-team' | 'auto-reject' | 'notify-head' | 'block-content';

export interface SlaSetting {
  stage: SlaStage;
  hours: number;
}

export interface EscalationRule {
  id: string;
  stage: SlaStage;
  overdueHours: number;
  action: EscalationAction;
  enabled: boolean;
}

interface SlaState {
  settings: SlaSetting[];
  rules: EscalationRule[];
}

const initialState: SlaState = {
  settings: [
    { stage: 'Editorial Review', hours: 24 },
    { stage: 'Expert Review', hours: 48 },
    { stage: 'Legal Review', hours: 72 },
  ],
  rules: [
    { id: 'esc_01', stage: 'Editorial Review', overdueHours: 4, action: 'notify-manager', enabled: true },
    { id: 'esc_02', stage: 'Legal Review', overdueHours: 12, action: 'notify-head', enabled: true },
  ],
};

const slaSlice = createSlice({
  name: 'sla',
  initialState,
  reducers: {
    updateSlaSettings: (state, action: PayloadAction<SlaSetting[]>) => {
      state.settings = action.payload;
    },
    updateEscalationRules: (state, action: PayloadAction<EscalationRule[]>) => {
      state.rules = action.payload;
    },
  },
});

export const { updateSlaSettings, updateEscalationRules } = slaSlice.actions;

export const selectAllSlaSettings = (state: RootState) => state.sla.settings;
export const selectAllEscalationRules = (state: RootState) => state.sla.rules;

export default slaSlice.reducer;
