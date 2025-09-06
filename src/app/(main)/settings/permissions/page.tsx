
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, PlusCircle, X } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAllPermissions } from "@/lib/redux/slices/permissionsSlice";

export default function PermissionsPage() {
    const permissions = useSelector(selectAllPermissions);

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
                            <TableHead className="text-center">Read</TableHead>
                            <TableHead className="text-center">Write</TableHead>
                            <TableHead className="text-center">Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {permissions.map(permission => (
                            <TableRow key={permission.id}>
                                <TableCell className="font-medium">{permission.name}</TableCell>
                                <TableCell>{permission.description}</TableCell>
                                <TableCell className="text-center">
                                    {permission.rights.includes('read') ? <Check className="mx-auto text-green-500" /> : <X className="mx-auto text-red-500" />}
                                </TableCell>
                                <TableCell className="text-center">
                                    {permission.rights.includes('write') ? <Check className="mx-auto text-green-500" /> : <X className="mx-auto text-red-500" />}
                                </TableCell>
                                <TableCell className="text-center">
                                    {permission.rights.includes('delete') ? <Check className="mx-auto text-green-500" /> : <X className="mx-auto text-red-500" />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
