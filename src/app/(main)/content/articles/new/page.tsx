
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
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown, ChevronUp, Eye, Send, Undo, Redo, Bold, Italic, Underline, Strikethrough, Link as LinkIcon, ImageIcon, Video, Smile, List, ListOrdered, Quote, Indent, Outdent, MoreHorizontal, Eraser, Palette, Highlighter, UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDispatch } from "react-redux"
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


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
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    
    const [labels, setLabels] = useState<string[]>([]);
    const [permalink, setPermalink] = useState('');
    const [location, setLocation] = useState('');

    const [isLabelsOpen, setIsLabelsOpen] = useState(true);
    const [isPublishedOpen, setIsPublishedOpen] = useState(true);
    const [isPermalinkOpen, setIsPermalinkOpen] = useState(true);
    const [isLocationOpen, setIsLocationOpen] = useState(true);
    const [isOptionsOpen, setIsOptionsOpen] = useState(true);

    const [activeCommands, setActiveCommands] = useState(new Set<string>());
    
    const editorRef = useRef<HTMLDivElement>(null);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [showVideoDialog, setShowVideoDialog] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const imageFileInputRef = useRef<HTMLInputElement>(null);
    const videoFileInputRef = useRef<HTMLInputElement>(null);

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
        const articleData = {
            title,
            slug,
            content: editorRef.current?.innerHTML || '',
            status: 'Published',
            categories: labels,
            tags: [],
            visibility: 'public',
            excerpt: '',
            featuredImage: '',
            blocks: [{ id: '1', type: 'paragraph', content: editorRef.current?.innerHTML || '' }]
        };
        dispatch(addArticle(articleData as any));
        toast({
          title: "Article Published!",
          description: "Your new article has been successfully published.",
        });
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
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const src = e.target?.result as string;
                if (type === 'image') {
                    handleFormat('insertImage', src);
                    setShowImageDialog(false);
                } else {
                    const videoElement = `<video controls src="${src}" width="100%"></video>`;
                    handleFormat('insertHTML', videoElement);
                    setShowVideoDialog(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSelectFilesClick = (type: 'image' | 'video') => {
        if (type === 'image') {
            imageFileInputRef.current?.click();
        } else {
            videoFileInputRef.current?.click();
        }
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
                        Publish
                    </Button>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 pt-6 items-start">
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <Input 
                                id="title" 
                                placeholder="Enter article title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="text-2xl border-0 focus-visible:ring-0 shadow-none p-0 h-auto"
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
                        />
                    </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 lg:sticky top-6">
                    <Card>
                        <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Post settings</h3>

                            <Collapsible open={isLabelsOpen} onOpenChange={setIsLabelsOpen} asChild>
                                <div className="border-b">
                                    <CollapsibleTrigger className="w-full py-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Labels</Label>
                                            {isLabelsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-4">
                                         <Input placeholder="Add a label..."/>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>

                            <Collapsible open={isPublishedOpen} onOpenChange={setIsPublishedOpen} asChild>
                                 <div className="border-b">
                                    <CollapsibleTrigger className="w-full py-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Published on</Label>
                                            {isPublishedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-4">
                                        <p className="text-sm text-gray-700">03/09/2025 12:11</p>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>
                            
                            <Collapsible open={isPermalinkOpen} onOpenChange={setIsPermalinkOpen} asChild>
                                 <div className="border-b">
                                    <CollapsibleTrigger className="w-full py-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Permalink</Label>
                                            {isPermalinkOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-4">
                                         <Input value={permalink} onChange={(e) => setPermalink(e.target.value)} />
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>

                            <Collapsible open={isLocationOpen} onOpenChange={setIsLocationOpen} asChild>
                                <div className="border-b">
                                    <CollapsibleTrigger className="w-full py-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Location</Label>
                                            {isLocationOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-4">
                                         <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>

                            <Collapsible open={isOptionsOpen} onOpenChange={setIsOptionsOpen} asChild>
                                <div>
                                    <CollapsibleTrigger className="w-full py-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Options</Label>
                                            {isOptionsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </div>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pb-4">
                                        <p className="text-sm text-gray-500">Further options here.</p>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>

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
