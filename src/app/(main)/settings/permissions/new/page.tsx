
'use client'

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { addPermission, selectAllPermissions, PermissionRight } from '@/lib/redux/slices/permissionsSlice';

export default function NewPermissionPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rights, setRights] = useState<PermissionRight[]>([]);
    const [parentId, setParentId] = useState<string | undefined>(undefined);
    
    const allPermissions = useSelector(selectAllPermissions);

    const handleRightChange = (right: PermissionRight, checked: boolean) => {
        setRights(prev => 
            checked ? [...prev, right] : prev.filter(r => r !== right)
        );
    }

    const handleSubmit = () => {
        if (!name) {
            toast({
                title: "Error",
                description: "Permission name is required.",
                variant: "destructive",
            });
            return;
        }

        dispatch(addPermission({
            name,
            description,
            rights,
            parentId: parentId === 'none' ? undefined : parentId,
        }));
        
        toast({
            title: "Permission Created",
            description: `The permission "${name}" has been successfully created.`,
        });
        
        router.push('/settings/permissions');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create a New Permission</CardTitle>
                <CardDescription>Define a specific action that can be assigned to roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Permission Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Edit Articles, Manage Users" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="A short description of what this permission allows." />
                </div>
                <div className="space-y-2">
                    <Label>Rights</Label>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="read" checked={rights.includes('read')} onCheckedChange={(checked) => handleRightChange('read', !!checked)} />
                            <Label htmlFor="read">Read</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="write" checked={rights.includes('write')} onCheckedChange={(checked) => handleRightChange('write', !!checked)} />
                            <Label htmlFor="write">Write</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="delete" checked={rights.includes('delete')} onCheckedChange={(checked) => handleRightChange('delete', !!checked)} />
                            <Label htmlFor="delete">Delete</Label>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="parent">Parent Permission</Label>
                    <Select onValueChange={setParentId} defaultValue="none">
                        <SelectTrigger id="parent">
                            <SelectValue placeholder="Select a parent (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None (top-level)</SelectItem>
                            {allPermissions.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => router.push('/settings/permissions')}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create Permission</Button>
                </div>
            </CardContent>
        </Card>
    );
}
