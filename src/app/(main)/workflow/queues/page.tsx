

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
import { selectAllPlaces } from '@/lib/redux/slices/placesSlice';
import { selectAllEvents } from '@/lib/redux/slices/eventsSlice';
import { selectAllFoodVenues } from '@/lib/redux/slices/foodsSlice';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, isPast } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { selectAllWorkflowTemplates } from '@/lib/redux/slices/workflowTemplatesSlice';
import { CheckCircle2, Circle, Radio } from 'lucide-react';


type FilterType = 'all' | 'my-tasks';

export default function ReviewQueuesPage() {
    const allWorkflowTasks = useSelector(selectAllWorkflowTasks);
    const allPlaces = useSelector(selectAllPlaces);
    const allEvents = useSelector(selectAllEvents);
    const allFoodVenues = useSelector(selectAllFoodVenues);
    
    const workflowTemplates = useSelector(selectAllWorkflowTemplates);
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedTask, setSelectedTask] = useState<any>(null);

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
            case 'Submitted for review': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getWorkflowStagesForTask = (task: any) => {
        if (!task) return [];
        const template = workflowTemplates.find(t => Array.isArray(t.contentType) ? t.contentType.includes(task.contentType) : t.contentType === task.contentType);
        return template ? template.stages : [];
    }

    const submittedPlaces = allPlaces
        .filter(p => p.status === 'Submitted for review')
        .map(p => ({
            taskId: p.id,
            title: p.placeName,
            contentType: 'Place',
            stage: 'Initial Review',
            assignedTo: 'Unassigned',
            priority: 'Medium' as TaskPriority,
            dueDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Pending' as TaskStatus,
        }));
    
    const submittedEvents = allEvents
        .filter(e => e.status === 'Submitted for review')
        .map(e => ({
            taskId: e.id,
            title: e.eventTitle,
            contentType: 'Event',
            stage: 'Initial Review',
            assignedTo: 'Unassigned',
            priority: 'Medium' as TaskPriority,
            dueDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Pending' as TaskStatus,
        }));

    const submittedFoods = allFoodVenues
        .filter(f => f.status === 'Submitted for review')
        .map(f => ({
            taskId: f.id,
            title: f.restaurantName,
            contentType: 'Food',
            stage: 'Initial Review',
            assignedTo: 'Unassigned',
            priority: 'Medium' as TaskPriority,
            dueDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'Pending' as TaskStatus,
        }));

    const allTasks = [...allWorkflowTasks, ...submittedPlaces, ...submittedEvents, ...submittedFoods];
    
    const filteredTasks = allTasks.filter(task => {
        if (filter === 'my-tasks') return task.assignedTo === 'Admin User';
        return true;
    });

    return (
        <Dialog onOpenChange={(isOpen) => { if (!isOpen) setSelectedTask(null) }}>
            <div className="p-6 md:p-8">
                <PageHeader
                    title="Review Queues"
                    description="Tasks assigned to you or your team for content review and approval."
                />
                <div className="flex items-center gap-2 mb-4">
                    <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>All Tasks</Button>
                    <Button variant={filter === 'my-tasks' ? 'default' : 'outline'} onClick={() => setFilter('my-tasks')}>My Tasks</Button>
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task ID</TableHead>
                                <TableHead>Content Title</TableHead>
                                <TableHead>Content Type</TableHead>
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
                                    <TableCell>{task.contentType}</TableCell>
                                    <TableCell>
                                        <DialogTrigger asChild>
                                            <button 
                                                className="text-primary hover:underline"
                                                onClick={() => setSelectedTask(task)}
                                            >
                                                {task.stage}
                                            </button>
                                        </DialogTrigger>
                                    </TableCell>
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

            {selectedTask && (
                 <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Workflow Status: {selectedTask.title}</DialogTitle>
                        <DialogDescription>
                           Tracking the progress of the content through the publishing workflow.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <ul className="space-y-4">
                            {getWorkflowStagesForTask(selectedTask).map((stage, index) => {
                                const allStages = getWorkflowStagesForTask(selectedTask);
                                const currentStageIndex = allStages.findIndex(s => s.name === selectedTask.stage);
                                const isCompleted = index < currentStageIndex;
                                const isCurrent = stage.name === selectedTask.stage;

                                return (
                                    <li key={stage.id} className="flex items-center gap-4">
                                        <div>
                                            {isCompleted ? (
                                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                                            ) : isCurrent ? (
                                                <Radio className="h-6 w-6 text-blue-500 animate-pulse" />
                                            ) : (
                                                <Circle className="h-6 w-6 text-muted-foreground/50" />
                                            )}
                                        </div>
                                        <div>
                                            <p className={cn("font-medium", isCurrent && "text-blue-600", isCompleted && "text-muted-foreground line-through")}>
                                                {stage.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {isCurrent ? `Status: ${selectedTask.status}` : isCompleted ? 'Completed' : 'Pending'}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}


    