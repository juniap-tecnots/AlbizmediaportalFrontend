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
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Pencil, Trash2, Eye, Calendar } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { selectAllPages, deletePage, publishPage, archivePage } from "@/lib/redux/slices/pagesSlice"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AllPagesPage() {
  const pages = useSelector(selectAllPages);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleDelete = (id: string) => {
    dispatch(deletePage(id));
    toast({
        title: "Page Deleted",
        description: "The page has been successfully deleted.",
        variant: 'destructive'
    })
  }

  const handlePublish = (id: string) => {
    dispatch(publishPage(id));
    toast({
        title: "Page Published",
        description: "The page has been published successfully."
    });
  }

  const handleArchive = (id: string) => {
    dispatch(archivePage(id));
    toast({
        title: "Page Archived",
        description: "The page has been archived."
    });
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Select defaultValue="all-templates">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Templates" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-templates">All Templates</SelectItem>
                    <SelectItem value="homepage">Homepage</SelectItem>
                    <SelectItem value="about">About</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="landing">Landing</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue="all-status">
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-status">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="secondary">Filter</Button>
        </div>
        <div className="flex items-center gap-2">
            <Input placeholder="Search Pages" className="w-auto" />
            <Button variant="accent">Search</Button>
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
              <TableHead>Template</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Updated <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <a href="#" className="hover:underline">{page.title}</a>
                    <p className="text-sm text-muted-foreground">/{page.slug}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{page.template}</Badge>
                </TableCell>
                <TableCell>
                  {getStatusBadge(page.status)}
                </TableCell>
                <TableCell>{page.author}</TableCell>
                <TableCell>
                    <span className="text-muted-foreground">{new Date(page.updatedAt).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/content/pages/edit/${page.id}`}>
                            <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                        {page.status === 'draft' && (
                            <Button variant="outline" size="icon" onClick={() => handlePublish(page.id)} className="h-8 w-8 text-purple-500 border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 hover:text-purple-600">
                                <Calendar className="h-4 w-4" />
                            </Button>
                        )}
                        <Button variant="outline" size="icon" onClick={() => handleDelete(page.id)} className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
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
            <span>{pages.length} items</span>
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
