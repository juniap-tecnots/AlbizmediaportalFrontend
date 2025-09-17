

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useSelector } from "react-redux"
import { selectPlaceById } from "@/lib/redux/slices/placesSlice"
import type { RootState } from "@/lib/redux/store"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star, Camera, Award, ChevronDown, MapPin, Phone, Globe } from "lucide-react"
import { Badge } from '@/components/ui/badge'

export default function PlaceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const placeId = params.id as string;
    const place = useSelector((state: RootState) => selectPlaceById(state, placeId));

    if (!place) {
        return <div className="text-center p-12">Place not found.</div>
    }

    const { title, category, description, location, openingHours, contactInfo, priceRange, amenities, website, imageUrl, photoGallery } = place;
    
    // Generate sample data for news portal style
    const rating = 4.5;
    const reviewCount = 78118;
    const ranking = "#48 of 702 things to do in Dubai";
    const duration = "More than 3 hours";
    
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Places
            </Button>
            
                        <div className="flex justify-between items-start">
                            <div>
                        <h1 className="text-4xl font-bold text-green-700 mb-2">{title}</h1>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-green-700">{rating}</span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-green-500 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-gray-600">({reviewCount.toLocaleString()} reviews)</span>
                            </div>
                            <span className="text-gray-600">{ranking}</span>
                        </div>
                    </div>
                    
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <div className="relative h-96 rounded-lg overflow-hidden">
                                    <Image 
                                        src={imageUrl || 'https://picsum.photos/800/600?random=1'} 
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-yellow-500 text-white">
                                            <Award className="h-3 w-3 mr-1" />
                                            2025
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <Badge className="bg-green-600 text-white">
                                            <Camera className="h-3 w-3 mr-1" />
                                            61,363
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="relative h-44 rounded-lg overflow-hidden">
                                    <Image 
                                        src={photoGallery?.[0]?.url || 'https://picsum.photos/400/300?random=2'} 
                                        alt={`${title} view 1`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative h-44 rounded-lg overflow-hidden">
                                    <Image 
                                        src={photoGallery?.[1]?.url || 'https://picsum.photos/400/300?random=3'} 
                                        alt={`${title} view 2`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">About</h2>
                            <div className="mb-4">
                                <Badge className="bg-yellow-500 text-white mb-4">
                                    <Award className="h-3 w-3 mr-1" />
                                    Travelers' Choice Best of the Best 2025
                                </Badge>
                            </div>
                            <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p className="mb-4">
                                    {description || `Standing over 2,700 feet and 163 floors high, this record-breaking skyscraper in downtown Dubai is the tallest structure in the world. ${title} has several operating viewing decks and swanky lounges which offer splendid views of the UAE and the Persian Gulf. The highest lounge is located at level 154, and there is even a hotel at levels 38 and 39. Designed by Skidmore, Owings & Merrill architects, this mixed-used development atop Dubai Mall is inspired by the Great Mosque of Samarra in Iraq. You might want to buy skip-the-line tickets or join a tour to avoid snaking queues at this popular attraction in Dubai.`}
                                </p>
                                <p className="text-sm text-gray-600 mb-4">
                                    Duration: {duration}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Suggest edits to improve what we show.{' '}
                                    <a href="#" className="text-green-600 hover:underline">Improve this listing</a>
                                </p>
                            </div>
                            </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">

                        {/* Hours */}
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Hours</CardTitle>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                                <div className="space-y-2">
                                    <div className="text-green-600 font-medium">Open now</div>
                                    <div className="text-sm text-gray-600">
                                        {openingHours || "Tuesday 12:00 AM - 11:59 PM"}
                                    </div>
                                </div>
                    </CardContent>
                </Card>

                        {/* Location Info */}
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Location</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                                        <div>
                                            <p className="font-medium">{location?.address || "Downtown Dubai, UAE"}</p>
                                            <p className="text-sm text-gray-600">Get directions</p>
                                        </div>
                                    </div>
                                    {contactInfo && (
                                        <div className="flex items-start gap-3">
                                            <Phone className="h-5 w-5 text-gray-500 mt-1" />
                                            <div>
                                                <p className="font-medium">{contactInfo}</p>
                                            </div>
                                            </div>
                                    )}
                                    {website && (
                                        <div className="flex items-start gap-3">
                                            <Globe className="h-5 w-5 text-gray-500 mt-1" />
                                            <div>
                                                <a href={website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                                    Visit website
                                                </a>
                    </div>
                                            </div>
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
