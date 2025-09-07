
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAllPermissions } from "@/lib/redux/slices/permissionsSlice";
import { Badge } from "@/components/ui/badge";

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
                            <TableHead>Rights</TableHead>
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
                                            <Badge key={right} variant="secondary">{right.charAt(0).toUpperCase() + right.slice(1)}</Badge>
                                        ))}
                                         {permission.rights.length === 0 && <span className="text-muted-foreground">-</span>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
