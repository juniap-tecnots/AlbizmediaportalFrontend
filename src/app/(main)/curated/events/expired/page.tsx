
'use client';

import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllEvents, Event } from "@/lib/redux/slices/eventsSlice";
import { format } from 'date-fns';

export default function ExpiredEventsPage() {
    const allEvents = useSelector(selectAllEvents);
    const [expiredEvents, setExpiredEvents] = useState<Event[]>([]);

    useEffect(() => {
        const now = new Date();
        const expired = allEvents.filter(event => new Date(event.endTime) < now);
        setExpiredEvents(expired);
    }, [allEvents]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expired Events</CardTitle>
                <CardDescription>A list of all past events.</CardDescription>
            </CardHeader>
            <CardContent>
                {expiredEvents.length > 0 ? (
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Venue</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expiredEvents.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">{event.eventTitle}</TableCell>
                                        <TableCell>{event.eventType}</TableCell>
                                        <TableCell>{format(new Date(event.endTime), 'PPP')}</TableCell>
                                        <TableCell>{event.venueInfo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-96 border rounded-lg">
                        <p className="text-muted-foreground">No expired events found.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
