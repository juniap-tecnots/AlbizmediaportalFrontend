
'use client'

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { selectAccountInfo, updateAccountInfo } from "@/lib/redux/slices/accountsSlice";
import type { RootState } from "@/lib/redux/store";

export default function AccountsPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const accountInfo = useSelector((state: RootState) => selectAccountInfo(state));

    const [name, setName] = useState(accountInfo.name);
    const [email, setEmail] = useState(accountInfo.email);
    const [bio, setBio] = useState(accountInfo.bio);

    const handleSaveChanges = () => {
        dispatch(updateAccountInfo({ name, email, bio, photo: accountInfo.photo }));
        toast({
            title: "Success",
            description: "Account information has been updated.",
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your basic profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={accountInfo.photo} alt="Admin" data-ai-hint="person" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Photo</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea id="bio" placeholder="Tell us a little bit about yourself." value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                 <div className="flex justify-end">
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>
            </CardContent>
        </Card>
    )
}
