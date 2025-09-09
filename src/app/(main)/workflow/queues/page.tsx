
'use client'

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { selectAllWorkflowTasks, TaskPriority, TaskStatus } from '@/lib/redux/slices/workflowQueueSlice';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, isPast } from 'date-fns';

type FilterType = 'all' | 'my-tasks' | 'team-tasks';

export default function ReviewQueuesPage() {
    const allTasks = useSelector(selectAllWorkflowTasks);
    const [filter, setFilter] = useState<FilterType>('all');

    const getPriorityClass = (priority: TaskPriority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const getStatusClass = (status: TaskStatus) => {
        switch (status) {
            case 'Pending': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    
    const filteredTasks = allTasks.filter(task => {
        // In a real app, you'd have logic here to determine which tasks belong to the current user or their team.
        if (filter === 'my-tasks') return task.assignedTo === 'Admin User';
        if (filter === 'team-tasks') return ['John Doe', 'Jane Smith'].includes(task.assignedTo);
        return true;
    });

    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Review Queues"
                description="Tasks assigned to you or your team for content review and approval."
            />
            <div className="flex items-center gap-2 mb-4">
                <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All Tasks</Button>
                <Button variant={filter === 'my-tasks' ? 'default' : 'outline'} onClick={() => setFilter('my-tasks')}>My Tasks</Button>
                <Button variant={filter === 'team-tasks' ? 'default' : 'outline'} onClick={() => setFilter('team-tasks')}>Team Tasks</Button>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Task ID</TableHead>
                            <TableHead>Content Title</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {filteredTasks.map(task => {
                           const dueDate = new Date(task.dueDate);
                           const isOverdue = isPast(dueDate);
                           return (
                             <TableRow key={task.taskId}>
                                <TableCell className="font-mono text-xs">{task.taskId}</TableCell>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell>{task.stage}</TableCell>
                                <TableCell>{task.assignedTo}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn('font-semibold', getPriorityClass(task.priority))}>
                                        {task.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell className={cn(isOverdue && 'text-red-600 font-semibold')}>
                                    {format(dueDate, 'MMM d')}
                                    {isOverdue && ` (${formatDistanceToNow(dueDate, { addSuffix: true })})`}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn(getStatusClass(task.status))}>{task.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                     <Button variant="outline" size="sm" className="text-xs">View</Button>
                                     <Button variant="outline" size="sm" className="text-xs border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700">Approve</Button>
                                     <Button variant="outline" size="sm" className="text-xs border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">Reject</Button>
                                     <Button variant="outline" size="sm" className="text-xs">Comment</Button>
                                </TableCell>
                            </TableRow>
                           )
                       })}
                    </TableBody>
                </Table>
                 {filteredTasks.length === 0 && (
                    <div className="text-center p-12 text-muted-foreground">
                        No tasks found for the selected filter.
                    </div>
                )}
            </div>
        </div>
    );
