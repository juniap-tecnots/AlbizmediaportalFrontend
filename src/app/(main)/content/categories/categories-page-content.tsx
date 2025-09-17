
'use client'

import { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, selectAllCategories } from '@/lib/redux/slices/categoriesSlice';

export default function CategoriesPageContent() {
    const dispatch = useDispatch();
    const categories = useSelector(selectAllCategories);
    
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [parentCategory, setParentCategory] = useState('none');
    const [description, setDescription] = useState('');
    const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

    // Function to generate slug from name
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    // Auto-generate slug when name changes (only if slug hasn't been manually edited)
    useEffect(() => {
        if (name && !isSlugManuallyEdited) {
            setSlug(generateSlug(name));
        }
    }, [name, isSlugManuallyEdited]);

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const handleSlugChange = (value: string) => {
        setSlug(value);
        setIsSlugManuallyEdited(true);
    };

    const handleAddCategory = () => {
        if (!name || !slug) return;
        dispatch(addCategory({ name, slug, description: description || '-', count: 0 }));
        setName('');
        setSlug('');
        setParentCategory('none');
        setDescription('');
        setIsSlugManuallyEdited(false);
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="md:col-span-1">
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Add New Category</h3>
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={e => handleNameChange(e.target.value)} placeholder="Category Name" />
                <p className="text-sm text-muted-foreground">The name is how it appears on your site.</p>
            </div>
                <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={e => handleSlugChange(e.target.value)} placeholder="category-slug" />
                    <p className="text-sm text-muted-foreground">The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens. Auto-generated from the name above.</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="parent-category">Parent Category</Label>
                <Select value={parentCategory} onValueChange={setParentCategory}>
                    <SelectTrigger id="parent-category">
                        <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categories.map(cat => (
                                <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Categories, unlike tags, can have a hierarchy. You might have a Jazz category, and under that have children categories for Bebop and Big Band. Totally optional.</p>
            </div>
                <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
                <p className="text-sm text-muted-foreground">The description is not prominent by default; however, some themes may show it.</p>
            </div>
            <Button onClick={handleAddCategory} variant="accent">Add New Category</Button>
        </div>
        </div>
        <div className="md:col-span-2">
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-12"><Checkbox /></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category, index) => (
                    <TableRow key={index}>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell className="font-medium text-primary"><a href="#">{category.name}</a></TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell className="text-right"><a href="#" className="text-primary hover:underline">{category.count}</a></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </div>
    </div>
  );
}
