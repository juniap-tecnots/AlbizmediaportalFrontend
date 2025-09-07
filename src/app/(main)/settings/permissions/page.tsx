
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAllPermissions, PermissionRight } from "@/lib/redux/slices/permissionsSlice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PermissionsPage() {
    const permissions = useSelector(selectAllPermissions);

    const getRightBadgeClass = (right: PermissionRight) => {
        switch (right) {
            case 'read':
                return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
            case 'write':
                return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
            case 'delete':
                return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
            default:
                return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Manage Permissions</CardTitle>
                    <CardDescription>Define individual actions that users can perform.</CardDescription>
                </div>
                <Link href="/settings/permissions/new">
                    <Button>
                        <PlusCircle className="mr-2" />
                        Create New Permission
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Permission Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Rights</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {permissions.map(permission => (
                            <TableRow key={permission.id}>
                                <TableCell className="font-medium">{permission.name}</TableCell>
                                <TableCell>{permission.description}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {permission.rights.map(right => (
                                            <Badge key={right} variant="outline" className={cn(getRightBadgeClass(right))}>
                                                {right.charAt(0).toUpperCase() + right.slice(1)}
                                            </Badge>
                                        ))}
                                         {permission.rights.length === 0 && <span className="text-muted-foreground">-</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
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
            </CardContent>
        </Card>
    )
}
