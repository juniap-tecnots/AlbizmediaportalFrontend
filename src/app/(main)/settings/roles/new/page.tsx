
'use client'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addRole } from '@/lib/redux/slices/rolesSlice';
import { selectAllPermissions, Permission } from '@/lib/redux/slices/permissionsSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface PermissionNode extends Permission {
    children: PermissionNode[];
}

export default function NewRolePage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [openNodes, setOpenNodes] = useState<string[]>([]);

    const allPermissions = useSelector(selectAllPermissions);

    const handleTogglePermission = (permissionId: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permissionId)
                ? prev.filter(id => id !== permissionId)
                : [...prev, permissionId]
        );
    };

    const handleToggleNode = (nodeId: string) => {
        setOpenNodes(prev => 
            prev.includes(nodeId)
                ? prev.filter(id => id !== nodeId)
                : [...prev, nodeId]
        );
    }

    const handleSubmit = () => {
        if (!name) {
            toast({
                title: "Error",
                description: "Role name is required.",
                variant: "destructive",
            });
            return;
        }

        dispatch(addRole({
            name,
            description,
            permissions: selectedPermissions,
        }));

        toast({
            title: "Role Created",
            description: `The role "${name}" has been successfully created.`,
        });
        
        router.push('/settings/roles');
    };

    const buildPermissionTree = (permissions: Permission[]): PermissionNode[] => {
        const tree: PermissionNode[] = [];
        const map: { [key: string]: PermissionNode } = {};

        permissions.forEach(p => {
            map[p.id] = { ...p, children: [] };
        });

        permissions.forEach(p => {
            if (p.parentId && map[p.parentId]) {
                map[p.parentId].children.push(map[p.id]);
            } else {
                tree.push(map[p.id]);
            }
        });

        return tree;
    };
    
    const permissionTree = buildPermissionTree(allPermissions);

    const renderPermissionTree = (nodes: PermissionNode[]) => {
        return nodes.map(node => (
            <div key={node.id} className="ml-4">
                <div className="flex items-center gap-2 my-1">
                    {node.children.length > 0 && (
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleToggleNode(node.id)}>
                           {openNodes.includes(node.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                    )}
                     <Checkbox
                        id={`perm-${node.id}`}
                        checked={selectedPermissions.includes(node.id)}
                        onCheckedChange={() => handleTogglePermission(node.id)}
                        className={node.children.length === 0 ? "ml-8" : ""}
                    />
                    <Label htmlFor={`perm-${node.id}`} className="font-medium">{node.name}</Label>
                </div>
                {openNodes.includes(node.id) && node.children.length > 0 && (
                    <div className="pl-6 border-l ml-[1.375rem]">
                        {renderPermissionTree(node.children)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a New Role</CardTitle>
                <CardDescription>Define a role and assign permissions to it.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Role Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Editor, Author" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="A short description of the role." />
                </div>
                <div className="space-y-2">
                    <Label>Assign Permissions</Label>
                    <Card className="p-4 max-h-96 overflow-y-auto">
                        {renderPermissionTree(permissionTree)}
                    </Card>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => router.push('/settings/roles')}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create Role</Button>
                </div>
            </CardContent>
        </Card>
    )
}
