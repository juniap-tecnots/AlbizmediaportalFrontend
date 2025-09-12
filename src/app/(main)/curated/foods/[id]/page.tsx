
'use client'

import { useParams, useRouter } from 'next/navigation'
import { useSelector } from "react-redux"
import { selectAllFoodVenues } from "@/lib/redux/slices/foodsSlice"
import type { RootState } from "@/lib/redux/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, DollarSign, Utensils, Info } from "lucide-react"
import { Badge } from '@/components/ui/badge'

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string | number }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-4">
            <Icon className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    )
};

export default function FoodDetailPage() {
    const params = useParams();
    const router = useRouter();
    const foodId = params.id as string;
    const foodVenue = useSelector((state: RootState) => state.foods.venues.find(v => v.id === foodId));

    if (!foodVenue) {
        return <div className="text-center p-12">Restaurant not found.</div>
    }

    const { title, cuisineType, description, location, priceRange, diningStyle } = foodVenue;
    
    return (
        <div className="p-6 md:p-8">
             <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Food Venues
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                                {cuisineType.map(cuisine => (
                                    <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
                                ))}
                            </div>
                            <CardTitle className="text-3xl">{title}</CardTitle>
                            <CardDescription className="text-base">{location}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{ __html: description }} />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <InfoRow icon={DollarSign} label="Price Range" value={priceRange} />
                            <InfoRow icon={Utensils} label="Dining Style" value={diningStyle} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
