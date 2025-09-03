
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
import { ChevronDown, ChevronUp, Search, X, Rocket, Eye, Send, Calendar, MapPin, Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useDispatch } from "react-redux"
import { addArticle } from "@/lib/redux/slices/articlesSlice"
import { useToast } from "@/hooks/use-toast"

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
                    {/* Rich Text Editor Toolbar Placeholder */}
                    <div className="flex items-center gap-x-1 text-gray-600">
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 21.5L14 20.12l-2.47 2.47c-.19.19-.45.29-.71.29s-.52-.1-.71-.29l-3.18-3.18c-.39-.39-.39-1.02 0-1.41l3.18-3.18c.39-.39 1.02-.39 1.41 0L14 17.29l1.41-1.41c.39-.39 1.02-.39 1.41 0l4.29 4.29c.39.39.39 1.02 0 1.41l-1.41 1.41c-.2.2-.45.29-.71.29s-.51-.1-.71-.29zM2.93 11.29l3.18-3.18c.39-.39 1.02-.39 1.41 0L10 10.59l2.5-2.5c.39-.39.39-1.02 0-1.41L8.21 2.38c-.39-.39-1.02-.39-1.41 0L2.5 6.67c-.39.39-.39 1.02 0 1.41l.71.71c.2.2.45.29.71.29s.51-.1.71-.29zM19.5 2.5a.996.996 0 00-.71.29l-4.29 4.29c-.39-.39-.39 1.02 0 1.41l4.29 4.29c.39.39 1.02.39 1.41 0l4.29-4.29c.39-.39.39-1.02 0-1.41L20.21 2.79a.996.996 0 00-.71-.29z"/></svg></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M10.15 14.82L6.9 11.56c-.39-.39-1.02-.39-1.41 0c-.39.39-.39 1.02 0 1.41l3.96 3.96c.39.39 1.02.39 1.41 0l8.48-8.48c.39-.39.39-1.02 0-1.41c-.39-.39-1.02-.39-1.41 0z"/></svg></Button>
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8c-2.65 0-5.18.5-7.39 1.41c-.91.37-.82 1.63.15 1.81c1.88.36 4.23.63 6.74.63s4.86-.27 6.74-.63c.97-.18 1.06-1.44.15-1.81C17.68 8.5 15.15 8 12.5 8m0 9c-2.65 0-5.18.5-7.39 1.41c-.91.37-.82 1.63.15 1.81c1.88.36 4.23.63 6.74.63s4.86-.27 6.74-.63c.97-.18 1.06-1.44.15-1.81C17.68 17.5 15.15 17 12.5 17m0-9c2.65 0 5.18-.5 7.39-1.41c.91-.37.82-1.63-.15-1.81c-1.88-.36-4.23-.63-6.74-.63s-4.86.27-6.74-.63c-.97.18-1.06-1.44-.15-1.81C7.32 7.5 9.85 8 12.5 8"/></svg></Button>
                        <Select defaultValue="normal">
                            <SelectTrigger className="w-auto border-0 text-sm focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="heading1">Heading 1</SelectItem>
                                <SelectItem value="heading2">Heading 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="px-2 font-bold">B</Button>
                        <Button variant="ghost" size="sm" className="px-2 italic">I</Button>
                        <Button variant="ghost" size="sm" className="px-2 underline">U</Button>
                        <Button variant="ghost" size="sm" className="px-2 line-through">S</Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M10.59 13.41c.44.35.84.73 1.21 1.14c.22.23.22.59 0 .82c-.22.23-.59.23-.82 0c-.43-.43-.92-.81-1.48-1.12C8.36 13.52 7.41 13 6.5 13c-2.48 0-4.5 2.02-4.5 4.5S4.02 22 6.5 22c1.76 0 3.27-1.01 4.07-2.43c.4.19.82.33 1.27.42c.5.1 1 .06 1.43-.13c.43-.19.81-.51 1.09-.94c.28-.42.44-.92.44-1.42v-.12c0-.5-.16-1-.44-1.42c-.28-.42-.65-.75-1.09-.94c-.43-.19-.93-.23-1.43-.13c-.45.09-.87.23-1.27.42c-.25-.49-.44-1-.57-1.51c-.1-.36-.21-.72-.34-1.08c-.13-.37-.28-.73-.44-1.08c-.16-.35-.34-.7-.52-1.03c.57-.45 1.05-.98 1.4-1.59c.35-.6.5-1.28.5-2.02C12.5 4.02 10.48 2 8 2s-4.5 2.02-4.5 4.5c0 1.61 1.01 3 2.43 3.79c.14.07.28.15.42.23c-.15.34-.29.68-.42.99c-.13.31-.24.6-.35.88c-.68.1-.92.93-.43 1.43zM8 7c-1.1 0-2-.9-2-2.5s.9-2.5 2-2.5s2 .9 2 2.5S9.1 7 8 7m-.5 13c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5m8.5-1.5c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"/></svg></Button>
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 18H8.25C7.56 18 7 17.44 7 16.75V13.25C7 12.56 7.56 12 8.25 12h7.5C16.44 12 17 12.56 17 13.25v3.5c0 .69-.56 1.25-1.25 1.25M8 11c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m8 0c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"/></svg></Button>
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1m4.1 1.9h8V12h-8zM17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5"/></svg></Button>
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4zM4 17h9v2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v5.08c-.71-.34-1.46-.58-2.26-.69L20 5H4z"/></svg></Button>
                        <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5h16v2H4zm0 4h16v2H4zm0 4h10v2H4zm0 4h10v2H4z"/></svg></Button>
                         <Button variant="ghost" size="sm" className="px-2"><svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h10v2H4z"/></svg></Button>
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

    