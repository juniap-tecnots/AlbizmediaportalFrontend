'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  CreditCard,
  Users,
  DollarSign,
  Star,
  Zap,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
  userCount: number;
  color: string;
  icon: any;
}

export default function SubscriptionPlansPage() {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    price: 0,
    billingCycle: 'monthly' as 'monthly' | 'yearly',
    features: [''],
    isActive: true
  });

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started with basic features',
      price: 0,
      billingCycle: 'monthly',
      features: [
        'Up to 5 articles per month',
        'Basic analytics',
        'Standard support',
        'Community access'
      ],
      isActive: true,
      userCount: 1847,
      color: 'bg-gray-500',
      icon: Users
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Advanced features for growing businesses',
      price: 29.99,
      billingCycle: 'monthly',
      features: [
        'Unlimited articles',
        'Advanced analytics',
        'Priority support',
        'Custom themes',
        'SEO optimization',
        'Social media integration'
      ],
      isActive: true,
      userCount: 892,
      color: 'bg-blue-500',
      icon: Star
    },
    {
      id: 'managed',
      name: 'Managed',
      description: 'Full-service solution with dedicated support',
      price: 99.99,
      billingCycle: 'monthly',
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'Custom development',
        'White-label solution',
        'Advanced integrations',
        '24/7 phone support',
        'Custom training'
      ],
      isActive: true,
      userCount: 108,
      color: 'bg-purple-500',
      icon: Crown
    }
  ];

  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "New subscription plan created successfully",
    });
    
    setIsCreating(false);
    setNewPlan({
      name: '',
      description: '',
      price: 0,
      billingCycle: 'monthly',
      features: [''],
      isActive: true
    });
  };

  const handleEditPlan = (planId: string) => {
    setEditingPlan(planId);
    toast({
      title: "Editing",
      description: "Plan editing mode activated",
    });
  };

  const handleDeletePlan = (planId: string) => {
    toast({
      title: "Deleted",
      description: "Subscription plan deleted successfully",
    });
  };

  const togglePlanStatus = (planId: string) => {
    toast({
      title: "Updated",
      description: "Plan status updated successfully",
    });
  };

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Subscription Plans"
        description="Manage your subscription plans: Free, Premium, and Managed tiers"
      />

      {/* Create New Plan */}
      {isCreating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Plan</CardTitle>
            <CardDescription>Add a new subscription plan to your offerings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="e.g., Enterprise"
                />
              </div>
              <div>
                <Label htmlFor="plan-price">Price ($)</Label>
                <Input
                  id="plan-price"
                  type="number"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({ ...newPlan, price: parseFloat(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="plan-description">Description</Label>
              <Textarea
                id="plan-description"
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                placeholder="Describe what this plan offers..."
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={newPlan.isActive}
                onCheckedChange={(checked) => setNewPlan({ ...newPlan, isActive: checked })}
              />
              <Label>Active Plan</Label>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreatePlan}>
                <Check className="mr-2 h-4 w-4" />
                Create Plan
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${plan.color}`}>
                    <plan.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <Badge variant={plan.isActive ? 'default' : 'secondary'}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditPlan(plan.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.billingCycle}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subscribers</span>
                    <span className="font-medium">{plan.userCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Features</h4>
                  <ul className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Check className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button 
                    className="flex-1" 
                    variant={plan.isActive ? 'outline' : 'default'}
                    onClick={() => togglePlanStatus(plan.id)}
                  >
                    {plan.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Plan Button */}
      {!isCreating && (
        <div className="mt-6 text-center">
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Plan
          </Button>
        </div>
      )}
    </div>
  );
}



