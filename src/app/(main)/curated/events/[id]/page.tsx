

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useSelector } from "react-redux"
import { selectAllEvents } from "@/lib/redux/slices/eventsSlice"
import type { RootState } from "@/lib/redux/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Ticket, User, Info, Link as LinkIcon, Users } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import Image from 'next/image'

const InfoRow = ({ icon: Icon, label, value, isLink }: { icon: React.ElementType, label: string, value?: string | number, isLink?: boolean }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-4">
            <Icon className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                {isLink && typeof value === 'string' ? (
                    <a href={value} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">{value}</a>
                ) : (
                    <p className="font-medium">{value}</p>
                )}
            </div>
        </div>
    )
};


export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;
    const event = useSelector((state: RootState) => state.events.events.find(e => e.id === eventId));

    if (!event) {
        return <div className="text-center p-12">Event not found.</div>
    }

    const { title, eventType, description, startTime, endTime, venueInfo, organizerDetails, ticketInfo, ageRestrictions, dressCode, rsvpLink, socialMediaLinks, imageUrl } = event;
    
    return (
        <div className="p-6 md:p-8">
             <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <Card>
                        <CardHeader>
                             {imageUrl && <Image src={imageUrl} alt={title} width={800} height={400} className="w-full object-cover rounded-lg mb-4" />}
                            <Badge variant="secondary" className="mb-2 w-fit">{eventType}</Badge>
                            <CardTitle className="text-3xl">{title}</CardTitle>
                             <CardDescription className="text-base">
                                {format(new Date(startTime), 'EEEE, MMMM d, yyyy')} from {format(new Date(startTime), 'p')} to {format(new Date(endTime), 'p')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: description }} />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <InfoRow icon={Calendar} label="Venue" value={venueInfo} />
                            <InfoRow icon={User} label="Organizer" value={organizerDetails} />
                            <InfoRow icon={Ticket} label="Tickets" value={`${ticketInfo.price} - ${ticketInfo.availability}`} />
                            <InfoRow icon={Users} label="Age Restriction" value={ageRestrictions} />
                            <InfoRow icon={Info} label="Dress Code" value={dressCode} />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Links</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <InfoRow icon={LinkIcon} label="RSVP / Purchase" value={rsvpLink || ticketInfo.link} isLink />
                            {socialMediaLinks.map((link, index) => (
                                <InfoRow key={index} icon={LinkIcon} label={`Social Link ${index + 1}`} value={link} isLink />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
