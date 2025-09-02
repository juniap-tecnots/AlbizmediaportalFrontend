
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
import { ArrowUpDown } from "lucide-react"

const articles = [
  {
    title: "Global Update",
    author: "albiz",
    categories: ["Uncategorized"],
    tags: [],
    date: "2025/09/01 at 6:07 am",
    status: "Published",
  },
  {
    title: "One swallow does not make the spring",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Games"],
    date: "2025/09/01 at 5:40 am",
    status: "Published",
  },
  {
    title: "Tip of the day: That man again",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Team"],
    date: "2025/09/01 at 5:40 am",
    status: "Published",
  },
  {
    title: "Hibs and Ross County fans on final",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Color"],
    date: "2025/09/01 at 5:40 am",
    status: "Published",
  },
  {
    title: "Persuasion is often more effectual than force",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Content"],
    date: "2025/09/01 at 5:40 am",
    status: "Published",
  },
]

export default function PublishedPage() {
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
                <Button>Search Posts</Button>
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
                    <span className="text-muted-foreground">{article.date}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
            <span>5 items</span>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
                &laquo;
            </Button>
            <Button variant="outline" size="sm">
                &lsaquo;
            </Button>
            <span>
                <Input readOnly type="number" value="1" className="w-12 h-8 text-center" /> of 1
            </span>
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
