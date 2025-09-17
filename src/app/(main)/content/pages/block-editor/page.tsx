'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Send } from "lucide-react";
import BlockEditor from '@/components/blocks/BlockEditor';
import { useToast } from "@/hooks/use-toast";

export default function BlockEditorPage() {
    const [pageTitle, setPageTitle] = useState('');
    const [pageSlug, setPageSlug] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleSave = () => {
        if (!pageTitle.trim()) {
            toast({
                title: "Error",
                description: "Page title is required.",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Page Saved",
            description: "Your page has been saved successfully."
        });
        router.push('/content/pages/all');
    };

    const handlePublish = () => {
        if (!pageTitle.trim()) {
            toast({
                title: "Error",
                description: "Page title is required.",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Page Published",
            description: "Your page has been published successfully."
        });
        router.push('/content/pages/published');
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            <header className="flex items-center justify-between p-4 border-b bg-white">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Block Editor</h1>
                        <p className="text-sm text-muted-foreground">Create pages with visual blocks</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Label htmlFor="page-title">Page Title:</Label>
                        <Input
                            id="page-title"
                            placeholder="Enter page title"
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                            className="w-64"
                        />
                    </div>
                    <Button onClick={handleSave} variant="secondary">
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                    <Button onClick={handlePublish}>
                        <Send className="mr-2 h-4 w-4" />
                        Publish
                    </Button>
                </div>
            </header>

            <div className="flex-1 overflow-hidden">
                <BlockEditor />
            </div>
        </div>
    );
}



