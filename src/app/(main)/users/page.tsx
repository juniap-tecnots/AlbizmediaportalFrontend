
'use client'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { selectAllUsers, addUser, updateUser, User, UserRole, UserStatus } from '@/lib/redux/slices/usersSlice';
import type { RootState } from '@/lib/redux/store';
import { cn } from '@/lib/utils';
import { ContractStatus } from '@/lib/redux/slices/contractsSlice';

export default function UsersPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const allUsers = useSelector(selectAllUsers);

    const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
    const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Form state for adding/editing users
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('Author');
    const [status, setStatus] = useState<UserStatus>('Active');
    
    const getRoleBadgeClass = (role: UserRole) => {
        switch (role) {
            case 'Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Editor': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Author': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-secondary';
        }
    };

    const getStatusBadgeClass = (status: UserStatus | ContractStatus) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 border-green-200';
            case 'Suspended': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Draft': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Terminated': return 'bg-red-100 text-red-800 border-red-200';
            case 'N/A': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-secondary';
        }
    };
    
    const handleOpenEditDialog = (user: User) => {
        setSelectedUser(user);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setRole(user.role);
        setStatus(user.status);
        setEditUserDialogOpen(true);
    };

    const handleAddUser = () => {
        if (!firstName || !lastName || !email) {
            toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
            return;
        }
        dispatch(addUser({ firstName, lastName, email, role }));
        toast({ title: "User Invited", description: `${firstName} ${lastName} has been sent an invitation.` });
        setAddUserDialogOpen(false);
        // Reset form
        setFirstName(''); setLastName(''); setEmail(''); setRole('Author');
    };
    
    const handleUpdateUser = () => {
        if (!selectedUser) return;

        dispatch(updateUser({ id: selectedUser.id, firstName, lastName, role, status }));
        toast({ title: "User Updated", description: `${firstName} ${lastName}'s profile has been updated.` });
        setEditUserDialogOpen(false);
        // Reset form
        setSelectedUser(null);
        setFirstName(''); setLastName(''); setEmail(''); setRole('Author');
    };

    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Users"
                description="Manage all user accounts on your platform."
                actions={(
                    <Dialog open={isAddUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Invite a new user</DialogTitle>
                                <DialogDescription>Enter the user's details and assign a role. They will receive an email to set up their account.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Select onValueChange={(value: UserRole) => setRole(value)} defaultValue={role}>
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Editor">Editor</SelectItem>
                                            <SelectItem value="Author">Author</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setAddUserDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleAddUser}>Send Invitation</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            />

            <Tabs defaultValue="platform">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="platform">Platform Users</TabsTrigger>
                        <TabsTrigger value="staff">Staff Users</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Search users..." className="w-64" />
                        <CalendarDateRangePicker />
                    </div>
                </div>

                <TabsContent value="platform">
                     <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User Info</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Contract Status</TableHead>
                                    <TableHead>Last Login</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {allUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={user.avatar} alt={user.firstName} />
                                                    <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(getRoleBadgeClass(user.role))}>{user.role}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(getStatusBadgeClass(user.status))}>{user.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(getStatusBadgeClass(user.contractStatus))}>{user.contractStatus}</Badge>
                                        </TableCell>
                                        <TableCell>{user.lastLogin}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600" onClick={() => handleOpenEditDialog(user)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
                <TabsContent value="staff">
                     <p className="text-center text-muted-foreground py-12">Staff user list goes here.</p>
                </TabsContent>
            </Tabs>

            <Dialog open={isEditUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User Profile</DialogTitle>
                        <DialogDescription>Modify the user's details, role, and status.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="editFirstName">First Name</Label>
                                <Input id="editFirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="editLastName">Last Name</Label>
                                <Input id="editLastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="editRole">Role</Label>
                            <Select onValueChange={(value: UserRole) => setRole(value)} defaultValue={role}>
                                <SelectTrigger id="editRole">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Editor">Editor</SelectItem>
                                    <SelectItem value="Author">Author</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="editStatus">Status</Label>
                            <Select onValueChange={(value: UserStatus) => setStatus(value)} defaultValue={status}>
                                <SelectTrigger id="editStatus">
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Suspended">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditUserDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdateUser}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

    