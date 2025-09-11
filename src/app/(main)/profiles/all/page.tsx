
'use client'

import { useSelector } from "react-redux";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, Eye } from "lucide-react";
import { selectAllProfileCards, ApprovalStatus } from "@/lib/redux/slices/profileCardsSlice";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AllProfilesPage() {
    const allProfiles = useSelector(selectAllProfileCards);

    const getStatusBadgeClass = (status: ApprovalStatus) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'draft': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'suspended': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-secondary';
        }
    };
    
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                     <Select defaultValue="All">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search profiles..."
                        className="pl-8"
                    />
                </div>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Management Type</TableHead>
                            <TableHead>Subscription</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allProfiles.map(profile => (
                            <TableRow key={profile.id}>
                                <TableCell>
                                     <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={profile.profileData.profileImage} alt={profile.profileData.fullName} />
                                            <AvatarFallback>{profile.profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-medium">{profile.profileData.fullName}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{profile.profileData.title}</TableCell>
                                <TableCell className="capitalize">{profile.managementType.replace('_', ' ')}</TableCell>
                                <TableCell className="capitalize">{profile.subscriptionTier}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn('font-semibold', getStatusBadgeClass(profile.approvalStatus))}>
                                        {profile.approvalStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{format(new Date(profile.createdAt), 'PP')}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={`/profiles/${profile.id}`}>
                                        <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                     <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                        <Edit className="h-4 w-4" />
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
             {allProfiles.length === 0 && (
                <div className="text-center p-12 text-muted-foreground">
                    No profiles found.
                </div>
            )}
        </div>
    );
}
