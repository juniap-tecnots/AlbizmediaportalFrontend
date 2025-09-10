
'use client'

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { selectPendingProfileCards } from "@/lib/redux/slices/profileCardsSlice";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PendingProfilesPage() {
    const pendingProfiles = useSelector(selectPendingProfileCards);
    
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Management Type</TableHead>
                        <TableHead>Submitted At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pendingProfiles.map(profile => (
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
                            <TableCell>{format(new Date(profile.createdAt), 'PP')}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm">View Profile</Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                    <Check className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600">
                                    <X className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {pendingProfiles.length === 0 && (
                <div className="text-center p-12 text-muted-foreground">
                    No pending profiles to review.
                </div>
            )}
        </div>
    );
}
