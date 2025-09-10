
'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { selectAllSubscriptionPlans, SubscriptionPlan } from '@/lib/redux/slices/subscriptionPlansSlice';

export default function SubscriptionsPage() {
    const plans = useSelector(selectAllSubscriptionPlans);
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Subscriptions & Billing"
                description="Manage your subscription plan and billing details."
            />

            <div className="flex justify-center items-center gap-4 mb-8">
                <Label htmlFor="billing-cycle">Monthly</Label>
                <Switch id="billing-cycle" checked={isYearly} onCheckedChange={setIsYearly} />
                <Label htmlFor="billing-cycle">Yearly</Label>
                <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">Save 20%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {plans.map((plan) => (
                    <Card key={plan.id} className={cn("flex flex-col", plan.isMostPopular && "border-primary border-2 shadow-lg")}>
                        {plan.isMostPopular && (
                            <div className="bg-primary text-primary-foreground text-center text-sm font-semibold py-1 rounded-t-md">
                                Most Popular
                            </div>
                        )}
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                             <div className="text-center mb-6">
                                {plan.priceMonthly === null ? (
                                     <span className="text-4xl font-bold">Contact Us</span>
                                ) : (
                                    <>
                                        <span className="text-4xl font-bold">
                                            ${isYearly ? plan.priceYearly : plan.priceMonthly}
                                        </span>
                                        <span className="text-muted-foreground">
                                            /{isYearly ? 'year' : 'month'}
                                        </span>
                                    </>
                                )}
                            </div>
                            <ul className="space-y-3 text-sm">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        {feature.included ? (
                                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                        )}
                                        <span className={cn(!feature.included && "text-muted-foreground line-through")}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant={plan.isMostPopular ? "default" : "outline"}>
                                {plan.id === 'Free' ? 'Current Plan' : 'Upgrade'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
