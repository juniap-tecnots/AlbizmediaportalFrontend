
'use client';

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllPlaces, Place, PlaceStatus } from "@/lib/redux/slices/placesSlice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AllPlacesPage() {
    const allPlaces = useSelector(selectAllPlaces);

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
                        <TableHead>Actions</TableHead>
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
                            <TableCell>
                                <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
