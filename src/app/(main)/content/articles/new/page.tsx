
'use client'

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
import { GalleryHorizontal, Heading, Image as ImageIcon, List, Pilcrow, Plus, PlusCircle, Quote, Search } from "lucide-react"

export default function NewArticlePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
            <CardContent className="p-4">
                 <Input
                    placeholder="Add title"
                    className="border-none text-2xl font-bold shadow-none focus-visible:ring-0"
                />
                <div className="relative">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size="icon" variant="ghost" className="absolute top-2 left-2 z-10 h-8 w-8">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <Tabs defaultValue="block">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="post">Post</TabsTrigger>
                                    <TabsTrigger value="block">Block</TabsTrigger>
                                </TabsList>
                                <TabsContent value="block">
                                    <div className="relative my-2">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search" className="pl-8" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                                            <Pilcrow />
                                            <span className="text-xs">Paragraph</span>
                                        </Button>
                                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                                            <List />
                                            <span className="text-xs">List</span>
                                        </Button>
                                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                                            <ImageIcon />
                                            <span className="text-xs">Image</span>
                                        </Button>
                                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                                            <GalleryHorizontal />
                                            <span className="text-xs">Gallery</span>
                                        </Button>
                                         <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                                            <Heading />
                                            <span className="text-xs">Heading</span>
                                        </Button>
                                        <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                                            <Quote />
                                            <span className="text-xs">Quote</span>
                                        </Button>
                                    </div>
                                    <Button className="w-full mt-2">Browse all</Button>
                                </TabsContent>
                                <TabsContent value="post">
                                     <div className="flex items-center justify-center h-32">
                                        <p className="text-muted-foreground">Post settings placeholder</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </PopoverContent>
                    </Popover>
                    <Textarea
                        placeholder="Type / to choose a block"
                        className="min-h-[300px] border-none shadow-none focus-visible:ring-0 pl-12 pt-2"
                    />
                </div>
            </CardContent>
        </Card>
      </div>

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
