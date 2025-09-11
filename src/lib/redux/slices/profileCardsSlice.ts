

'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type ManagementType = 'self_managed' | 'platform_managed';
export type SubscriptionTier = 'free' | 'premium' | 'managed';
export type ApprovalStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'suspended';
export type VerificationLevel = 'unverified' | 'email_verified' | 'identity_verified' | 'professional_verified';

export interface ProfileCard {
    id: string;
    userId: string;
    managementType: ManagementType;
    subscriptionTier: SubscriptionTier;
    profileData: {
        fullName: string;
        profileImage: string;
        title: string;
        location: string;
        contactInfo: string;
        bio: string;
        company?: string;
        industry?: string;
        role?: string;
        experienceLevel?: string;
        customUrlSlug?: string;
    };
    verificationLevel: VerificationLevel;
    approvalStatus: ApprovalStatus;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    approvedAt?: string;
}

interface ProfileCardsState {
  profiles: ProfileCard[];
}

const initialState: ProfileCardsState = {
  profiles: [
    {
      id: 'prof_001',
      userId: '1',
      managementType: 'self_managed',
      subscriptionTier: 'premium',
      profileData: {
        fullName: 'Emma Wilson',
        profileImage: 'https://picsum.photos/100?a=6',
        title: 'Chief Editor',
        location: 'New York, NY',
        contactInfo: 'emma.w@albiz.com',
        bio: 'Leading the editorial team at Albiz Media with a passion for quality journalism.',
        company: 'Albiz Media',
        industry: 'Publishing',
        role: 'Chief Editor',
        experienceLevel: '10+ Years',
        customUrlSlug: 'emma-wilson',
      },
      verificationLevel: 'identity_verified',
      approvalStatus: 'approved',
      isPublic: true,
      createdAt: '2024-04-01T10:00:00Z',
      updatedAt: '2024-05-10T11:30:00Z',
      approvedAt: '2024-04-02T14:00:00Z',
    },
    {
      id: 'prof_002',
      userId: '2',
      managementType: 'self_managed',
      subscriptionTier: 'free',
      profileData: {
        fullName: 'Liam Smith',
        profileImage: 'https://picsum.photos/100?a=7',
        title: 'Senior Editor',
        location: 'London, UK',
        contactInfo: 'liam.s@albiz.com',
        bio: 'Specializing in tech and business journalism.',
        company: 'Tech Chronicle',
        industry: 'Technology Journalism',
        role: 'Senior Editor',
        experienceLevel: '5-7 Years'
      },
      verificationLevel: 'email_verified',
      approvalStatus: 'approved',
      isPublic: true,
      createdAt: '2024-04-15T09:00:00Z',
      updatedAt: '2024-05-12T16:00:00Z',
      approvedAt: '2024-04-16T10:00:00Z',
    },
    {
      id: 'prof_003',
      userId: '4',
      managementType: 'self_managed',
      subscriptionTier: 'free',
      profileData: {
        fullName: 'Noah Brown',
        profileImage: 'https://picsum.photos/100?a=9',
        title: 'Staff Writer',
        location: 'San Francisco, CA',
        contactInfo: 'noah.b@albiz.com',
        bio: 'Covering the latest trends in Silicon Valley.',
        company: 'Innovate Today',
        industry: 'Venture Capital',
        role: 'Writer',
        experienceLevel: '1-3 Years'
      },
      verificationLevel: 'unverified',
      approvalStatus: 'pending',
      isPublic: false,
      createdAt: '2024-05-13T12:00:00Z',
      updatedAt: '2024-05-13T12:00:00Z',
    },
  ],
};

const profileCardsSlice = createSlice({
  name: 'profileCards',
  initialState,
  reducers: {
    addProfileCard: (state, action: PayloadAction<Omit<ProfileCard, 'id' | 'createdAt' | 'updatedAt'>>) => {
        const newProfile: ProfileCard = {
            ...action.payload,
            id: `prof_${state.profiles.length + 101}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        state.profiles.push(newProfile);
    },
    updateProfileCard: (state, action: PayloadAction<Partial<ProfileCard> & { id: string }>) => {
      const index = state.profiles.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = { ...state.profiles[index], ...action.payload, updatedAt: new Date().toISOString() };
      }
    },
  },
});

export const { addProfileCard, updateProfileCard } = profileCardsSlice.actions;

export const selectAllProfileCards = (state: RootState) => state.profileCards.profiles;
export const selectPendingProfileCards = (state: RootState) => state.profileCards.profiles.filter(p => p.approvalStatus === 'pending');
export const selectProfileCardById = (state: RootState, id: string) => state.profileCards.profiles.find(p => p.id === id);


export default profileCardsSlice.reducer;
