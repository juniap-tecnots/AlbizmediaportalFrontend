
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
import { MessageSquare, ArrowUpDown } from "lucide-react"

const articles = [
  {
    title: "Global Update",
    author: "albiz",
    categories: ["Uncategorized"],
    tags: [],
    comments: 0,
    date: "2025/09/01 at 6:07 am",
    status: "Published",
    views: 9,
  },
  {
    title: "One swallow does not make the spring",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Games"],
    comments: 1,
    date: "2025/09/01 at 5:40 am",
    status: "Published",
    views: 1256,
  },
  {
    title: "Tip of the day: That man again",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Team"],
    comments: 1,
    date: "2025/09/01 at 5:40 am",
    status: "Published",
    views: 4586,
  },
  {
    title: "Hibs and Ross County fans on final",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Color"],
    comments: 1,
    date: "2025/09/01 at 5:40 am",
    status: "Published",
    views: 4072,
  },
  {
    title: "Persuasion is often more effectual than force",
    author: "albiz",
    categories: ["Life Style"],
    tags: ["Content"],
    comments: 1,
    date: "2025/09/01 at 5:40 am",
    status: "Published",
    views: 2994,
  },
]

export default function AllArticlesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Select defaultValue="bulk-actions">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Bulk actions" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="bulk-actions">Bulk actions</SelectItem>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="delete">Move to Trash</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="secondary">Apply</Button>
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
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
            <span>59 items</span>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
                &laquo;
            </Button>
            <Button variant="outline" size="sm" disabled>
                &lsaquo;
            </Button>
            <span>
                <Input readOnly type="number" value="1" className="w-12 h-8 text-center" /> of 3
            </span>
             <Button variant="outline" size="sm">
                &rsaquo;
            </Button>
            <Button variant="outline" size="sm">
                &raquo;
            </Button>
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
                 <MessageSquare className="w-5 h-5" />
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Date <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>
                 <Button variant="ghost" size="sm">
                  Views <ArrowUpDown className="w-4 h-4 ml-2" />
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
                  {article.comments > 0 ? (
                     <div className="flex items-center justify-center bg-gray-700 text-white w-6 h-6 rounded">
                        {article.comments}
                     </div>
                  ) : '—'}
                </TableCell>
                <TableCell>
                    {article.status}<br/>
                    <span className="text-muted-foreground">{article.date}</span>
                </TableCell>
                <TableCell>{article.views.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
