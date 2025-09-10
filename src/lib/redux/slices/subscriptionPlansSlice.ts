
'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type PlanTier = 'Free' | 'Premium' | 'Pro' | 'Managed';

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: PlanTier;
  name: string;
  priceMonthly: number | null;
  priceYearly: number | null;
  description: string;
  features: PlanFeature[];
  isMostPopular?: boolean;
}

interface SubscriptionPlansState {
  plans: SubscriptionPlan[];
}

const initialState: SubscriptionPlansState = {
  plans: [
    {
      id: 'Free',
      name: 'Free',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'Basic features for individuals just getting started.',
      features: [
        { text: 'Basic profile creation', included: true },
        { text: 'Standard approval process', included: true },
        { text: 'Platform branding displayed', included: true },
        { text: 'Limited to 3 social media links', included: true },
        { text: 'Custom URL', included: false },
        { text: 'Ad-free experience', included: false },
        { text: 'Advanced customization', included: false },
        { text: 'Priority support', included: false },
      ],
    },
    {
      id: 'Premium',
      name: 'Premium',
      priceMonthly: 19,
      priceYearly: 199,
      description: 'Advanced features for professionals and influencers.',
      isMostPopular: true,
      features: [
        { text: 'Priority approval (1-2 days)', included: true },
        { text: 'Custom URL (albizmedia.com/@username)', included: true },
        { text: 'Remove platform branding', included: true },
        { text: 'Advanced customization', included: true },
        { text: 'Ad-free profile experience', included: true },
        { text: 'Unlimited social media links', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: 'Priority email support', included: true },
      ],
    },
    {
      id: 'Pro',
      name: 'Pro',
      priceMonthly: 49,
      priceYearly: 499,
      description: 'For businesses and power users requiring advanced tools.',
      features: [
        { text: 'All Premium features', included: true },
        { text: 'Instant approval', included: true },
        { text: 'Lead generation tools', included: true },
        { text: 'Integration with CRM systems', included: true },
        { text: 'A/B testing for profile optimization', included: true },
        { text: 'API access for profile data', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Priority feature requests', included: true },
      ],
    },
    {
      id: 'Managed',
      name: 'Managed Service',
      priceMonthly: 149,
      priceYearly: 1499,
      description: 'A fully managed solution for a hands-off experience.',
      features: [
        { text: 'All Pro features', included: true },
        { text: 'Dedicated profile manager', included: true },
        { text: 'Professional content writing', included: true },
        { text: 'Weekly profile optimization', included: true },
        { text: 'SEO and media monitoring', included: true },
        { text: 'Performance reporting', included: true },
        { text: 'Personal branding consultation', included: true },
        { text: 'Content strategy development', included: true },
      ],
    },
  ],
};


const subscriptionPlansSlice = createSlice({
  name: 'subscriptionPlans',
  initialState,
  reducers: {
    // Actions can be added here if needed, e.g., to update plans from an admin panel
  },
});

export const selectAllSubscriptionPlans = (state: RootState) => state.subscriptionPlans.plans;

export default subscriptionPlansSlice.reducer;
