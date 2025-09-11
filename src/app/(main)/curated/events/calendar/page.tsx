
'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSelector } from 'react-redux';
import { selectAllEvents, Event } from '@/lib/redux/slices/eventsSlice';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';


const eventTypeColors: { [key: string]: string } = {
    'Conference': 'bg-blue-500 text-white',
    'Festival': 'bg-purple-500 text-white',
    'Concert': 'bg-pink-500 text-white',
    'Sports': 'bg-green-500 text-white',
};

const eventTypeBadgeColors: { [key: string]: string } = {
    'Conference': 'bg-blue-100 text-blue-800 border-blue-200',
    'Festival': 'bg-purple-100 text-purple-800 border-purple-200',
    'Concert': 'bg-pink-100 text-pink-800 border-pink-200',
    'Sports': 'bg-green-100 text-green-800 border-green-200',
};


export default function EventsCalendarPage() {
    const allEvents = useSelector(selectAllEvents);
    const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeView, setActiveView] = useState('month');


    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    const startingDayIndex = getDay(monthStart);

    // Create an array of day objects for the entire grid
    const calendarDays = [
        ...Array.from({ length: startingDayIndex }).map((_, i) => {
            const day = new Date(monthStart);
            day.setDate(day.getDate() - (startingDayIndex - i));
            return { date: day, isCurrentMonth: false };
        }),
        ...daysInMonth.map(day => ({ date: day, isCurrentMonth: true })),
    ];
    
    const eventsByDate = allEvents.reduce((acc, event) => {
        const date = format(new Date(event.startTime), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
        setIsSidebarOpen(true);
    };

    const changePeriod = (amount: number) => {
        const newDate = new Date(currentDate);
        if (activeView === 'month') {
            newDate.setMonth(newDate.getMonth() + amount);
        } else if (activeView === 'week') {
            newDate.setDate(newDate.getDate() + (amount * 7));
        }
        setCurrentDate(newDate);
    };

    return (
        <div className="space-y-6">
             <div className="bg-card p-4 rounded-lg shadow-sm border flex justify-around items-center flex-wrap gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">34</div>
                    <div className="text-xs text-muted-foreground uppercase">Upcoming Events</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">12</div>
                    <div className="text-xs text-muted-foreground uppercase">This Week</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <div className="text-xs text-muted-foreground uppercase">Pending Review</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">89</div>
                    <div className="text-xs text-muted-foreground uppercase">Total This Month</div>
                </div>
                 <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">95%</div>
                    <div className="text-xs text-muted-foreground uppercase">On-Time Rate</div>
                </div>
            </div>

            <div className="bg-card border rounded-lg shadow-sm">
                <div className="flex justify-between items-center p-4 border-b">
                     <div className="flex bg-muted p-1 rounded-md">
                        <Button variant={activeView === 'month' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveView('month')}>Month</Button>
                        <Button variant={activeView === 'week' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveView('week')}>Week</Button>
                        <Button variant={activeView === 'agenda' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveView('agenda')}>Agenda</Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => changePeriod(-1)}>‹ Prev</Button>
                        <div className="text-lg font-semibold w-48 text-center">{format(currentDate, 'MMMM yyyy')}</div>
                        <Button variant="outline" size="sm" onClick={() => changePeriod(1)}>Next ›</Button>
                        <Button variant="secondary" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
                    </div>
                </div>
                <div className="p-4 border-b flex gap-4 items-center flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Status:</span>
                        <Select defaultValue="all"><SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem></SelectContent></Select>
                    </div>
                     <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Type:</span>
                        <Select defaultValue="all"><SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem></SelectContent></Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Location:</span>
                        <Select defaultValue="all"><SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Locations</SelectItem></SelectContent></Select>
                    </div>
                </div>
                <div className="grid grid-cols-7">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="p-3 text-center font-semibold text-muted-foreground border-r border-b">{day}</div>
                    ))}
                    {calendarDays.map(({ date, isCurrentMonth }, index) => {
                        const dayStr = format(date, 'yyyy-MM-dd');
                        const dayEvents = eventsByDate[dayStr] || [];

                        return (
                            <div key={index} className={cn("min-h-[120px] p-2 border-b border-r", !isCurrentMonth && "bg-muted/50 text-muted-foreground", isToday(date) && "bg-blue-50")}>
                                <div className="font-semibold mb-1">{format(date, 'd')}</div>
                                <div className="space-y-1">
                                    {dayEvents.map(event => (
                                        <div
                                            key={event.id}
                                            className={cn("text-xs text-white p-1 rounded truncate cursor-pointer", eventTypeColors[event.eventType] || 'bg-gray-400')}
                                            onClick={() => handleEventClick(event)}
                                        >
                                            {event.eventTitle}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                        <SheetTitle>Event Details</SheetTitle>
                    </SheetHeader>
                    {selectedEvent && (
                        <div className="py-4 space-y-4">
                            <h3 className="text-xl font-semibold">{selectedEvent.eventTitle}</h3>
                            <Badge variant="outline" className={cn(eventTypeBadgeColors[selectedEvent.eventType])}>{selectedEvent.eventType}</Badge>
                            <div className="space-y-2 text-sm">
                                <p><strong>Date:</strong> {format(new Date(selectedEvent.startTime), 'PPP')}</p>
                                <p><strong>Time:</strong> {format(new Date(selectedEvent.startTime), 'p')} - {format(new Date(selectedEvent.endTime), 'p')}</p>
                                <p><strong>Venue:</strong> {selectedEvent.venueInfo}</p>
                                <p><strong>Organizer:</strong> {selectedEvent.organizerDetails}</p>
                            </div>
                             <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />

                             <div className="flex gap-2 pt-4">
                                <Button size="sm">Edit Event</Button>
                                <Button size="sm" variant="outline">Duplicate</Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
