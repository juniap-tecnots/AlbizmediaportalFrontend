

'use client';

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllPlaces, Place, PlaceStatus, deletePlace, updatePlace } from "@/lib/redux/slices/placesSlice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, Pencil, Trash2, Send, Search } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AllPlacesPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const allPlaces = useSelector(selectAllPlaces);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<PlaceStatus | 'All'>('All');
    const [categoryFilter, setCategoryFilter] = useState<'All' | Place['category']>('All');

    const handleDelete = (id: string) => {
        dispatch(deletePlace(id));
        toast({
            title: "Place Deleted",
            description: "The place has been successfully deleted.",
            variant: 'destructive'
        })
    }

    const handleStatusUpdate = (place: Place, status: PlaceStatus) => {
        dispatch(updatePlace({ ...place, status }));
        toast({
            title: "Place Submitted",
            description: `The place "${place.title}" has been submitted for review.`
        });
    }

    const getStatusBadgeClass = (status: PlaceStatus) => {
        switch (status) {
            case 'Published':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Verified':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Under Review':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'In-progress':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Submitted for review':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Needs Update':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Archived':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-secondary';
        }
    };

    const filteredPlaces = allPlaces.filter(place => {
        const matchesStatus = statusFilter === 'All' || place.status === statusFilter;
        const matchesCategory = categoryFilter === 'All' || place.category === categoryFilter;
        const placeTitle = place.title || (place as any).placeName || '';
        const matchesSearch = placeTitle.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Select onValueChange={(value: PlaceStatus | 'All') => setStatusFilter(value)} defaultValue="All">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Verified">Verified</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="In-progress">In-progress</SelectItem>
                            <SelectItem value="Submitted for review">Submitted for review</SelectItem>
                            <SelectItem value="Needs Update">Needs Update</SelectItem>
                            <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value: 'All' | Place['category']) => setCategoryFilter(value)} defaultValue="All">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Categories</SelectItem>
                            <SelectItem value="Restaurant">Restaurant</SelectItem>
                            <SelectItem value="Attraction">Attraction</SelectItem>
                            <SelectItem value="Shopping">Shopping</SelectItem>
                            <SelectItem value="Entertainment">Entertainment</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search places..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Place Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPlaces.map((place: Place) => (
                            <TableRow key={place.id}>
                                <TableCell className="font-medium">{place.title}</TableCell>
                                <TableCell>{place.category}</TableCell>
                                <TableCell>{place.location.address}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn('font-semibold', getStatusBadgeClass(place.status))}>
                                        {place.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    {place.status === 'In-progress' && (
                                        <Button variant="outline" size="icon" onClick={() => handleStatusUpdate(place, 'Submitted for review')} className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Link href={`/curated/places/${place.id}`}>
                                        <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={`/curated/places/edit/${place.id}`}>
                                        <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600" onClick={() => handleDelete(place.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {filteredPlaces.length === 0 && (
                    <div className="text-center p-12 text-muted-foreground">
                        No places found.
                    </div>
                )}
            </div>
        </div>
    );
}
