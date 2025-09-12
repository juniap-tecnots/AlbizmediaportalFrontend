

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

    const { title, category, description, location, openingHours, contactInfo, priceRange, amenities, website, twitter, instagram, facebook, curator, imageUrl, photoGallery } = place;
    
    return (
        <div className="p-6 md:p-8">
             <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Places
            </Button>
            
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant="secondary" className="mb-2">{category}</Badge>
                                <CardTitle className="text-3xl">{title}</CardTitle>
                                <CardDescription>{location.address}</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><Twitter className="h-4 w-4" /></Button></a>}
                                {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><Instagram className="h-4 w-4" /></Button></a>}
                                {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><Facebook className="h-4 w-4" /></Button></a>}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {imageUrl && (
                            <Image 
                                src={imageUrl} 
                                alt={`Photo of ${title}`}
                                width={800}
                                height={500}
                                className="rounded-lg w-full object-cover"
                            />
                        )}
                        <div className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: description }} />
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <Card>
                            <CardHeader><CardTitle>Gallery</CardTitle></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {photoGallery && photoGallery.length > 0 ? (
                                        photoGallery.map((photo, index) => (
                                            <div key={index} className="relative aspect-video">
                                                <Image src={photo.url} alt={photo.caption || `Gallery image ${index + 1}`} fill className="rounded-md object-cover" />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground col-span-full">No gallery images available.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <InfoRow icon={Clock} label="Opening Hours" value={openingHours} />
                                <InfoRow icon={Phone} label="Contact" value={contactInfo} />
                                <InfoRow icon={DollarSign} label="Price Range" value={priceRange} />
                                {website && <InfoRow icon={Info} label="Website" value={website} />}
                            </CardContent>
                        </Card>
                    </div>

                     <div className="space-y-8">
                        <Card>
                            <CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {amenities && amenities.length > 0 ? (
                                        amenities.map(amenity => (
                                            <div key={amenity} className="flex items-center gap-2 text-sm">
                                                <Check className="h-4 w-4 text-primary"/>
                                                <span>{amenity}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground col-span-full">No amenities listed.</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
