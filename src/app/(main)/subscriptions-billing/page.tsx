'use client';

import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Settings,
  FileText,
  BarChart3
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SubscriptionsBillingDashboard() {
  const router = useRouter();

  const stats = [
    {
      title: 'Total Subscribers',
      value: '2,847',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Active subscriptions'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'This month'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Free to paid'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.3%',
      changeType: 'positive' as const,
      icon: BarChart3,
      description: 'Monthly churn'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'John Smith',
      action: 'Upgraded to Premium',
      plan: 'Premium',
      amount: '$29.99',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'New subscription',
      plan: 'Free',
      amount: '$0.00',
      time: '4 hours ago',
      status: 'success'
    },
    {
      id: 3,
      user: 'Mike Wilson',
      action: 'Payment failed',
      plan: 'Premium',
      amount: '$29.99',
      time: '6 hours ago',
      status: 'error'
    },
    {
      id: 4,
      user: 'Emily Davis',
      action: 'Cancelled subscription',
      plan: 'Managed',
      amount: '$99.99',
      time: '1 day ago',
      status: 'warning'
    }
  ];

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Subscriptions & Billing"
        description="Manage subscription plans, billing, and user assignments"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge variant={stat.changeType === 'positive' ? 'default' : 'destructive'}>
                  {stat.change}
                </Badge>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="users">User Assignments</TabsTrigger>
          <TabsTrigger value="billing">Billing & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest subscription and billing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{activity.user}</span>
                          <span className="text-xs text-muted-foreground">{activity.action}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{activity.plan}</Badge>
                        <span className="text-sm font-medium">{activity.amount}</span>
                        <Badge 
                          variant={activity.status === 'success' ? 'default' : 
                                  activity.status === 'error' ? 'destructive' : 'secondary'}
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common subscription management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => router.push('/subscriptions-billing/plans')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Subscription Plans
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => router.push('/subscriptions-billing/assign-plans')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Assign Plans to Users
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => router.push('/subscriptions-billing/pricing-features')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Pricing & Features
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => router.push('/subscriptions-billing/billing')}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Billing Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Subscription Plans</h3>
            <p className="text-muted-foreground">
              Manage your subscription plans (Free, Premium, Managed)
            </p>
            <Button className="mt-4" onClick={() => router.push('/subscriptions-billing/plans')}>
              <Plus className="mr-2 h-4 w-4" />
              Manage Plans
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">User Assignments</h3>
            <p className="text-muted-foreground">
              Assign subscription plans to users and manage their access
            </p>
            <Button className="mt-4" onClick={() => router.push('/subscriptions-billing/assign-plans')}>
              <Users className="mr-2 h-4 w-4" />
              Manage Assignments
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Billing & Reports</h3>
            <p className="text-muted-foreground">
              View invoices, payments, and billing reports
            </p>
            <Button className="mt-4" onClick={() => router.push('/subscriptions-billing/billing')}>
              <FileText className="mr-2 h-4 w-4" />
              View Billing
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}



