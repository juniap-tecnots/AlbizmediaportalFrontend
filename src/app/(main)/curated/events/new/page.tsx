
'use client'

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, UploadCloud, ArrowLeft, Bold, Italic, Underline, List, ListOrdered, Quote } from "lucide-react";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { addEvent, Event } from "@/lib/redux/slices/eventsSlice";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type VerificationStatus = 'Verified' | 'Unverified' | 'Pending';
type PartnershipLevel = 'None' | 'Bronze' | 'Silver' | 'Gold';

const EditorContext = React.createContext<{
    handleFormat: (command: string, value?: string) => void;
    activeCommands: Set<string>;
} | null>(null);

const useEditorContext = () => {
    const context = React.useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within an EditorProvider');
    }
    return context;
};

const ToolbarButton = ({ command, icon: Icon, tooltip }: { command: string, icon: React.ElementType, tooltip: string }) => {
    const { handleFormat, activeCommands } = useEditorContext();
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                 <Button
                    variant="ghost"
                    size="sm"
                    className={cn("px-2", { 'bg-accent text-accent-foreground': activeCommands.has(command) })}
                    onMouseDown={(e) => { e.preventDefault(); handleFormat(command); }}
                >
                    <Icon className="w-4 h-4"/>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default function NewEventPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    // Form State
    const [eventTitle, setEventTitle] = useState('');
    const [eventType, setEventType] = useState<'Concert' | 'Festival' | 'Conference' | 'Sports'>('Conference');
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [startTime, setStartTime] = useState('12:00');
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [endTime, setEndTime] = useState('14:00');
    const [venueInfo, setVenueInfo] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [organizerDetails, setOrganizerDetails] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [ticketLink, setTicketLink] = useState('');
    const [ticketAvailability, setTicketAvailability] = useState('');
    const [ageRestrictions, setAgeRestrictions] = useState('');
    const [dressCode, setDressCode] = useState('');
    const [socialLinks, setSocialLinks] = useState('');
    const [rsvpLink, setRsvpLink] = useState('');

    // Metadata
    const [eventSource, setEventSource] = useState('');
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('Unverified');
    const [commissionRate, setCommissionRate] = useState('');
    const [partnershipLevel, setPartnershipLevel] = useState<PartnershipLevel>('None');
    const [capacity, setCapacity] = useState('');
    const [weatherDependency, setWeatherDependency] = useState(false);

    const editorRef = useRef<HTMLDivElement>(null);
    const [activeCommands, setActiveCommands] = useState(new Set<string>());

    const handleFormat = (command: string, value?: string) => {
        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand(command, false, value);
        }
    };
    
    const updateActiveCommands = useCallback(() => {
        const commands = new Set<string>();
        if (document.queryCommandState('bold')) commands.add('bold');
        if (document.queryCommandState('italic')) commands.add('italic');
        // ... add other command checks
        setActiveCommands(commands);
    }, []);

    const handleSubmit = () => {
        if (!eventTitle) {
            toast({
                title: "Event Title is required",
                description: "Please enter a title for the event.",
                variant: "destructive",
            });
            return;
        }
        
        const formatDateTime = (date?: Date, time?: string) => {
            if (!date || !time) return new Date().toISOString();
            const [hours, minutes] = time.split(':');
            return set(date, { hours: parseInt(hours), minutes: parseInt(minutes) }).toISOString();
        }

        const newEvent: Omit<Event, 'id'> = {
            eventTitle,
            eventType,
            startTime: formatDateTime(startDate, startTime),
            endTime: formatDateTime(endDate, endTime),
            venueInfo,
            description: editorRef.current?.innerHTML || '',
            organizerDetails,
            ticketInfo: {
                price: ticketPrice,
                link: ticketLink,
                availability: ticketAvailability
            },
            ageRestrictions,
            dressCode,
            socialMediaLinks: socialLinks.split(','),
            rsvpLink
        };

        dispatch(addEvent(newEvent as any));
        toast({
            title: "Event Created",
            description: `"${eventTitle}" has been successfully added.`,
        });
        router.push('/curated/events/all');
    };
    
    const editorContextValue = { handleFormat, activeCommands };

    return (
        <EditorContext.Provider value={editorContextValue}>
        <TooltipProvider>
        <div className="space-y-8 p-6 md:p-8">
             <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Add New Event</h1>
                    <p className="text-sm text-muted-foreground mt-1">Fill out the form to add a new event to your curated list.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Core Fields</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="eventTitle">Event Title</Label>
                                <Input id="eventTitle" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="e.g., Annual Tech Summit 2025" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="eventType">Event Type</Label>
                                <Select onValueChange={(value: any) => setEventType(value)} defaultValue={eventType}>
                                    <SelectTrigger id="eventType"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Conference">Conference</SelectItem>
                                        <SelectItem value="Festival">Festival</SelectItem>
                                        <SelectItem value="Concert">Concert</SelectItem>
                                        <SelectItem value="Sports">Sports</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Start Date & Time</Label>
                                    <div className="flex gap-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-[60%] justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus /></PopoverContent>
                                        </Popover>
                                        <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="w-[40%]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>End Date & Time</Label>
                                    <div className="flex gap-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-[60%] justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus /></PopoverContent>
                                        </Popover>
                                        <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="w-[40%]" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="venueInfo">Venue Information</Label>
                                <Textarea id="venueInfo" value={venueInfo} onChange={e => setVenueInfo(e.target.value)} placeholder="e.g., The Grand Hall, 123 Event St, Cityville"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Event Description</Label>
                                <Card>
                                     <div className="p-2 border-b flex items-center gap-x-1">
                                        <ToolbarButton command="bold" icon={Bold} tooltip="Bold" />
                                        <ToolbarButton command="italic" icon={Italic} tooltip="Italic" />
                                        <ToolbarButton command="underline" icon={Underline} tooltip="Underline" />
                                        <Separator orientation="vertical" className="h-6 mx-1" />
                                        <ToolbarButton command="insertUnorderedList" icon={List} tooltip="Bulleted List" />
                                        <ToolbarButton command="insertOrderedList" icon={ListOrdered} tooltip="Numbered List" />
                                        <ToolbarButton command="formatBlock" icon={Quote} tooltip="Quote" />
                                    </div>
                                    <CardContent className="p-0">
                                        <div
                                            ref={editorRef}
                                            contentEditable
                                            className="w-full min-h-[200px] border-0 focus-visible:ring-0 p-4 shadow-none resize-none focus:outline-none"
                                            onInput={(e) => setEventDescription(e.currentTarget.innerHTML)}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="organizerDetails">Organizer Details</Label>
                                <Input id="organizerDetails" value={organizerDetails} onChange={e => setOrganizerDetails(e.target.value)} placeholder="e.g., Tech Events Inc."/>
                            </div>
                             <div className="space-y-2">
                                <Label>Ticket Information</Label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input value={ticketPrice} onChange={e => setTicketPrice(e.target.value)} placeholder="Price (e.g., $99 or Free)"/>
                                    <Input value={ticketLink} onChange={e => setTicketLink(e.target.value)} placeholder="Purchase Link"/>
                                    <Input value={ticketAvailability} onChange={e => setTicketAvailability(e.target.value)} placeholder="Availability (e.g., On Sale)"/>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="ageRestrictions">Age Restrictions</Label>
                                    <Input id="ageRestrictions" value={ageRestrictions} onChange={e => setAgeRestrictions(e.target.value)} placeholder="e.g., 18+"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dressCode">Dress Code</Label>
                                    <Input id="dressCode" value={dressCode} onChange={e => setDressCode(e.target.value)} placeholder="e.g., Business Casual"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="socialLinks">Social Media Links</Label>
                                    <Input id="socialLinks" value={socialLinks} onChange={e => setSocialLinks(e.target.value)} placeholder="Comma-separated links"/>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="rsvpLink">Registration/RSVP Link</Label>
                                    <Input id="rsvpLink" value={rsvpLink} onChange={e => setRsvpLink(e.target.value)} placeholder="https://example.com/rsvp"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Event Images/Videos</Label>
                                <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">Drag & drop files or click to browse</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="space-y-6 lg:sticky top-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Button className="w-full" onClick={handleSubmit}>Save Event</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="eventSource">Event Source</Label>
                                <Input id="eventSource" value={eventSource} onChange={e => setEventSource(e.target.value)} placeholder="e.g., Official Website"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="verificationStatus">Verification Status</Label>
                                <Select onValueChange={(value: VerificationStatus) => setVerificationStatus(value)} defaultValue={verificationStatus}>
                                    <SelectTrigger id="verificationStatus"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Verified">Verified</SelectItem>
                                        <SelectItem value="Unverified">Unverified</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="commissionRate">Booking Commission Rate (%)</Label>
                                <Input id="commissionRate" type="number" value={commissionRate} onChange={e => setCommissionRate(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="partnershipLevel">Partnership Level</Label>
                                <Select onValueChange={(value: PartnershipLevel) => setPartnershipLevel(value)} defaultValue={partnershipLevel}>
                                    <SelectTrigger id="partnershipLevel"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="Bronze">Bronze</SelectItem>
                                        <SelectItem value="Silver">Silver</SelectItem>
                                        <SelectItem value="Gold">Gold</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="capacity">Attendance Capacity</Label>
                                <Input id="capacity" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="weather" checked={weatherDependency} onCheckedChange={checked => setWeatherDependency(!!checked)} />
                                <Label htmlFor="weather">Weather Dependent</Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
        </TooltipProvider>
        </EditorContext.Provider>
    );
}

    