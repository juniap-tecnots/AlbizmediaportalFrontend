
'use client'

import React, { useState, useRef, useEffect, useCallback } from "react"
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
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown, ChevronUp, Eye, Send, Undo, Redo, Bold, Italic, Underline, Strikethrough, Link as LinkIcon, ImageIcon, Video, Smile, List, ListOrdered, Quote, Indent, Outdent, MoreHorizontal, Eraser, Palette, Highlighter, UploadCloud, X as XIcon, FileImage, Settings, Pen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDispatch, useSelector } from "react-redux"
import { addArticle } from "@/lib/redux/slices/articlesSlice"
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
                    className={cn("px-2", { 'bg-accent text-accent-foreground': activeCommands.has(command) })}
                    onMouseDown={handleClick}
                >
                    <Icon className="w-4 h-4"/>
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
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    
    const allCategories = useSelector(selectAllCategories);
    const allTags = useSelector(selectAllTags);
    
    const [categories, setCategories] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [newTag, setNewTag] = useState('');
    
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isTagsOpen, setIsTagsOpen] = useState(true);
    const [isExcerptOpen, setIsExcerptOpen] = useState(false);

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
            visibility: 'public',
            excerpt,
            featuredImage,
            discussion: 'Open'
        };
        dispatch(addArticle(articleData as any));
        toast({
          title: "Article Saved!",
          description: "Your new article has been saved as a draft.",
        });

        // Reset form
        setTitle('');
        setSubtitle('');
        setContent('');
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
        }
        setSlug('');
        setExcerpt('');
        setFeaturedImage('');
        setCategories([]);
        setTags([]);
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

    const editorContextValue = {
        handleFormat,
        activeCommands
    };

  return (
    <EditorContext.Provider value={editorContextValue}>
      <TooltipProvider>
        <div className="flex flex-col h-full bg-background p-4 md:p-6">
            <header className="flex items-center justify-between pb-4 border-b">
                 <h1 className="text-2xl font-bold">Add New Article</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                    </Button>
                    <Button onClick={handlePublish}>
                        <Send className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                     <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6 items-start">
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardContent className="p-0">
                           <Input 
                                id="title" 
                                placeholder="Add title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="text-xl font-bold border-0 focus-visible:ring-0 shadow-none p-4 h-auto"
                            />
                            <Input 
                                id="subtitle" 
                                placeholder="Add subtitle" 
                                value={subtitle} 
                                onChange={(e) => setSubtitle(e.target.value)} 
                                className="text-lg border-0 focus-visible:ring-0 shadow-none p-4 pt-0 h-auto"
                            />
                        </CardContent>
                    </Card>
                    <Card>
                         <div className="p-2 border-b">
                        <div className="flex items-center gap-x-1 text-gray-600 flex-wrap">
                             <Tooltip>
                                <TooltipTrigger asChild><Button variant="ghost" size="sm" className="px-2" onMouseDown={(e) => { e.preventDefault(); handleFormat('undo'); }}><Undo className="w-4 h-4" /></Button></TooltipTrigger>
                                <TooltipContent><p>Undo (Ctrl+Z)</p></TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild><Button variant="ghost" size="sm" className="px-2" onMouseDown={(e) => { e.preventDefault(); handleFormat('redo'); }}><Redo className="w-4 h-4" /></Button></TooltipTrigger>
                                <TooltipContent><p>Redo (Ctrl+Y)</p></TooltipContent>
                            </Tooltip>
                            <Separator orientation="vertical" className="h-6 mx-1" />
                            <Select defaultValue="p" onValueChange={(value) => handleFormat('formatBlock', value)}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <SelectTrigger className="w-auto border-0 text-sm focus:ring-0">
                                            <SelectValue placeholder="Normal" />
                                        </SelectTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Format</p></TooltipContent>
                                </Tooltip>
                                <SelectContent>
                                    <SelectItem value="p">Normal</SelectItem>
                                    <SelectItem value="h1">Heading 1</SelectItem>
                                    <SelectItem value="h2">Heading 2</SelectItem>
                                    <SelectItem value="h3">Heading 3</SelectItem>
                                    <SelectItem value="h4">Heading 4</SelectItem>
                                    <SelectItem value="h5">Heading 5</SelectItem>
                                    <SelectItem value="h6">Heading 6</SelectItem>
                                </SelectContent>
                            </Select>
                            <Separator orientation="vertical" className="h-6 mx-1" />
                            <ToolbarButton command="bold" icon={Bold} tooltip="Bold (Ctrl+B)" />
                            <ToolbarButton command="italic" icon={Italic} tooltip="Italic (Ctrl+I)" />
                            <ToolbarButton command="underline" icon={Underline} tooltip="Underline (Ctrl+U)" />
                            <ToolbarButton command="strikeThrough" icon={Strikethrough} tooltip="Strikethrough" />
                             <Separator orientation="vertical" className="h-6 mx-1" />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="px-2 relative">
                                        <Palette className="w-4 h-4"/>
                                        <input type="color" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onInput={(e) => handleFormat('foreColor', e.currentTarget.value)} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Text Color</p></TooltipContent>
                            </Tooltip>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                     <Button variant="ghost" size="sm" className="px-2 relative">
                                        <Highlighter className="w-4 h-4"/>
                                        <input type="color" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onInput={(e) => handleFormat('hiliteColor', e.currentTarget.value)} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Highlight Color</p></TooltipContent>
                            </Tooltip>
                            <Separator orientation="vertical" className="h-6 mx-1" />
                             <Tooltip>
                                <TooltipTrigger asChild><Button variant="ghost" size="sm" className="px-2"><LinkIcon className="w-4 h-4"/></Button></TooltipTrigger>
                                <TooltipContent><p>Insert Link</p></TooltipContent>
                            </Tooltip>
                            <ToolbarButton command="" icon={ImageIcon} tooltip="Insert Image" onClick={() => setShowImageDialog(true)} />
                            <ToolbarButton command="" icon={Video} tooltip="Insert Video" onClick={() => setShowVideoDialog(true)} />
                             <Tooltip>
                                <TooltipTrigger asChild><Button variant="ghost" size="sm" className="px-2"><Smile className="w-4 h-4"/></Button></TooltipTrigger>
                                <TooltipContent><p>Emoji</p></TooltipContent>
                            </Tooltip>
                            <Separator orientation="vertical" className="h-6 mx-1" />
                            <DropdownMenu>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="px-2">
                                                <MoreHorizontal className="w-4 h-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent><p>More options</p></TooltipContent>
                                </Tooltip>
                                <DropdownMenuContent>
                                    <div className="flex">
                                        <ToolbarButton command="justifyLeft" icon={AlignLeft} tooltip="Align Left" />
                                        <ToolbarButton command="justifyCenter" icon={AlignCenter} tooltip="Align Center" />
                                        <ToolbarButton command="justifyRight" icon={AlignRight} tooltip="Align Right" />
                                        <ToolbarButton command="justifyFull" icon={AlignJustify} tooltip="Justify" />
                                    </div>
                                    <DropdownMenuSeparator />
                                     <DropdownMenuItem onMouseDown={(e) => { e.preventDefault(); handleFormat('insertUnorderedList'); }}>
                                        <List className="w-4 h-4 mr-2"/>Bulleted list
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onMouseDown={(e) => { e.preventDefault(); handleFormat('insertOrderedList'); }}>
                                        <ListOrdered className="w-4 h-4 mr-2"/>Numbered list
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onMouseDown={(e) => { e.preventDefault(); handleFormat('formatBlock', 'blockquote'); }}>
                                        <Quote className="w-4 h-4 mr-2"/>Quote
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onMouseDown={(e) => { e.preventDefault(); handleFormat('outdent'); }}>
                                        <Outdent className="w-4 h-4 mr-2"/>Decrease indent
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onMouseDown={(e) => { e.preventDefault(); handleFormat('indent'); }}>
                                        <Indent className="w-4 h-4 mr-2"/>Increase indent
                                    </DropdownMenuItem>
                                     <DropdownMenuSeparator />
                                     <DropdownMenuItem onMouseDown={(e) => { e.preventDefault(); handleFormat('removeFormat'); }}>
                                        <Eraser className="w-4 h-4 mr-2"/>Clear formatting
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <CardContent className="p-4 min-h-[400px]">
                        <div
                            ref={editorRef}
                            contentEditable
                            className="w-full h-full border-0 focus-visible:ring-0 p-0 shadow-none resize-none focus:outline-none"
                            onInput={(e) => setContent(e.currentTarget.innerHTML)}
                            onBlur={updateActiveCommands}
                            onFocus={updateActiveCommands}
                            onClick={updateActiveCommands}
                            onKeyUp={updateActiveCommands}
                            placeholder="Type '/' for commands"
                        />
                    </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 lg:sticky top-6">
                    <Card>
                        <CardContent className="p-0">
                            <div className="flex items-center justify-between border-b px-4 py-2">
                                <h3 className="text-base font-semibold">Post</h3>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <XIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Pen className="h-4 w-4" />
                                    <span>{title || 'No title'}</span>
                                    <MoreHorizontal className="h-4 w-4 ml-auto" />
                                </div>

                                {featuredImage ? (
                                    <div className="relative">
                                        <Image src={featuredImage} alt="Featured image" width={300} height={200} className="rounded-md w-full h-auto" />
                                        <Button variant="secondary" className="w-full mt-2" onClick={() => handleSelectFilesClick('featured')}>Change image</Button>
                                    </div>
                                ) : (
                                    <Button variant="outline" className="w-full" onClick={() => handleSelectFilesClick('featured')}>
                                        Set featured image
                                    </Button>
                                )}
                                 <input
                                    type="file"
                                    ref={featuredImageInputRef}
                                    onChange={(e) => handleFileChange(e, 'featured')}
                                    className="hidden"
                                    accept="image/*"
                                />

                                <button onClick={() => setIsExcerptOpen(true)} className="text-primary text-sm hover:underline">Add an excerpt...</button>
                                
                                <Separator />

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Status</span><span className="font-medium">Draft</span></div>
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-1/2 h-8 text-right border-0" placeholder="auto-generates" />
                                    </div>
                                    <div className="flex justify-between"><span>Author</span><span className="font-medium">albiz</span></div>
                                </div>
                                
                                <Separator />
                                
                                <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
                                    <CollapsibleTrigger className="w-full flex justify-between text-sm font-medium">
                                        <span>Categories</span>
                                        {isCategoriesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2 space-y-2">
                                         <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {allCategories.map(cat => (
                                                <div key={cat.slug} className="flex items-center gap-2">
                                                    <input type="checkbox" id={`cat-${cat.slug}`} checked={categories.includes(cat.name)} onChange={() => handleToggleCategory(cat.name)} />
                                                    <Label htmlFor={`cat-${cat.slug}`}>{cat.name}</Label>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="#" className="text-primary text-sm hover:underline mt-2 inline-block">Add new category</a>
                                    </CollapsibleContent>
                                </Collapsible>

                                <Separator />

                                <Collapsible open={isTagsOpen} onOpenChange={setIsTagsOpen}>
                                    <CollapsibleTrigger className="w-full flex justify-between text-sm font-medium">
                                        <span>Tags</span>
                                        {isTagsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2">
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                                    {tag}
                                                    <button onClick={() => handleRemoveTag(tag)}><XIcon className="h-3 w-3" /></button>
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Input 
                                                placeholder="Add new tag" 
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                                            />
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                                
                                <Separator />
                                 <Collapsible open={isExcerptOpen} onOpenChange={setIsExcerptOpen}>
                                    <CollapsibleTrigger className="w-full flex justify-between text-sm font-medium">
                                        <span>Excerpt</span>
                                        {isExcerptOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="mt-2">
                                        <Textarea 
                                            placeholder="Write an excerpt (optional)"
                                            value={excerpt}
                                            onChange={(e) => setExcerpt(e.target.value)}
                                        />
                                    </CollapsibleContent>
                                </Collapsible>

                            </div>
                        </CardContent>
                    </Card>
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
