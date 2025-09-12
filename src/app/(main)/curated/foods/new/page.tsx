

'use client'

import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addFoodVenue, FoodVenueStatus } from "@/lib/redux/slices/foodsSlice";
import { ArrowLeft, UploadCloud } from "lucide-react";
import Image from "next/image";

export default function NewFoodPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

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
        if (!title || !cuisineType || !location) {
            toast({
                title: "Missing Fields",
                description: "Please fill out all required fields.",
                variant: "destructive",
            });
            return;
        }

        const newVenue = {
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            cuisineType: cuisineType.split(',').map(c => c.trim()),
            location,
            priceRange,
            diningStyle,
            description,
            status,
            imageUrl,
        };

        dispatch(addFoodVenue(newVenue as any));
        toast({
            title: "Restaurant Added",
            description: `"${title}" has been successfully added.`,
        });
        router.push('/curated/foods/all');
    };

    return (
        <div className="space-y-8 p-6 md:p-8">
             <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Add New Restaurant</h1>
                    <p className="text-sm text-muted-foreground mt-1">Fill out the form to add a new food venue.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Restaurant Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <Input id="restaurantName" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Golden Spoon" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="cuisineType">Cuisine Type(s)</Label>
                            <Input id="cuisineType" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} placeholder="e.g., Italian, Pizza" />
                            <p className="text-sm text-muted-foreground">Separate multiple cuisines with a comma.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Downtown Cityville" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="priceRange">Price Range</Label>
                            <Select onValueChange={(value: any) => setPriceRange(value)} defaultValue={priceRange}>
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
                             <Select onValueChange={(value: any) => setDiningStyle(value)} defaultValue={diningStyle}>
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
                        <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="A brief description of the restaurant."/>
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
                </CardContent>
            </Card>
            <div className="flex justify-end">
                <Button onClick={handleSubmit} size="lg">Add Restaurant</Button>
            </div>
        </div>
    );
}
