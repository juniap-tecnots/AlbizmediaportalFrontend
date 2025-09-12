

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useSelector } from "react-redux"
import { selectPlaceById } from "@/lib/redux/slices/placesSlice"
import type { RootState } from "@/lib/redux/store"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter, Linkedin, Facebook, Instagram, MessageSquare, Repeat, Heart, BarChart2, Upload, CheckCircle2, Briefcase, Phone, ArrowLeft, Building, Tag, Star as StarIcon, DollarSign, Clock, Info, Check } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string | number }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    )
};


export default function PlaceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const placeId = params.id as string;
    const place = useSelector((state: RootState) => selectPlaceById(state, placeId));

    if (!place) {
        return <div className="text-center p-12">Place not found.</div>
    }

    const { title, category, description, location, openingHours, contactInfo, priceRange, amenities, website, curator, imageUrl } = place;
    
    return (
        <div className="p-6 md:p-8">
             <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Places
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                         <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="secondary" className="mb-2">{category}</Badge>
                                    <CardTitle className="text-3xl">{title}</CardTitle>
                                    <CardDescription>{location.address}</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline">Share</Button>
                                    <Button>Save</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Image 
                                src={imageUrl} 
                                alt={`Photo of ${title}`}
                                width={800}
                                height={500}
                                className="rounded-lg w-full object-cover"
                            />
                            <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: description }} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities && amenities.map(amenity => (
                                    <div key={amenity} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-primary"/>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                                {(!amenities || amenities.length === 0) && (
                                    <p className="text-muted-foreground col-span-full">No amenities listed.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <InfoRow icon={Clock} label="Opening Hours" value={openingHours} />
                            <InfoRow icon={Phone} label="Contact" value={contactInfo} />
                            <InfoRow icon={DollarSign} label="Price Range" value={priceRange} />
                            <InfoRow icon={Info} label="Website" value={website} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
