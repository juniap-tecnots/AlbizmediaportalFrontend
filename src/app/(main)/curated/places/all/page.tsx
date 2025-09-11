
'use client';

import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllPlaces, Place, PlaceStatus, deletePlace } from "@/lib/redux/slices/placesSlice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AllPlacesPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const allPlaces = useSelector(selectAllPlaces);

    const handleDelete = (id: string) => {
        dispatch(deletePlace(id));
        toast({
            title: "Place Deleted",
            description: "The place has been successfully deleted.",
            variant: 'destructive'
        })
    }

    const getStatusBadgeClass = (status: PlaceStatus) => {
        switch (status) {
            case 'Published':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Verified':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Under Review':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Draft':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Needs Update':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Archived':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-secondary';
        }
    };

    return (
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
                    {allPlaces.map((place: Place) => (
                        <TableRow key={place.id}>
                            <TableCell className="font-medium">{place.placeName}</TableCell>
                            <TableCell>{place.category}</TableCell>
                            <TableCell>{place.location.address}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={cn('font-semibold', getStatusBadgeClass(place.status))}>
                                    {place.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                    <Eye className="h-4 w-4" />
                                </Button>
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
        </div>
    );
}
