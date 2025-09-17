'use client'

import React, { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline, Link as LinkIcon, ImageIcon, Video, List, ListOrdered, MoreHorizontal, ArrowRight, Image, Calendar, Eye, Edit3, Sparkles, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDispatch as useReduxDispatch } from "react-redux"
import { addPage } from "@/lib/redux/slices/pagesSlice"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Textarea } from "@/components/ui/textarea"

const ToolbarButton = ({ command, icon: Icon, tooltip, onClick }: { command: string, icon: React.ElementType, tooltip: string, onClick?: () => void }) => {
    const { handleFormat, activeCommands } = useEditorContext();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) {
            onClick();
        } else {
            handleFormat(command);
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                 <Button
                    variant="ghost"
                    size="sm"
                    className={cn("h-7 w-7 p-0", { 'bg-accent text-accent-foreground': activeCommands.has(command) })}
                    onMouseDown={handleClick}
                >
                    <Icon className="w-3 h-3"/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};

const EditorContext = React.createContext<{
    handleFormat: (command: string, value?: string) => void;
    activeCommands: Set<string>;
} | null>(null);

const useEditorContext = () => {
    const context = React.useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within an EditorProvider');
    }
    return context;
};

export default function NewPagePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [visibility, setVisibility] = useState<'public' | 'private'>('private');
    const [template, setTemplate] = useState('default-page');
    const [activeCommands, setActiveCommands] = useState(new Set<string>());
    
    const editorRef = useRef<HTMLDivElement>(null);

    const handleFormat = (command: string, value?: string) => {
        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand(command, false, value);
            updateActiveCommands();
        }
    };
    
    const updateActiveCommands = useCallback(() => {
        const commands = new Set<string>();
        if (document.queryCommandState('bold')) commands.add('bold');
        if (document.queryCommandState('italic')) commands.add('italic');
        if (document.queryCommandState('underline')) commands.add('underline');
        if (document.queryCommandState('justifyLeft')) commands.add('justifyLeft');
        if (document.queryCommandState('justifyCenter')) commands.add('justifyCenter');
        if (document.queryCommandState('justifyRight')) commands.add('justifyRight');
        if (document.queryCommandState('insertUnorderedList')) commands.add('insertUnorderedList');
        if (document.queryCommandState('insertOrderedList')) commands.add('insertOrderedList');
        setActiveCommands(commands);
    }, []);

    useEffect(() => {
        const editor = editorRef.current;
        const handleSelectionChange = () => {
            if (document.activeElement === editor) {
                updateActiveCommands();
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [updateActiveCommands]);

    const handleSave = () => {
        if (!title.trim()) {
            toast({
                title: "Title is required",
                description: "Please enter a title for your page.",
                variant: "destructive",
            });
            return;
        }

        const newPage = {
            title: title.trim(),
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            content: editorRef.current?.innerHTML || '',
            excerpt: '',
            template: template as any,
            status: 'draft' as const,
            author: 'albiz',
            featuredImage: undefined,
            media: [],
            seo: {
                title: seoTitle.trim() || title.trim(),
                description: seoDescription.trim(),
                keywords: []
            },
            settings: {
                visibility: visibility,
                allowComments: true,
                customCSS: undefined
            },
            blocks: []
        };

        dispatch(addPage(newPage));
        toast({
            title: "Page Saved!",
            description: "Your new page has been saved as a draft.",
        });
        router.push('/content/pages/all');
    };

    const handleBack = () => {
        router.back();
    };

    const editorContextValue = {
        handleFormat,
        activeCommands
    };

    return (
        <EditorContext.Provider value={editorContextValue}>
            <TooltipProvider>
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <div className="px-6 py-4">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={handleBack}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold text-gray-900">Add page</span>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Title and Content Section */}
                                <Card className="bg-white rounded-lg shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            {/* Title Section */}
                                            <div className="space-y-2">
                                                <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
                                                <div className="relative">
                                                    <Input 
                                                        id="title" 
                                                        placeholder="e.g., about us, sizing chart, FAQ"
                                                        value={title} 
                                                        onChange={(e) => setTitle(e.target.value)} 
                                                        className="pr-10 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                                    >
                                                        <Sparkles className="h-4 w-4 text-blue-500" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="space-y-4">
                                                <Label className="text-sm font-medium text-gray-700">Content</Label>
                                            
                                            {/* Toolbar */}
                                            <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-lg border">
                                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                                    <Sparkles className="h-3 w-3 text-blue-500" />
                                                </Button>
                                                <Separator orientation="vertical" className="h-5" />
                                                <Select defaultValue="p" onValueChange={(value) => handleFormat('formatBlock', value)}>
                                                    <SelectTrigger className="w-auto h-7 border-0 bg-transparent text-xs">
                                                        <SelectValue placeholder="Paragraph" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="p">Paragraph</SelectItem>
                                                        <SelectItem value="h1">Heading 1</SelectItem>
                                                        <SelectItem value="h2">Heading 2</SelectItem>
                                                        <SelectItem value="h3">Heading 3</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Separator orientation="vertical" className="h-5" />
                                                <ToolbarButton command="bold" icon={Bold} tooltip="Bold" />
                                                <ToolbarButton command="italic" icon={Italic} tooltip="Italic" />
                                                <ToolbarButton command="underline" icon={Underline} tooltip="Underline" />
                                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                                    <span className="text-xs font-bold">A</span>
                                                </Button>
                                                <Separator orientation="vertical" className="h-5" />
                                                <ToolbarButton command="justifyLeft" icon={AlignLeft} tooltip="Align Left" />
                                                <ToolbarButton command="justifyCenter" icon={AlignCenter} tooltip="Align Center" />
                                                <ToolbarButton command="justifyRight" icon={AlignRight} tooltip="Align Right" />
                                                <ToolbarButton command="insertUnorderedList" icon={List} tooltip="Bullet List" />
                                                <ToolbarButton command="insertOrderedList" icon={ListOrdered} tooltip="Numbered List" />
                                                <Separator orientation="vertical" className="h-5" />
                                                <ToolbarButton command="" icon={LinkIcon} tooltip="Insert Link" />
                                                <ToolbarButton command="" icon={ImageIcon} tooltip="Insert Image" />
                                                <ToolbarButton command="" icon={Video} tooltip="Insert Video" />
                                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                                    <MoreHorizontal className="h-3 w-3" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 ml-auto">
                                                    <span className="text-xs">&lt;/&gt;</span>
                                                </Button>
                                            </div>
                                            
                                                {/* Editor */}
                                                <div
                                                    ref={editorRef}
                                                    contentEditable
                                                    className="min-h-[250px] w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
                                                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                                    onBlur={updateActiveCommands}
                                                    onFocus={updateActiveCommands}
                                                    onClick={updateActiveCommands}
                                                    onKeyUp={updateActiveCommands}
                                                    data-placeholder="Start writing your content here..."
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Search Engine Listing Section */}
                                <Card className="bg-white rounded-lg shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium text-gray-700">Search engine listing</Label>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                    <Edit3 className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </div>
                                            <p className="text-sm text-gray-500">Add a title and description to see how this page might appear in a search engine listing</p>
                                            <div className="space-y-3">
                                                <Input 
                                                    placeholder="SEO Title"
                                                    value={seoTitle}
                                                    onChange={(e) => setSeoTitle(e.target.value)}
                                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                />
                                                <Textarea 
                                                    placeholder="SEO Description"
                                                    value={seoDescription}
                                                    onChange={(e) => setSeoDescription(e.target.value)}
                                                    className="min-h-[60px] border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6">
                                {/* Visibility Section */}
                                <Card className="bg-white rounded-lg shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium text-gray-700">Visibility</Label>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                    <Calendar className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        id="public"
                                                        name="visibility"
                                                        value="public"
                                                        checked={visibility === 'public'}
                                                        onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                                                        className="h-4 w-4 text-blue-600"
                                                    />
                                                    <Label htmlFor="public" className="text-sm">Visible</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="radio"
                                                        id="private"
                                                        name="visibility"
                                                        value="private"
                                                        checked={visibility === 'private'}
                                                        onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                                                        className="h-4 w-4 text-blue-600"
                                                    />
                                                    <Label htmlFor="private" className="text-sm">Hidden</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Template Section */}
                                <Card className="bg-white rounded-lg shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium text-gray-700">Template</Label>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                    <Eye className="h-4 w-4 text-gray-500" />
                                                </Button>
                                            </div>
                                            <Select value={template} onValueChange={setTemplate}>
                                                <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select template" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="default-page">Default page</SelectItem>
                                                    <SelectItem value="homepage">Homepage</SelectItem>
                                                    <SelectItem value="about">About</SelectItem>
                                                    <SelectItem value="contact">Contact</SelectItem>
                                                    <SelectItem value="landing">Landing Page</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end mt-8">
                            <Button 
                                onClick={handleSave}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg shadow-sm"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </EditorContext.Provider>
    );
}
