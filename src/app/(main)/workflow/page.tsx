
'use client'

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, PlusCircle } from "lucide-react";
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

export default function WorkflowsPage() {
    const templates = useSelector(selectAllWorkflowTemplates);
    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Workflows"
                description="Manage your content workflow templates."
                actions={
                    <Button>
                        <PlusCircle className="mr-2" />
                        Create New Template
                    </Button>
                }
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {templates.map(template => (
                    <Card key={template.id}>
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="space-y-1.5">
                                <CardTitle>{template.name}</CardTitle>
                                <CardDescription>{template.stages.length} stages</CardDescription>
                            </div>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                           <div className="flex space-x-2">
                                <Badge variant="secondary">{template.contentType}</Badge>
                                <Badge variant="outline">v{template.version}</Badge>
                           </div>
                           <p className="text-xs text-muted-foreground mt-4">
                                Last modified on {format(new Date(template.lastModified), 'MMM d, yyyy')}
                           </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
