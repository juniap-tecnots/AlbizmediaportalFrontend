
'use client'

import React, { useState, useRef, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
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
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown, ChevronUp, Eye, Send, Undo, Redo, Bold, Italic, Underline, Strikethrough, Link as LinkIcon, ImageIcon, Video, Smile, List, ListOrdered, Quote, Indent, Outdent, MoreHorizontal, Eraser, Palette, Highlighter, UploadCloud, X as XIcon, FileImage, Settings, Pen, ArrowLeft, Sparkles, Calendar, Edit3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDispatch, useSelector } from "react-redux"
import { addArticle } from "@/lib/redux/slices/articlesSlice"
import { selectCurrentUser } from "@/lib/redux/slices/authSlice"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { selectAllCategories, selectAllTags } from "@/lib/redux/slices/categoriesSlice"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

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

export default function NewArticlePage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    
    const allCategories = useSelector(selectAllCategories);
    const allTags = useSelector(selectAllTags);
    const currentUser = useSelector(selectCurrentUser);

    // Slug generation function
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    // Auto-generate slug when title changes
    useEffect(() => {
        if (title && !isSlugManuallyEdited) {
            setSlug(generateSlug(title));
        }
    }, [title, isSlugManuallyEdited]);
    
    const [categories, setCategories] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [newTag, setNewTag] = useState('');
    const [themeTemplate, setThemeTemplate] = useState('default-blog-post');
    
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isTagsOpen, setIsTagsOpen] = useState(true);
    const [isExcerptOpen, setIsExcerptOpen] = useState(false);
    const [isSeoOpen, setIsSeoOpen] = useState(false);
    const [visibility, setVisibility] = useState<'visible' | 'hidden'>('hidden');

    const [activeCommands, setActiveCommands] = useState(new Set<string>());
    
    const editorRef = useRef<HTMLDivElement>(null);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showVideoDialog, setShowVideoDialog] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const imageFileInputRef = useRef<HTMLInputElement>(null);
    const videoFileInputRef = useRef<HTMLInputElement>(null);
    const featuredImageInputRef = useRef<HTMLInputElement>(null);

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
        if (document.queryCommandState('strikeThrough')) commands.add('strikeThrough');
        if (document.queryCommandState('justifyLeft')) commands.add('justifyLeft');
        if (document.queryCommandState('justifyCenter')) commands.add('justifyCenter');
        if (document.queryCommandState('justifyRight')) commands.add('justifyRight');
        if (document.queryCommandState('justifyFull')) commands.add('justifyFull');
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

    const handlePublish = () => {
        if (!title.trim()) {
            toast({
                title: "Title is required",
                description: "Please enter a title for your article.",
                variant: "destructive",
            });
            return;
        }

        const articleData = {
            title,
            subtitle,
            slug,
            content: editorRef.current?.innerHTML || '',
            categories,
            tags,
            visibility: visibility === 'visible' ? 'public' : 'private',
            excerpt,
            featuredImage,
            discussion: 'Open',
            themeTemplate,
            author: getAuthorDisplayName()
        };
        dispatch(addArticle(articleData as any));
        toast({
          title: "Article Saved!",
          description: "Your new article has been saved as In-progress.",
        });

        // Reset form
        setTitle('');
        setSubtitle('');
        setContent('');
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
        }
        setSlug('');
        setIsSlugManuallyEdited(false);
        setExcerpt('');
        setFeaturedImage('');
        setCategories([]);
        setTags([]);
        setThemeTemplate('default-blog-post');
        setVisibility('hidden');
    };

    // Handler functions for title and slug
    const handleTitleChange = (value: string) => {
        setTitle(value);
    };

    const handleSlugChange = (value: string) => {
        setSlug(value);
        setIsSlugManuallyEdited(true); // Set flag when slug is manually edited
    };

    const handleInsertImage = () => {
        if (imageUrl) {
            handleFormat('insertImage', imageUrl);
        }
        setShowImageDialog(false);
        setImageUrl('');
    };

    const handleInsertVideo = () => {
        if (videoUrl) {
            const videoElement = `<video controls src="${videoUrl}" width="100%"></video>`;
            handleFormat('insertHTML', videoElement);
        }
        setShowVideoDialog(false);
        setVideoUrl('');
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'featured') => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const src = e.target?.result as string;
                if (type === 'image') {
                    handleFormat('insertImage', src);
                    setShowImageDialog(false);
                } else if (type === 'video') {
                    const videoElement = `<video controls src="${src}" width="100%"></video>`;
                    handleFormat('insertHTML', videoElement);
                    setShowVideoDialog(false);
                } else if (type === 'featured') {
                    setFeaturedImage(src);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectFilesClick = (type: 'image' | 'video' | 'featured') => {
        if (type === 'image') {
            imageFileInputRef.current?.click();
        } else if (type === 'video') {
            videoFileInputRef.current?.click();
        } else if (type === 'featured') {
            featuredImageInputRef.current?.click();
        }
    };
    
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    const handleToggleCategory = (categoryName: string) => {
        setCategories(prev => 
            prev.includes(categoryName)
                ? prev.filter(c => c !== categoryName)
                : [...prev, categoryName]
        );
    };

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const getAuthorDisplayName = () => {
        if (currentUser) {
            return `${currentUser.firstName} ${currentUser.lastName}`;
        }
        return 'Unknown User';
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
            <header className="px-6 py-4">
                <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                        <h1 className="text-xl font-semibold">Create New Article</h1>
                </div>
                <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                        <Button onClick={handlePublish} size="sm">
                        <Send className="mr-2 h-4 w-4" />
                            Publish
                    </Button>
                    </div>
                </div>
            </header>

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
                                                placeholder="e.g., Blog about your latest products or deals"
                                value={title} 
                                onChange={(e) => handleTitleChange(e.target.value)} 
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

                                    {/* Slug Section */}
                                    <div className="space-y-2">
                                        <Label htmlFor="slug" className="text-sm font-medium text-gray-700">Slug</Label>
                                        <Input 
                                            id="slug" 
                                            placeholder="Auto-generated from title"
                                            value={slug} 
                                            onChange={(e) => handleSlugChange(e.target.value)} 
                                            className="text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <p className="text-xs text-gray-500">URL-friendly version of your title. Auto-generated but can be customized.</p>
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
                                            <ToolbarButton command="" icon={ImageIcon} tooltip="Insert Image" onClick={() => setShowImageDialog(true)} />
                                            <ToolbarButton command="" icon={Video} tooltip="Insert Video" onClick={() => setShowVideoDialog(true)} />
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

                        {/* Excerpt Section */}
                        <Card className="bg-white rounded-lg shadow-sm">
                            <CardContent className="p-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-medium text-gray-700">Excerpt</Label>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                            <Edit3 className="h-4 w-4 text-gray-500" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500">Add a summary of the post to appear on your home page or blog.</p>
                                    <Textarea 
                                        placeholder="Write an excerpt..."
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        className="min-h-[80px] border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
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
                                    <p className="text-sm text-gray-500">Add a title and description to see how this blog post might appear in a search engine listing</p>
                                    <div className="space-y-3">
                                        <Input 
                                            placeholder="SEO Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <Textarea 
                                            placeholder="SEO Description"
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                            className="min-h-[60px] border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                    </CardContent>
                    </Card>
                </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Combined Sidebar Card */}
                        <Card className="bg-white rounded-lg shadow-sm">
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {/* Visibility Section */}
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
                                                    id="visible"
                                                    name="visibility"
                                                    value="visible"
                                                    checked={visibility === 'visible'}
                                                    onChange={(e) => setVisibility(e.target.value as 'visible' | 'hidden')}
                                                    className="h-4 w-4 text-blue-600"
                                                />
                                                <Label htmlFor="visible" className="text-sm">Visible</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    id="hidden"
                                                    name="visibility"
                                                    value="hidden"
                                                    checked={visibility === 'hidden'}
                                                    onChange={(e) => setVisibility(e.target.value as 'visible' | 'hidden')}
                                                    className="h-4 w-4 text-blue-600"
                                                />
                                                <Label htmlFor="hidden" className="text-sm">Hidden</Label>
                                            </div>
                                        </div>
                                </div>

                                    {/* Image Section */}
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium text-gray-700">Image</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                            <Button 
                                                variant="outline" 
                                                onClick={() => handleSelectFilesClick('featured')}
                                                className="mb-2"
                                            >
                                                Add image
                                            </Button>
                                            <p className="text-sm text-gray-500">or drop an image to upload</p>
                                    </div>
                                 <input
                                    type="file"
                                    ref={featuredImageInputRef}
                                    onChange={(e) => handleFileChange(e, 'featured')}
                                    className="hidden"
                                    accept="image/*"
                                />
                                        {featuredImage && (
                                            <div className="mt-4">
                                                <Image src={featuredImage} alt="Featured image" width={300} height={200} className="rounded-md w-full h-auto" />
                                    </div>
                                        )}
                                </div>
                                
                                    {/* Organization Section */}
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium text-gray-700">Organization</Label>
                                        
                                        {/* Author Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="author" className="text-sm font-medium text-gray-700">Author</Label>
                                            <Input 
                                                id="author"
                                                value={getAuthorDisplayName()}
                                                readOnly
                                                className="bg-gray-50 text-gray-600 cursor-not-allowed"
                                            />
                                        </div>

                                        {/* Category Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                                            <Select value={categories.length > 0 ? categories[0] : ""} onValueChange={(value) => {
                                                if (value && !categories.includes(value)) {
                                                    setCategories([value]);
                                                }
                                            }}>
                                                <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {allCategories.map((category: any) => (
                                                        <SelectItem key={category.slug} value={category.name}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Tags Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">Tags</Label>
                                            <Select value={tags.length > 0 ? tags[0] : ""} onValueChange={(value) => {
                                                if (value && !tags.includes(value)) {
                                                    setTags([value]);
                                                }
                                            }}>
                                                <SelectTrigger className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                                                    <SelectValue placeholder="Select tags" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {allTags.map((tag: any) => (
                                                        <SelectItem key={tag.slug} value={tag.name}>
                                                            {tag.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                </div>
            </div>
        </div>

        <AlertDialog open={showImageDialog} onOpenChange={setShowImageDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Insert Image</AlertDialogTitle>
                </AlertDialogHeader>
                <Tabs defaultValue="url">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url">From URL</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                        <div className="py-4">
                             <Input
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleInsertImage()}
                            />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setImageUrl('')}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleInsertImage}>Insert</AlertDialogAction>
                        </AlertDialogFooter>
                    </TabsContent>
                    <TabsContent value="upload">
                        <div className="py-4">
                            <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center">
                                <div className="flex flex-col items-center gap-4">
                                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                    <p className="text-muted-foreground">Drag 'n' drop an image here, or click to select</p>
                                    <Button variant="outline" onClick={() => handleSelectFilesClick('image')}>Select File</Button>
                                    <input
                                        type="file"
                                        ref={imageFileInputRef}
                                        onChange={(e) => handleFileChange(e, 'image')}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Insert Video</AlertDialogTitle>
                </AlertDialogHeader>
                <Tabs defaultValue="url">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url">From URL</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                        <div className="py-4">
                            <Input
                                placeholder="https://example.com/video.mp4"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleInsertVideo()}
                            />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setVideoUrl('')}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleInsertVideo}>Insert</AlertDialogAction>
                        </AlertDialogFooter>
                    </TabsContent>
                     <TabsContent value="upload">
                        <div className="py-4">
                            <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center">
                                <div className="flex flex-col items-center gap-4">
                                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                    <p className="text-muted-foreground">Drag 'n' drop a video here, or click to select</p>
                                    <Button variant="outline" onClick={() => handleSelectFilesClick('video')}>Select File</Button>
                                    <input
                                        type="file"
                                        ref={videoFileInputRef}
                                        onChange={(e) => handleFileChange(e, 'video')}
                                        className="hidden"
                                        accept="video/*"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </AlertDialogContent>
        </AlertDialog>
      </TooltipProvider>
    </EditorContext.Provider>
  )
}
