
'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, Search, X, Rocket, Eye, Send, Calendar, MapPin, Settings2, Bold, Italic, Underline, Strikethrough, Link as LinkIcon, Image as ImageIcon, Video, Smile, List, ListOrdered, Quote, Indent, Outdent, Pilcrow, CaseSensitive, Palette, MoreHorizontal, Undo, Redo, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDispatch } from "react-redux"
import { addArticle } from "@/lib/redux/slices/articlesSlice"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialCategories = [
    { id: 'business', label: 'Business' },
    { id: 'life-style', label: 'Life Style' },
    { id: 'tech', label: 'Tech' },
    { id: 'uncategorized', label: 'Uncategorized' },
    { id: 'world', label: 'World' },
]

export default function NewArticlePage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    
    const [labels, setLabels] = useState<string[]>([]);
    const [labelInput, setLabelInput] = useState('');
    const [permalink, setPermalink] = useState('');
    const [location, setLocation] = useState('');

    const [isLabelsOpen, setIsLabelsOpen] = useState(true);
    const [isPublishedOpen, setIsPublishedOpen] = useState(true);
    const [isPermalinkOpen, setIsPermalinkOpen] = useState(true);
    const [isLocationOpen, setIsLocationOpen] = useState(true);
    const [isOptionsOpen, setIsOptionsOpen] = useState(true);
    

    const handlePublish = () => {
        const articleData = {
            title,
            slug,
            content,
            status: 'Published',
            categories: labels,
            tags: [],
            visibility: 'public',
            excerpt: '',
            featuredImage: '',
            blocks: [{ id: '1', type: 'paragraph', content: content }]
        };
        dispatch(addArticle(articleData as any));
        toast({
          title: "Article Published!",
          description: "Your new article has been successfully published.",
        });
    }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
        <header className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-2 flex-1">
                <Rocket className="w-5 h-5 text-primary" />
                <Input 
                    id="title" 
                    placeholder="Enter article title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="text-lg font-semibold border-0 focus-visible:ring-0 shadow-none p-0"
                />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                </Button>
                <Button onClick={handlePublish}>
                    <Send className="mr-2 h-4 w-4" />
                    Update
                </Button>
            </div>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 items-start">
            <div className="lg:col-span-3 bg-white rounded-lg border">
                <div className="p-2 border-b">
                    <div className="flex items-center gap-x-1 text-gray-600">
                        <Button variant="ghost" size="sm" className="px-2"><Undo className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="px-2"><Redo className="w-4 h-4" /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Select defaultValue="normal">
                            <SelectTrigger className="w-auto border-0 text-sm focus:ring-0">
                                <SelectValue placeholder="Normal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="heading1">Heading 1</SelectItem>
                                <SelectItem value="heading2">Heading 2</SelectItem>
                                <SelectItem value="heading3">Heading 3</SelectItem>
                            </SelectContent>
                        </Select>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="px-2"><Bold className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="sm" className="px-2"><Italic className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="sm" className="px-2"><Underline className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="sm" className="px-2"><Strikethrough className="w-4 h-4"/></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="px-2"><LinkIcon className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="sm" className="px-2"><ImageIcon className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="sm" className="px-2"><Video className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="sm" className="px-2"><Smile className="w-4 h-4"/></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="px-2">
                                    <List className="w-4 h-4"/>
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem><List className="w-4 h-4 mr-2"/>Bulleted list</DropdownMenuItem>
                                <DropdownMenuItem><ListOrdered className="w-4 h-4 mr-2"/>Numbered list</DropdownMenuItem>
                                <DropdownMenuItem><Quote className="w-4 h-4 mr-2"/>Quote</DropdownMenuItem>
                                <DropdownMenuItem><Outdent className="w-4 h-4 mr-2"/>Decrease indent</DropdownMenuItem>
                                <DropdownMenuItem><Indent className="w-4 h-4 mr-2"/>Increase indent</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" size="sm" className="px-2"><MoreHorizontal className="w-4 h-4"/></Button>

                    </div>
                </div>
                <div className="p-4">
                    <Textarea
                        id="content"
                        placeholder="Write your article content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={25}
                        className="border-0 focus-visible:ring-0 p-0 shadow-none resize-none"
                    />
                </div>
            </div>

            <div className="space-y-4 lg:sticky top-4">
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
  )
}
