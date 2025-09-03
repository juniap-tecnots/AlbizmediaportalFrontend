
'use client'

import { useState, useRef, KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, GalleryHorizontal, Heading, Image as ImageIcon, List, Pilcrow, Plus, PlusCircle, Quote, Search, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDispatch } from "react-redux"
import { addArticle } from "@/lib/redux/slices/articlesSlice"
import { useToast } from "@/hooks/use-toast"

type BlockType = 'paragraph' | 'heading' | 'list' | 'quote' | 'image' | 'gallery';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

const initialCategories = [
    { id: 'business', label: 'Business' },
    { id: 'life-style', label: 'Life Style' },
    { id: 'tech', label: 'Tech' },
    { id: 'uncategorized', label: 'Uncategorized' },
    { id: 'world', label: 'World' },
    { id: 'foods', label: 'Foods' },
    { id: 'games', label: 'Games' },
    { id: 'travel', label: 'Travel' },
]

const mostUsedTags = ['Color', 'World', 'Team', 'Games', 'Life Style', 'Travel', 'Foods', 'Content', 'Timeline', 'Tech'];


const blockTypes = [
    { type: 'paragraph', icon: Pilcrow, label: 'Paragraph' },
    { type: 'heading', icon: Heading, label: 'Heading' },
    { type: 'list', icon: List, label: 'List' },
    { type: 'quote', icon: Quote, label: 'Quote' },
    { type: 'image', icon: ImageIcon, label: 'Image' },
    { type: 'gallery', icon: GalleryHorizontal, label: 'Gallery' },
] as const;

const blockCategories = [
    { 
        name: 'Text', 
        blocks: blockTypes.filter(b => ['paragraph', 'heading', 'list', 'quote'].includes(b.type)) 
    },
    {
        name: 'Media',
        blocks: blockTypes.filter(b => ['image', 'gallery'].includes(b.type))
    }
]

function BlockComponent({ block, updateBlock, removeBlock }: { block: Block, updateBlock: (id: string, content: string) => void, removeBlock: (id: string) => void }) {
    const commonClasses = "w-full p-2 border-none focus:outline-none focus:ring-2 focus:ring-ring"
    switch (block.type) {
        case 'heading':
            return (
                <div className="relative group">
                    <Input
                        type="text"
                        placeholder="Heading"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className={cn(commonClasses, "text-2xl font-bold")}
                    />
                     <Button size="icon" variant="ghost" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeBlock(block.id)}><X className="h-4 w-4" /></Button>
                </div>
            )
        case 'list':
             return (
                <div className="relative group">
                    <Textarea
                        placeholder="List item..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className={cn(commonClasses, "leading-loose list-disc pl-8")}
                    />
                    <Button size="icon" variant="ghost" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeBlock(block.id)}><X className="h-4 w-4" /></Button>
                </div>
            )
        case 'quote':
             return (
                <div className="relative group">
                     <Textarea
                        placeholder="Quote..."
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className={cn(commonClasses, "border-l-4 border-primary pl-4 italic")}
                    />
                    <Button size="icon" variant="ghost" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeBlock(block.id)}><X className="h-4 w-4" /></Button>
                </div>
            )
        case 'image':
            return (
                <div className="relative group p-2">
                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-48">
                        <Button variant="outline">Upload Image</Button>
                    </div>
                     <Button size="icon" variant="ghost" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeBlock(block.id)}><X className="h-4 w-4" /></Button>
                </div>
            )
        case 'gallery':
            return (
                <div className="relative group p-2">
                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg h-48">
                        <Button variant="outline">Create Gallery</Button>
                    </div>
                     <Button size="icon" variant="ghost" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeBlock(block.id)}><X className="h-4 w-4" /></Button>
                </div>
            )
        default:
            return (
                 <div className="relative group">
                    <Textarea
                        placeholder="Type / to choose a block"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                        className={commonClasses}
                        rows={1}
                    />
                    <Button size="icon" variant="ghost" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => removeBlock(block.id)}><X className="h-4 w-4" /></Button>
                </div>
            )
    }
}


export default function NewArticlePage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [blocks, setBlocks] = useState<Block[]>([{ id: Date.now().toString(), type: 'paragraph', content: '' }]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isTagsOpen, setIsTagsOpen] = useState(true);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const tagInputRef = useRef<HTMLInputElement>(null);
    
    const [allCategories, setAllCategories] = useState(initialCategories);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['uncategorized']);
    const [categorySearch, setCategorySearch] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryInput, setNewCategoryInput] = useState('');

    const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');
    const [visibility, setVisibility] = useState<'public' | 'private' | 'password'>('public');
    const [excerpt, setExcerpt] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    };

    const addBlock = (type: BlockType) => {
        const newBlock: Block = { id: Date.now().toString(), type, content: '' };
        setBlocks([...blocks, newBlock]);
        setIsSheetOpen(false);
    }
    
    const updateBlock = (id: string, content: string) => {
        setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
    }

    const removeBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
    }
    
    const addTags = (tagsToAdd: string[]) => {
        const newTags = tagsToAdd
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0 && !tags.includes(tag));
        if (newTags.length > 0) {
            setTags([...tags, ...newTags]);
        }
    };
    
    const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTags(tagInput.split(','));
            setTagInput('');
        } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
        }
    };
    
    const handleAddMostUsedTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const addNewCategory = () => {
        if (newCategoryInput.trim() === '') return;
        const newCategory = {
            id: newCategoryInput.toLowerCase().replace(/\s+/g, '-'),
            label: newCategoryInput.trim(),
        };
        if (allCategories.some(cat => cat.id === newCategory.id)) {
            // Optional: handle category already exists error
            return;
        }
        setAllCategories([...allCategories, newCategory]);
        setSelectedCategories([...selectedCategories, newCategory.id]);
        setNewCategoryInput('');
        setIsAddingCategory(false);
    };

    const filteredCategories = allCategories.filter(category =>
        category.label.toLowerCase().includes(categorySearch.toLowerCase())
    );
    
    const resetForm = () => {
        setTitle('');
        setSlug('');
        setBlocks([{ id: Date.now().toString(), type: 'paragraph', content: '' }]);
        setTags([]);
        setTagInput('');
        setSelectedCategories(['uncategorized']);
        setExcerpt('');
        setStatus('Draft');
        setVisibility('public');
    }

    const handlePublish = () => {
        const articleData = {
            title,
            slug,
            blocks,
            status,
            categories: selectedCategories.map(cId => allCategories.find(c => c.id === cId)?.label || ''),
            tags,
            visibility,
            excerpt,
            featuredImage: '', // Add featured image logic later
        };
        dispatch(addArticle(articleData));
        toast({
          title: "Article Published!",
          description: "Your new article has been successfully published.",
        });
        resetForm();
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
            <CardContent className="p-4 space-y-4">
                 <Input
                    placeholder="Add title"
                    className="border-none text-3xl font-bold shadow-none focus-visible:ring-0 h-auto"
                    value={title}
                    onChange={handleTitleChange}
                />
                <div className="relative">
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-2">
                            <div className="p-2">
                                <Input placeholder="Search" className="mb-2" />
                                <div className="grid grid-cols-3 gap-2">
                                    {blockTypes.map(block => (
                                        <Button key={block.type} variant="outline" className="h-auto flex-col gap-2 p-4" onClick={() => addBlock(block.type)}>
                                            <block.icon />
                                            <span className="text-xs">{block.label}</span>
                                        </Button>
                                    ))}
                                </div>
                                <Button className="w-full mt-2" onClick={() => setIsSheetOpen(true)}>Browse all</Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    {blocks.map(block => (
                        <BlockComponent key={block.id} block={block} updateBlock={updateBlock} removeBlock={removeBlock} />
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>

       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Blocks</SheetTitle>
                     <div className="relative my-4">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search" className="pl-8" />
                    </div>
                </SheetHeader>
                <Tabs defaultValue="blocks">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="blocks">Blocks</TabsTrigger>
                        <TabsTrigger value="patterns">Patterns</TabsTrigger>
                    </TabsList>
                    <TabsContent value="blocks">
                        <div className="space-y-4 mt-4">
                            {blockCategories.map(category => (
                                <div key={category.name}>
                                    <h3 className="font-semibold mb-2">{category.name}</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {category.blocks.map(block => (
                                            <Button key={block.type} variant="outline" className="h-auto justify-start gap-3 p-4" onClick={() => addBlock(block.type)}>
                                                <block.icon className="text-primary" />
                                                <span className="text-sm">{block.label}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="patterns">
                        <div className="flex items-center justify-center h-48">
                            <p className="text-muted-foreground">Patterns coming soon.</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>

      <div className="space-y-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Save draft</Button>
                    <Button variant="outline" size="sm">Preview</Button>
                </div>
                <Button size="sm" onClick={handlePublish}>Publish</Button>
            </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Post Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label>Status</Label>
                <RadioGroup value={status} onValueChange={(v) => setStatus(v as any)} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Draft" id="draft" />
                        <Label htmlFor="draft">Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Published" id="published" />
                        <Label htmlFor="published">Published</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select value={visibility} onValueChange={(v) => setVisibility(v as any)}>
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
            <div className="space-y-2">
                <Label>Publish</Label>
                <Button variant="link" className="p-0 h-auto">Immediately</Button>
            </div>
             <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-slug-here" />
            </div>

            <Separator />

             <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea placeholder="Add an excerpt..." value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full">Set featured image</Button>
            </CardContent>
        </Card>

        <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen} asChild>
            <Card>
                <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-base">Categories</CardTitle>
                        {isCategoriesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="p-4 pt-0 space-y-4">
                        <div className="relative">
                            <Input 
                                placeholder="Search Categories" 
                                className="pl-8" 
                                value={categorySearch}
                                onChange={(e) => setCategorySearch(e.target.value)}
                            />
                            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        <ScrollArea className="h-40">
                            <div className="space-y-2 pr-4">
                                {filteredCategories.map(category => (
                                    <div key={category.id} className="flex items-center gap-2">
                                        <Checkbox 
                                            id={`cat-${category.id}`} 
                                            checked={selectedCategories.includes(category.id)}
                                            onCheckedChange={() => handleCategoryChange(category.id)}
                                        />
                                        <Label htmlFor={`cat-${category.id}`} className="font-normal">{category.label}</Label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        {!isAddingCategory ? (
                            <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => setIsAddingCategory(true)}>
                                Add New Category
                            </Button>
                        ) : (
                            <div className="space-y-2">
                                <Input 
                                    placeholder="New Category Name"
                                    value={newCategoryInput}
                                    onChange={(e) => setNewCategoryInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addNewCategory()}
                                />
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={addNewCategory}>Add New Category</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsAddingCategory(false)}>Cancel</Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>

        <Collapsible open={isTagsOpen} onOpenChange={setIsTagsOpen} asChild>
            <Card>
                <CollapsibleTrigger className="w-full">
                     <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-base">Tags</CardTitle>
                        {isTagsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="p-4 pt-0 space-y-4">
                        <div>
                            <Label htmlFor="tags-input" className="text-sm font-medium">ADD TAG</Label>
                            <div
                                onClick={() => tagInputRef.current?.focus()}
                                className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            >
                                {tags.map(tag => (
                                    <div key={tag} className="flex items-center gap-1 bg-secondary rounded-sm px-2 py-0.5 text-xs">
                                        <span>{tag}</span>
                                        <button onClick={() => removeTag(tag)} className="focus:outline-none">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                                <Input
                                    ref={tagInputRef}
                                    id="tags-input"
                                    placeholder={tags.length === 0 ? "Add a tag..." : ""}
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagInputKeyDown}
                                    className="h-auto flex-1 border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">Separate with commas or the Enter key.</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium mb-2">MOST USED</h4>
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {mostUsedTags.map(tag => (
                                    <Button
                                        key={tag}
                                        variant="link"
                                        size="sm"
                                        className="h-auto p-0 text-sm text-primary"
                                        onClick={() => handleAddMostUsedTag(tag)}
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
      </div>
    </div>
  )
}
