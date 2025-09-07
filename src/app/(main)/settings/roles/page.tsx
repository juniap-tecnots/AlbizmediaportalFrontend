
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Pencil, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAllRoles, Role } from "@/lib/redux/slices/rolesSlice";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";


export default function RolesPage() {
    const roles = useSelector(selectAllRoles);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    return (
        <AlertDialog>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Roles</CardTitle>
                        <CardDescription>Create, edit, and assign roles to users.</CardDescription>
                    </div>
                    <Link href="/settings/roles/new">
                        <Button>
                            <PlusCircle className="mr-2" />
                            Create New Role
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map(role => (
                                <TableRow key={role.id}>
                                    <TableCell className="font-medium">{role.name}</TableCell>
                                    <TableCell>{role.description}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" size="icon" onClick={() => setSelectedRole(role)} className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
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
            
            {selectedRole && (
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Permissions for {selectedRole?.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                            The following permissions are assigned to this role.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="max-h-60 overflow-y-auto py-4">
                        <div className="flex flex-wrap gap-2">
                            {selectedRole?.permissions.map(permissionId => (
                                <Badge key={permissionId} variant="secondary">{permissionId}</Badge>
                            ))}
                            {selectedRole?.permissions.length === 0 && <p className="text-sm text-muted-foreground">No permissions assigned.</p>}
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            )}
        </AlertDialog>
    )
}
