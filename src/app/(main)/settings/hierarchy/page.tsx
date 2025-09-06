
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { cn } from '@/lib/utils';

interface HierarchyNode {
  id: string;
  name: string;
  role: string;
  children?: HierarchyNode[];
}

const hierarchyData: HierarchyNode = {
  id: '1',
  name: 'Chief Editor',
  role: 'Chief Editor',
  children: [
    {
      id: '2',
      name: 'Senior Editor',
      role: 'Editor',
      children: [
        { id: '3', name: 'Staff Writer 1', role: 'Author' },
        { id: '4', name: 'Staff Writer 2', role: 'Author' },
      ],
    },
    {
      id: '5',
      name: 'Legal Reviewer',
      role: 'Legal',
    },
  ],
};


const Node = ({ node, level = 0 }: { node: HierarchyNode; level?: number }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div>
            <div className="flex items-center space-x-2 my-2 p-2 rounded-md hover:bg-muted/50">
                {hasChildren && (
                     <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                )}
                <div className={cn("flex-grow flex items-center space-x-3", !hasChildren && "ml-8")}>
                     <div className="font-semibold">{node.name}</div>
                     <div className="text-sm text-muted-foreground">({node.role})</div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                    <Pencil className="h-4 w-4" />
                </Button>
                 <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            {isExpanded && hasChildren && (
                <div className="pl-8 border-l-2 ml-4">
                    {node.children?.map(child => <Node key={child.id} node={child} level={level + 1} />)}
                </div>
            )}
        </div>
    );
};


export default function HierarchyPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Organizational Hierarchy</CardTitle>
                <CardDescription>Visualize and manage your team's reporting structure.</CardDescription>
            </CardHeader>
            <CardContent>
                <Node node={hierarchyData} />
            </CardContent>
        </Card>
    )
}
