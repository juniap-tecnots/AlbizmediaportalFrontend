
'use client'

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoreVertical, PlusCircle, Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSelector } from "react-redux";
import { selectAllWorkflowTemplates } from "@/lib/redux/slices/workflowTemplatesSlice";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function WorkflowsPage() {
    const templates = useSelector(selectAllWorkflowTemplates);
    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Workflows"
                description="Manage your content workflow templates."
                actions={
                    <Link href="/workflow/builder">
                        <Button>
                            <PlusCircle className="mr-2" />
                            Create New Template
                        </Button>
                    </Link>
                }
            />
            <Card>
                <CardHeader>
                    <CardTitle>Workflow Templates</CardTitle>
                    <CardDescription>
                        A list of predefined workflows for different content types.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Template Name</TableHead>
                                <TableHead>Content Type</TableHead>
                                <TableHead>Version</TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {templates.map(template => (
                                <TableRow key={template.id}>
                                    <TableCell className="font-medium">{template.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{template.contentType}</Badge>
                                    </TableCell>
                                    <TableCell>v{template.version}</TableCell>
                                    <TableCell>{format(new Date(template.lastModified), 'MMM d, yyyy')}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
