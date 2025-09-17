'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Save, Send, Archive } from "lucide-react";
import { selectPageById, updatePage, publishPage, archivePage } from '@/lib/redux/slices/pagesSlice';
import { useToast } from "@/hooks/use-toast";
import type { RootState } from '@/lib/redux/store';

export default function EditPagePage() {
    const params = useParams();
    const pageId = params.id as string;
    
    const page = useSelector((state: RootState) => selectPageById(state, pageId));
    
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [template, setTemplate] = useState('custom');
    const [visibility, setVisibility] = useState('public');
    const [allowComments, setAllowComments] = useState(true);
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast();

    useEffect(() => {
        if (page) {
            setTitle(page.title);
            setSlug(page.slug);
            setContent(page.content);
            setExcerpt(page.excerpt);
            setTemplate(page.template);
            setVisibility(page.settings.visibility);
            setAllowComments(page.settings.allowComments);
            setSeoTitle(page.seo.title);
            setSeoDescription(page.seo.description);
            setSeoKeywords(page.seo.keywords.join(', '));
        }
    }, [page]);

    if (!page) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Page not found.</p>
            </div>
        );
    }

    const handleUpdate = () => {
        if (!title.trim()) {
            toast({
                title: "Error",
                description: "Page title is required.",
                variant: "destructive"
            });
            return;
        }

        const keywordsArray = seoKeywords.split(',').map(k => k.trim()).filter(k => k);

        const updatedPage = {
            ...page,
            title: title.trim(),
            slug: slug.trim() || title.toLowerCase().replace(/\s+/g, '-'),
            content: content.trim(),
            excerpt: excerpt.trim(),
            template: template as any,
            seo: {
                title: seoTitle.trim() || title.trim(),
                description: seoDescription.trim() || excerpt.trim(),
                keywords: keywordsArray
            },
            settings: {
                visibility: visibility as any,
                allowComments,
                customCSS: page.settings.customCSS
            }
        };

        dispatch(updatePage(updatedPage));
        toast({
            title: "Page Updated",
            description: "Your page has been updated successfully."
        });
    };

    const handlePublish = () => {
        handleUpdate();
        dispatch(publishPage(pageId));
        toast({
            title: "Page Published",
            description: "Your page has been published successfully."
        });
        router.push('/content/pages/published');
    };

    const handleArchive = () => {
        dispatch(archivePage(pageId));
        toast({
            title: "Page Archived",
            description: "Your page has been archived."
        });
        router.push('/content/pages/archived');
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <Badge variant="default" className="bg-green-100 text-green-800">Published</Badge>;
            case 'draft':
                return <Badge variant="secondary">Draft</Badge>;
            case 'archived':
                return <Badge variant="outline">Archived</Badge>;
            case 'scheduled':
                return <Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="flex flex-col h-full bg-background p-4 md:p-6">
            <header className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Page</h1>
                        <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(page.status)}
                            <span className="text-sm text-muted-foreground">
                                Version {page.version}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                    <Button onClick={handleUpdate} variant="secondary">
                        <Save className="mr-2 h-4 w-4" />
                        Update
                    </Button>
                    {page.status === 'draft' && (
                        <Button onClick={handlePublish}>
                            <Send className="mr-2 h-4 w-4" />
                            Publish
                        </Button>
                    )}
                    {page.status === 'published' && (
                        <Button onClick={handleArchive} variant="destructive">
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                        </Button>
                    )}
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6 items-start">
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Content</CardTitle>
                            <CardDescription>
                                Edit your page content using the editor below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Page Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter page title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="slug">Page Slug</Label>
                                <Input
                                    id="slug"
                                    placeholder="page-url-slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                                <p className="text-sm text-muted-foreground">
                                    URL: /{slug || title.toLowerCase().replace(/\s+/g, '-')}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Page Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    placeholder="Brief description of the page"
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Page Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Enter your page content here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={10}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="template">Template</Label>
                                <Select value={template} onValueChange={setTemplate}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="homepage">Homepage</SelectItem>
                                        <SelectItem value="article-listing">Article Listing</SelectItem>
                                        <SelectItem value="about">About</SelectItem>
                                        <SelectItem value="contact">Contact</SelectItem>
                                        <SelectItem value="landing">Landing Page</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="visibility">Visibility</Label>
                                <Select value={visibility} onValueChange={setVisibility}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                        <SelectItem value="password">Password Protected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="comments"
                                    checked={allowComments}
                                    onCheckedChange={setAllowComments}
                                />
                                <Label htmlFor="comments">Allow Comments</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="seo-title">SEO Title</Label>
                                <Input
                                    id="seo-title"
                                    placeholder="SEO optimized title"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="seo-description">Meta Description</Label>
                                <Textarea
                                    id="seo-description"
                                    placeholder="SEO description"
                                    value={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="seo-keywords">Keywords</Label>
                                <Input
                                    id="seo-keywords"
                                    placeholder="keyword1, keyword2, keyword3"
                                    value={seoKeywords}
                                    onChange={(e) => setSeoKeywords(e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Page Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Created:</span>
                                <span className="text-sm">{new Date(page.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Last Updated:</span>
                                <span className="text-sm">{new Date(page.updatedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Author:</span>
                                <span className="text-sm">{page.author}</span>
                            </div>
                            {page.publishDate && (
                                <div className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">Published:</span>
                                    <span className="text-sm">{new Date(page.publishDate).toLocaleDateString()}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

