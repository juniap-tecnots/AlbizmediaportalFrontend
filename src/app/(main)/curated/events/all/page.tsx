

'use client';

import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllEvents, Event, updateEvent, EventStatus } from "@/lib/redux/slices/eventsSlice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, Pencil, Trash2, Send } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function AllEventsPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const allEvents = useSelector(selectAllEvents);

    const handleDelete = (id: string) => {
        // dispatch(deleteEvent(id));
        toast({
            title: "Event Deleted",
            description: "The event has been successfully deleted.",
            variant: 'destructive'
        })
    }

     const handleStatusUpdate = (event: Event, status: EventStatus) => {
        dispatch(updateEvent({ ...event, status }));
        toast({
            title: "Event Submitted",
            description: `The event "${event.title}" has been submitted for review.`
        });
    }

    const getStatusBadgeClass = (status: EventStatus) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-800 border-green-200';
            case 'In-progress': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Submitted for review': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Event Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Venue</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allEvents.map((event: Event) => (
                        <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{event.eventType}</Badge>
                            </TableCell>
                            <TableCell>{format(new Date(event.startTime), 'PPp')}</TableCell>
                            <TableCell>{event.venueInfo}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={cn('font-semibold', getStatusBadgeClass(event.status))}>
                                    {event.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                {event.status === 'In-progress' && (
                                    <Button variant="outline" size="icon" onClick={() => handleStatusUpdate(event, 'Submitted for review')} className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                )}
                                <Link href={`/curated/events/${event.id}`}>
                                    <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href={`/curated/events/edit/${event.id}`}>
                                    <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600" onClick={() => handleDelete(event.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             {allEvents.length === 0 && (
                <div className="text-center p-12 text-muted-foreground">
                    No events found.
                </div>
            )}
        </div>
    );
}
