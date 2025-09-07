
'use client'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllArticles, deleteArticle } from "@/lib/redux/slices/articlesSlice"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"


export default function AllArticlesPage() {
  const articles = useSelector(selectAllArticles);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    dispatch(deleteArticle(id));
    toast({
        title: "Article Deleted",
        description: "The article has been successfully deleted.",
        variant: 'destructive'
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Select defaultValue="all-dates">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All dates" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-dates">All dates</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="all-categories">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    <SelectItem value="uncategorized">Uncategorized</SelectItem>
                    <SelectItem value="life-style">Life Style</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="secondary">Filter</Button>
        </div>
        <div className="flex items-center gap-2">
            <Input placeholder="Search Posts" className="w-auto" />
            <Button variant="accent">Search Posts</Button>
        </div>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Title <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Date <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium text-primary">
                  <a href="#">{article.title}</a>
                </TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  {article.categories.map((cat, i) => (
                    <a href="#" key={i} className="text-primary hover:underline">{cat}</a>
                  ))}
                </TableCell>
                <TableCell>
                   {article.tags.length > 0 ? article.tags.map((tag, i) => (
                    <a href="#" key={i} className="text-primary hover:underline">{tag}</a>
                  )) : '—'}
                </TableCell>
                <TableCell>
                    {article.status}<br/>
                    <span className="text-muted-foreground">{new Date(article.date).toLocaleString()}</span>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Link href={`/content/articles/edit/${article.id}`}>
                            <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4 text-primary" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="icon" onClick={() => handleDelete(article.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
            <span>{articles.length} items</span>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
                &laquo;
            </Button>
            <Button variant="outline" size="sm" disabled>
                &lsaquo;
            </Button>
            <div className="flex items-center gap-2">
                <Input readOnly type="number" value="1" className="w-12 h-8 text-center" />
                <span>of 1</span>
            </div>
             <Button variant="outline" size="sm">
                &rsaquo;
            </Button>
            <Button variant="outline" size="sm">
                &raquo;
            </Button>
        </div>
      </div>
    </div>
  )
}
