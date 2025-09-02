
'use client'

import { useState } from 'react';
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

const initialCategories = [
    { name: "Business", slug: "business", count: 5 },
    { name: "Life Style", slug: "life-style", count: 12 },
    { name: "Tech", slug: "tech", count: 8 },
    { name: "Uncategorized", slug: "uncategorized", count: 2 },
    { name: "World", slug: "world", count: 3 },
]

export default function CategoriesPage() {
    const [categories, setCategories] = useState(initialCategories);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    const handleAddCategory = () => {
        if (!name || !slug) return;
        setCategories([...categories, { name, slug, count: 0 }]);
        setName('');
        setSlug('');
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Add New Category</h3>
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" />
                <p className="text-sm text-muted-foreground">The name is how it appears on your site.</p>
            </div>
             <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} placeholder="category-slug" />
                 <p className="text-sm text-muted-foreground">The “slug” is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.</p>
            </div>
            <Button onClick={handleAddCategory}>Add New Category</Button>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-12"><Checkbox /></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category, index) => (
                    <TableRow key={index}>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell className="font-medium text-primary"><a href="#">{category.name}</a></TableCell>
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
