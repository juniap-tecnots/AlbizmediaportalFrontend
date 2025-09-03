
'use client'

import { useState, useRef, KeyboardEvent } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription
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
import { ChevronDown, ChevronUp, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDispatch, useSelector } from "react-redux"
import { addArticle } from "@/lib/redux/slices/articlesSlice"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { selectImages } from "@/lib/redux/slices/mediaSlice"

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

export default function NewArticlePage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
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
    
    const [featuredImage, setFeaturedImage] = useState<string>('');
    const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false);
    const mediaImages = useSelector(selectImages);


    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    };

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
    
    const handleSelectFeaturedImage = (src: string) => {
        setFeaturedImage(src);
        setIsMediaDialogOpen(false);
    }
    
    const resetForm = () => {
        setTitle('');
        setSlug('');
        setContent('');
        setTags([]);
        setTagInput('');
        setSelectedCategories(['uncategorized']);
        setExcerpt('');
        setFeaturedImage('');
        setStatus('Draft');
        setVisibility('public');
    }

    const handlePublish = () => {
        const articleData = {
            title,
            slug,
            content,
            status,
            categories: selectedCategories.map(cId => allCategories.find(c => c.id === cId)?.label || ''),
            tags,
            visibility,
            excerpt,
            featuredImage: featuredImage,
            blocks: [{ id: '1', type: 'paragraph', content: content }]
        };
        dispatch(addArticle(articleData as any));
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
            <CardHeader>
                <CardTitle>Create New Article</CardTitle>
                <CardDescription>Fill in the details below to create a new article.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter article title" value={title} onChange={handleTitleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" placeholder="article-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt (Subtitle)</Label>
                    <Textarea id="excerpt" placeholder="A brief summary of the article" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="Write your article content here..." value={content} onChange={(e) => setContent(e.target.value)} rows={15} />
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={handlePublish}>Publish Article</Button>
            </CardFooter>
        </Card>
      </div>

      <div className="space-y-6 lg:sticky top-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between p-4">
                <CardTitle className="text-base">Publish</CardTitle>
                 <Button size="sm" onClick={handlePublish}>Publish</Button>
            </CardHeader>
             <CardContent className="p-4 space-y-4">
                 <Button variant="outline" size="sm" className="w-full">Save draft</Button>
                 <Button variant="outline" size="sm" className="w-full">Preview</Button>
                 <Separator />
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
             </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
                <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" onClick={() => setIsMediaDialogOpen(true)}>Set featured image</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                            <DialogTitle>Select a Featured Image</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[500px] border rounded-md">
                            <div className="grid grid-cols-4 gap-4 p-4">
                                {mediaImages.map((item) => (
                                    <div key={item.id} className="relative aspect-square cursor-pointer" onClick={() => handleSelectFeaturedImage(item.src)}>
                                        <Image src={item.src} alt={item.alt} fill className="object-cover rounded-md" data-ai-hint={item['data-ai-hint']} />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                {featuredImage && (
                    <div className="mt-4 space-y-2">
                        <Image src={featuredImage} alt="Featured Image Preview" width={300} height={200} className="w-full h-auto rounded-md" />
                        <Button variant="link" size="sm" className="p-0 h-auto text-destructive" onClick={() => setFeaturedImage('')}>
                            Remove featured image
                        </Button>
                    </div>
                )}
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

    