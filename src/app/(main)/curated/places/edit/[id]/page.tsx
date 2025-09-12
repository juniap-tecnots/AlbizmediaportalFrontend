

'use client'

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, UploadCloud, ArrowLeft, AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, Underline, Strikethrough, Link as LinkIcon, ImageIcon, Video, Smile, List, ListOrdered, Quote, Indent, Outdent, MoreHorizontal, Eraser, Palette, Highlighter, Undo, Redo } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { updatePlace, selectPlaceById, Place, PlaceStatus } from "@/lib/redux/slices/placesSlice";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { RootState } from "@/lib/redux/store";
import Image from "next/image";

const amenities = [
    { id: 'wifi', label: 'Free Wi-Fi' },
    { id: 'parking', label: 'Parking Available' },
    { id: 'pet-friendly', label: 'Pet-Friendly' },
    { id: 'outdoor-seating', label: 'Outdoor Seating' },
    { id: 'wheelchair-accessible', label: 'Wheelchair Accessible' },
    { id: 'family-friendly', label: 'Family-Friendly' },
];

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

const ToolbarButton = ({ command, icon: Icon, tooltip, onClick }: { command: string, icon: React.ElementType, tooltip: string, onClick?: () => void }) => {
    const { handleFormat, activeCommands } = useEditorContext();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) {
            onClick();
        } else {
            handleFormat(command);
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                 <Button
                    variant="ghost"
                    size="sm"
                    className={cn("px-2", { 'bg-accent text-accent-foreground': activeCommands.has(command) })}
                    onMouseDown={handleClick}
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

export default function EditPlacePage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    
    const placeId = params.id as string;
    const place = useSelector((state: RootState) => selectPlaceById(state, placeId));

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'Restaurant' | 'Attraction' | 'Shopping' | 'Entertainment'>('Restaurant');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [priceRange, setPriceRange] = useState<'$' | '$$' | '$$$' | '$$$$'>('$$');
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [website, setWebsite] = useState('');
    const [accessibilityInfo, setAccessibilityInfo] = useState('');
    const [bestVisitTimes, setBestVisitTimes] = useState('');
    const [curatorName, setCuratorName] = useState('Admin User');
    const [verificationDate, setVerificationDate] = useState<Date | undefined>();
    const [partnershipStatus, setPartnershipStatus] = useState('None');
    const [status, setStatus] = useState<PlaceStatus>('Draft');
    const [internalRating, setInternalRating] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const imageInputRef = useRef<HTMLInputElement>(null);

    const editorRef = useRef<HTMLDivElement>(null);
    const [activeCommands, setActiveCommands] = useState(new Set<string>());

    useEffect(() => {
        if (place) {
            setTitle(place.title);
            setCategory(place.category);
            setAddress(place.location.address);
            setLatitude(place.location.latitude.toString());
            setLongitude(place.location.longitude.toString());
            setDescription(place.description);
            if (editorRef.current) {
                editorRef.current.innerHTML = place.description;
            }
            setOpeningHours(place.openingHours);
            setContactInfo(place.contactInfo);
            setPriceRange(place.priceRange);
            setSelectedAmenities(place.amenities);
            setImageUrl(place.imageUrl || '');
            setWebsite(place.website || '');
            setAccessibilityInfo(place.accessibilityInfo || '');
            setBestVisitTimes(place.bestVisitTimes || '');
            setCuratorName(place.curator.name);
            setVerificationDate(place.curator.verificationDate ? parseISO(place.curator.verificationDate) : undefined);
            setPartnershipStatus(place.partnershipStatus || 'None');
            setStatus(place.status);
            setInternalRating(place.internalRating?.toString() || '');
        }
    }, [place]);

    const handleAmenityChange = (amenityId: string, checked: boolean) => {
        setSelectedAmenities(prev =>
            checked ? [...prev, amenityId] : prev.filter(id => id !== amenityId)
        );
    };

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
    
    const handleFormat = (command: string, value?: string) => {
        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand(command, false, value);
            updateActiveCommands();
        }
    };
    
    const updateActiveCommands = useCallback(() => {
        const commands = new Set<string>();
        if (document.queryCommandState('bold')) commands.add('bold');
        if (document.queryCommandState('italic')) commands.add('italic');
        if (document.queryCommandState('underline')) commands.add('underline');
        // ... add other command checks
        setActiveCommands(commands);
    }, []);

    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const handleSelectionChange = () => {
            if (document.activeElement === editor) {
                updateActiveCommands();
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [updateActiveCommands]);

    const handleSubmit = () => {
        if (!place) return;

        const updatedPlace: Place = {
            ...place,
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            category,
            location: {
                latitude: parseFloat(latitude) || 0,
                longitude: parseFloat(longitude) || 0,
                address,
            },
            description: editorRef.current?.innerHTML || '',
            openingHours,
            contactInfo,
            priceRange,
            status,
            amenities: selectedAmenities,
            imageUrl,
            website,
            accessibilityInfo,
            bestVisitTimes,
            curator: {
                name: curatorName,
                verificationDate: verificationDate?.toISOString(),
            },
            partnershipStatus,
            internalRating: parseFloat(internalRating) || undefined,
        };

        dispatch(updatePlace(updatedPlace));
        toast({
            title: "Place Updated",
            description: `"${title}" has been successfully updated.`,
        });
        router.push('/curated/places/all');
    };

    const editorContextValue = {
        handleFormat,
        activeCommands
    };
    
    if (!place) {
        return <div>Loading...</div>
    }

    return (
        <EditorContext.Provider value={editorContextValue}>
        <TooltipProvider>
        <div className="space-y-8 p-6 md:p-8">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Place</h1>
                    <p className="text-sm text-muted-foreground mt-1">Update the details for this place.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Core Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="placeName">Place Name</Label>
                                <Input id="placeName" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Grand View Restaurant" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select onValueChange={(value: any) => setCategory(value)} value={category}>
                                        <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Restaurant">Restaurant</SelectItem>
                                            <SelectItem value="Attraction">Attraction</SelectItem>
                                            <SelectItem value="Shopping">Shopping</SelectItem>
                                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priceRange">Price Range</Label>
                                     <Select onValueChange={(value: any) => setPriceRange(value)} value={priceRange}>
                                        <SelectTrigger id="priceRange"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="$">$</SelectItem>
                                            <SelectItem value="$$">$$</SelectItem>
                                            <SelectItem value="$$$">$$$</SelectItem>
                                            <SelectItem value="$$$$">$$$$</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, New York, NY" />
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <Input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude (e.g., 40.7128)" />
                                    <Input value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude (e.g., -74.0060)" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Card>
                                    <div className="p-2 border-b">
                                       <div className="flex items-center gap-x-1 text-gray-600 flex-wrap">
                                            <ToolbarButton command="undo" icon={Undo} tooltip="Undo"/>
                                            <ToolbarButton command="redo" icon={Redo} tooltip="Redo"/>
                                            <Separator orientation="vertical" className="h-6 mx-1" />
                                            <ToolbarButton command="bold" icon={Bold} tooltip="Bold"/>
                                            <ToolbarButton command="italic" icon={Italic} tooltip="Italic"/>
                                            <ToolbarButton command="underline" icon={Underline} tooltip="Underline"/>
                                        </div>
                                    </div>
                                    <CardContent className="p-4 min-h-[200px]">
                                        <div
                                            ref={editorRef}
                                            contentEditable
                                            className="w-full h-full border-0 focus-visible:ring-0 p-0 shadow-none resize-none focus:outline-none"
                                            onInput={(e) => setDescription(e.currentTarget.innerHTML)}
                                            onBlur={updateActiveCommands}
                                            onFocus={updateActiveCommands}
                                            onClick={updateActiveCommands}
                                            onKeyUp={updateActiveCommands}
                                            placeholder="A rich description of the place..."
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="openingHours">Opening Hours</Label>
                                <Textarea id="openingHours" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} placeholder="e.g., Mon-Fri: 9am - 10pm, Sat-Sun: 10am - 11pm"/>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="contactInfo">Contact Information</Label>
                                    <Input id="contactInfo" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="Phone number or email"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website/Social Link</Label>
                                    <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com"/>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Features & Amenities</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                    {amenities.map(amenity => (
                                        <div key={amenity.id} className="flex items-center gap-2">
                                            <Checkbox id={amenity.id} checked={selectedAmenities.includes(amenity.id)} onCheckedChange={(checked) => handleAmenityChange(amenity.id, !!checked)} />
                                            <Label htmlFor={amenity.id} className="font-normal">{amenity.label}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="accessibility">Accessibility Information</Label>
                                <Textarea id="accessibility" value={accessibilityInfo} onChange={(e) => setAccessibilityInfo(e.target.value)} placeholder="Details about accessibility features..."/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="bestVisitTimes">Best Visit Times</Label>
                                <Textarea id="bestVisitTimes" value={bestVisitTimes} onChange={(e) => setBestVisitTimes(e.target.value)} placeholder="e.g., Best during spring for outdoor seating."/>
                            </div>
                             <div className="space-y-2">
                                <Label>Featured Image</Label>
                                {imageUrl && <Image src={imageUrl} alt="Featured image preview" width={200} height={100} className="rounded-md" />}
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
                </div>
                
                <div className="space-y-6 lg:sticky top-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select onValueChange={(value: PlaceStatus) => setStatus(value)} value={status}>
                                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Draft">Draft</SelectItem>
                                        <SelectItem value="Under Review">Under Review</SelectItem>
                                        <SelectItem value="Verified">Verified</SelectItem>
                                        <SelectItem value="Published">Published</SelectItem>
                                        <SelectItem value="Needs Update">Needs Update</SelectItem>
                                        <SelectItem value="Archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <Button className="w-full" onClick={handleSubmit}>Update Place</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="curatorName">Curator Name</Label>
                                <Input id="curatorName" value={curatorName} onChange={(e) => setCuratorName(e.target.value)} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label>Verification Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !verificationDate && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {verificationDate ? format(verificationDate, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={verificationDate} onSelect={setVerificationDate} initialFocus /></PopoverContent>
                                </Popover>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="partnershipStatus">Partnership Status</Label>
                                <Select onValueChange={(value) => setPartnershipStatus(value)} value={partnershipStatus}>
                                    <SelectTrigger id="partnershipStatus"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="None">None</SelectItem>
                                        <SelectItem value="Tier 1">Tier 1 Partner</SelectItem>
                                        <SelectItem value="Tier 2">Tier 2 Partner</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="rating">Internal Rating</Label>
                                <Input id="rating" type="number" min="1" max="5" placeholder="1-5" value={internalRating} onChange={(e) => setInternalRating(e.target.value)} />
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
