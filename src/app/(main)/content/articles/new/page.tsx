
'use client'

import { useState } from "react"
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
import { GalleryHorizontal, Heading, Image as ImageIcon, List, Pilcrow, Plus, PlusCircle, Quote, Search, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type BlockType = 'paragraph' | 'heading' | 'list' | 'quote' | 'image' | 'gallery';

interface Block {
  id: string;
  type: BlockType;
  content: string;
}

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
    const [blocks, setBlocks] = useState<Block[]>([{ id: Date.now().toString(), type: 'paragraph', content: '' }]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
            <CardContent className="p-4 space-y-4">
                 <Input
                    placeholder="Add title"
                    className="border-none text-3xl font-bold shadow-none focus-visible:ring-0 h-auto"
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
                <Button size="sm">Publish</Button>
            </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Post Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label>Status</Label>
                <RadioGroup defaultValue="draft" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="draft" id="draft" />
                        <Label htmlFor="draft">Draft</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="published" id="published" />
                        <Label htmlFor="published">Published</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Visibility</Label>
              <Select defaultValue="public">
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
                <Input defaultValue="" placeholder="post-slug-here" />
            </div>

            <Separator />

             <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea placeholder="Add an excerpt..." />
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

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1 max-h-32 overflow-y-auto">
                <div className="flex items-center gap-2">
                    <Checkbox id="cat-uncategorized" />
                    <Label htmlFor="cat-uncategorized">Uncategorized</Label>
                </div>
                 <div className="flex items-center gap-2">
                    <Checkbox id="cat-life-style" />
                    <Label htmlFor="cat-life-style">Life Style</Label>
                </div>
            </div>
            <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                <PlusCircle className="mr-2" />
                Add new category
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
                <Input placeholder="Add a tag" />
                <Button variant="secondary">Add</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

    