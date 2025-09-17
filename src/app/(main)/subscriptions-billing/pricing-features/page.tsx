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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Plus,
  Trash2,
  Save,
  DollarSign,
  Zap,
  Shield,
  Users,
  BarChart3,
  Globe,
  Mail,
  Smartphone,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Feature {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'analytics' | 'support' | 'integration' | 'customization';
  isEnabled: boolean;
  plans: string[];
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: {
    articles: number;
    users: number;
    storage: string;
    bandwidth: string;
  };
}

export default function PricingFeaturesConfigPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('features');
  const [editingFeature, setEditingFeature] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    category: 'content' as Feature['category'],
    isEnabled: true,
    plans: ['free', 'premium', 'managed']
  });

  const features: Feature[] = [
    {
      id: 'unlimited-articles',
      name: 'Unlimited Articles',
      description: 'Create and publish unlimited articles',
      category: 'content',
      isEnabled: true,
      plans: ['premium', 'managed']
    },
    {
      id: 'advanced-analytics',
      name: 'Advanced Analytics',
      description: 'Detailed analytics and reporting dashboard',
      category: 'analytics',
      isEnabled: true,
      plans: ['premium', 'managed']
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 priority customer support',
      category: 'support',
      isEnabled: true,
      plans: ['premium', 'managed']
    },
    {
      id: 'custom-themes',
      name: 'Custom Themes',
      description: 'Access to premium themes and customization',
      category: 'customization',
      isEnabled: true,
      plans: ['premium', 'managed']
    },
    {
      id: 'api-access',
      name: 'API Access',
      description: 'Full API access for integrations',
      category: 'integration',
      isEnabled: true,
      plans: ['managed']
    },
    {
      id: 'white-label',
      name: 'White Label Solution',
      description: 'Remove branding and customize appearance',
      category: 'customization',
      isEnabled: true,
      plans: ['managed']
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billingCycle: 'monthly',
      features: ['basic-analytics', 'community-support'],
      limits: {
        articles: 5,
        users: 1,
        storage: '1GB',
        bandwidth: '10GB'
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.99,
      billingCycle: 'monthly',
      features: ['unlimited-articles', 'advanced-analytics', 'priority-support', 'custom-themes'],
      limits: {
        articles: -1, // unlimited
        users: 5,
        storage: '100GB',
        bandwidth: '1TB'
      }
    },
    {
      id: 'managed',
      name: 'Managed',
      price: 99.99,
      billingCycle: 'monthly',
      features: ['unlimited-articles', 'advanced-analytics', 'priority-support', 'custom-themes', 'api-access', 'white-label'],
      limits: {
        articles: -1, // unlimited
        users: -1, // unlimited
        storage: '1TB',
        bandwidth: '10TB'
      }
    }
  ];

  const categories = [
    { id: 'content', name: 'Content', icon: Users, color: 'bg-blue-500' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'bg-green-500' },
    { id: 'support', name: 'Support', icon: Shield, color: 'bg-purple-500' },
    { id: 'integration', name: 'Integration', icon: Zap, color: 'bg-orange-500' },
    { id: 'customization', name: 'Customization', icon: Settings, color: 'bg-pink-500' }
  ];

  const handleSaveFeature = () => {
    if (!newFeature.name || !newFeature.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Feature configuration saved successfully",
    });
    
    setNewFeature({
      name: '',
      description: '',
      category: 'content',
      isEnabled: true,
      plans: ['free', 'premium', 'managed']
    });
  };

  const handleToggleFeature = (featureId: string) => {
    toast({
      title: "Updated",
      description: "Feature status updated successfully",
    });
  };

  const handleDeleteFeature = (featureId: string) => {
    toast({
      title: "Deleted",
      description: "Feature deleted successfully",
    });
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Settings;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Pricing & Features Configuration"
        description="Configure subscription plans, features, and pricing tiers"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Tiers</TabsTrigger>
          <TabsTrigger value="limits">Limits & Quotas</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          {/* Add New Feature */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Feature</CardTitle>
              <CardDescription>Create a new feature for your subscription plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feature-name">Feature Name</Label>
                  <Input
                    id="feature-name"
                    value={newFeature.name}
                    onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                    placeholder="e.g., Advanced SEO Tools"
                  />
                </div>
                <div>
                  <Label htmlFor="feature-category">Category</Label>
                  <select
                    id="feature-category"
                    value={newFeature.category}
                    onChange={(e) => setNewFeature({ ...newFeature, category: e.target.value as Feature['category'] })}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="feature-description">Description</Label>
                <Textarea
                  id="feature-description"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  placeholder="Describe what this feature does..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newFeature.isEnabled}
                  onCheckedChange={(checked) => setNewFeature({ ...newFeature, isEnabled: checked })}
                />
                <Label>Enable Feature</Label>
              </div>

              <Button onClick={handleSaveFeature}>
                <Save className="mr-2 h-4 w-4" />
                Save Feature
              </Button>
            </CardContent>
          </Card>

          {/* Features List */}
          <div className="space-y-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <span>{category.name} Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {features.filter(f => f.category === category.id).map((feature) => (
                      <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {feature.isEnabled ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <Switch
                              checked={feature.isEnabled}
                              onCheckedChange={() => handleToggleFeature(feature.id)}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{feature.name}</h4>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {feature.plans.map(plan => (
                              <Badge key={plan} variant="outline" className="text-xs">
                                {plan}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteFeature(feature.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <Card key={tier.id} className="relative">
                <CardHeader>
                  <CardTitle className="text-center">{tier.name}</CardTitle>
                  <div className="text-center">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-sm text-muted-foreground">/{tier.billingCycle}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Features</h4>
                      <ul className="space-y-1">
                        {tier.features.map((featureId) => {
                          const feature = features.find(f => f.id === featureId);
                          return feature ? (
                            <li key={featureId} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature.name}</span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Limits</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Articles:</span>
                          <span>{tier.limits.articles === -1 ? 'Unlimited' : tier.limits.articles}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span>{tier.limits.users === -1 ? 'Unlimited' : tier.limits.users}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage:</span>
                          <span>{tier.limits.storage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bandwidth:</span>
                          <span>{tier.limits.bandwidth}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" variant={tier.id === 'premium' ? 'default' : 'outline'}>
                      Edit {tier.name} Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="limits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Limits & Quotas</CardTitle>
              <CardDescription>Configure usage limits for different subscription tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Usage Limits Configuration</h3>
                <p className="text-muted-foreground">
                  Configure detailed usage limits and quotas for each subscription tier
                </p>
                <Button className="mt-4">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Limits
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Configure integrations with external services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Integration Settings</h3>
                <p className="text-muted-foreground">
                  Configure Stripe, Firebase, and other third-party integrations
                </p>
                <Button className="mt-4">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Integrations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
