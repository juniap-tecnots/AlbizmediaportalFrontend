'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search,
  Filter,
  Users,
  Crown,
  Star,
  User,
  Calendar,
  DollarSign,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface User {
  id: string;
  name: string;
  email: string;
  currentPlan: string;
  planStatus: 'active' | 'expired' | 'pending';
  joinDate: string;
  lastActive: string;
  subscriptionValue: number;
  avatar?: string;
}

export default function AssignPlansPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const users: User[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      currentPlan: 'Premium',
      planStatus: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      subscriptionValue: 29.99
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      currentPlan: 'Free',
      planStatus: 'active',
      joinDate: '2024-02-20',
      lastActive: '1 day ago',
      subscriptionValue: 0
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      currentPlan: 'Managed',
      planStatus: 'active',
      joinDate: '2023-12-10',
      lastActive: '30 minutes ago',
      subscriptionValue: 99.99
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      currentPlan: 'Premium',
      planStatus: 'expired',
      joinDate: '2023-11-05',
      lastActive: '1 week ago',
      subscriptionValue: 29.99
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@example.com',
      currentPlan: 'Free',
      planStatus: 'pending',
      joinDate: '2024-03-01',
      lastActive: '3 hours ago',
      subscriptionValue: 0
    }
  ];

  const plans = [
    { id: 'free', name: 'Free', price: 0, color: 'bg-gray-500' },
    { id: 'premium', name: 'Premium', price: 29.99, color: 'bg-blue-500' },
    { id: 'managed', name: 'Managed', price: 99.99, color: 'bg-purple-500' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || user.currentPlan.toLowerCase() === selectedPlan.toLowerCase();
    return matchesSearch && matchesPlan;
  });

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleAssignPlan = (userId: string, planId: string) => {
    toast({
      title: "Plan Assigned",
      description: `Successfully assigned ${planId} plan to user`,
    });
  };

  const handleBulkAssignPlan = (planId: string) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select users to assign plans to",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bulk Assignment",
      description: `Assigned ${planId} plan to ${selectedUsers.length} users`,
    });
    setSelectedUsers([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'free':
        return <User className="h-4 w-4" />;
      case 'premium':
        return <Star className="h-4 w-4" />;
      case 'managed':
        return <Crown className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Assign Plans to Users"
        description="Manage user subscriptions and assign plans to individual users or groups"
      />

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Search, filter, and manage user subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="managed">Managed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedUsers.length} user(s) selected
                </span>
                <div className="flex space-x-2">
                  {plans.map(plan => (
                    <Button
                      key={plan.id}
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAssignPlan(plan.id)}
                    >
                      Assign {plan.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Current Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPlanIcon(user.currentPlan)}
                      <span className="font-medium">{user.currentPlan}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.planStatus)}
                      <Badge variant={user.planStatus === 'active' ? 'default' : 'secondary'}>
                        {user.planStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${user.subscriptionValue}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {plans.map(plan => (
                          <DropdownMenuItem
                            key={plan.id}
                            onClick={() => handleAssignPlan(user.id, plan.id)}
                          >
                            Assign {plan.name}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
