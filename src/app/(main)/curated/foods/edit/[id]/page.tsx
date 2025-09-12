

'use client'

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateFoodVenue, FoodVenueStatus } from "@/lib/redux/slices/foodsSlice";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { RootState } from "@/lib/redux/store";
import { FoodVenue } from "@/lib/redux/slices/foodsSlice";
import Image from "next/image";

export default function EditFoodPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    
    const venueId = params.id as string;
    const venue = useSelector((state: RootState) => state.foods.venues.find(v => v.id === venueId));

    // Form State
    const [title, setTitle] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState<'$' | '$$' | '$$$' | '$$$$'>('$$');
    const [diningStyle, setDiningStyle] = useState<'Fast casual' | 'Fine dining' | 'Cafe'>('Fast casual');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<FoodVenueStatus>('In-progress');
    const [imageUrl, setImageUrl] = useState('');
    const imageInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (venue) {
            setTitle(venue.title);
            setCuisineType(venue.cuisineType.join(', '));
            setLocation(venue.location);
            setPriceRange(venue.priceRange);
            setDiningStyle(venue.diningStyle);
            setDescription(venue.description);
            setStatus(venue.status);
            setImageUrl(venue.imageUrl || '');
        }
    }, [venue]);

    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!venue) return;

        const updatedVenue: FoodVenue = {
            ...venue,
            title,
            cuisineType: cuisineType.split(',').map(c => c.trim()),
            location,
            priceRange,
            diningStyle,
            description,
            status,
            imageUrl,
        };

        dispatch(updateFoodVenue(updatedVenue));
        toast({
            title: "Restaurant Updated",
            description: `"${title}" has been successfully updated.`,
        });
        router.push('/curated/foods/all');
    };

    if (!venue) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-8 p-6 md:p-8">
             <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Restaurant</h1>
                    <p className="text-sm text-muted-foreground mt-1">Update the details for "{venue.title}".</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Restaurant Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <Input id="restaurantName" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="cuisineType">Cuisine Type(s)</Label>
                            <Input id="cuisineType" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
                            <p className="text-sm text-muted-foreground">Separate multiple cuisines with a comma.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="priceRange">Price Range</Label>
                            <Select onValueChange={(value: any) => setPriceRange(value)} value={priceRange}>
                                <SelectTrigger id="priceRange"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="$">$ (Inexpensive)</SelectItem>
                                    <SelectItem value="$$">$$ (Moderate)</SelectItem>
                                    <SelectItem value="$$$">$$$ (Pricey)</SelectItem>
                                    <SelectItem value="$$$$">$$$$ (Ultra High-End)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="diningStyle">Dining Style</Label>
                             <Select onValueChange={(value: any) => setDiningStyle(value)} value={diningStyle}>
                                <SelectTrigger id="diningStyle"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fast casual">Fast Casual</SelectItem>
                                    <SelectItem value="Fine dining">Fine Dining</SelectItem>
                                    <SelectItem value="Cafe">Cafe</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label>Restaurant Image</Label>
                        {imageUrl && <Image src={imageUrl} alt="Restaurant image preview" width={200} height={100} className="rounded-md" />}
                        <div 
                            className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Drag & drop an image or click to browse</p>
                            <input
                                type="file"
                                ref={imageInputRef}
                                onChange={handleImageFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select onValueChange={(value: any) => setStatus(value)} value={status}>
                            <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="In-progress">In-progress</SelectItem>
                                <SelectItem value="Submitted for review">Submitted for review</SelectItem>
                                <SelectItem value="Published">Published</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end">
                <Button onClick={handleSubmit} size="lg">Save Changes</Button>
            </div>
        </div>
    );
}
