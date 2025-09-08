
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { loginSuccess } from '@/lib/redux/slices/authSlice';
import { selectAllUsers } from '@/lib/redux/slices/usersSlice';
import Link from 'next/link';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const allUsers = useSelector(selectAllUsers);

    const handleSignIn = () => {
        const user = allUsers.find(u => u.email === email);
        
        if (user) {
            // In a real app, you would verify the password hash
            dispatch(loginSuccess(user));
            toast({
                title: "Login Successful",
                description: `Welcome back, ${user.firstName}!`,
            });
            router.push('/dashboard');
        } else {
            toast({
                title: "Invalid Credentials",
                description: "Please check your email and password.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                <CardDescription>Enter your credentials to sign in to your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button onClick={handleSignIn} className="w-full">Sign In</Button>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <Link href="/auth/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
