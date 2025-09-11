
'use client';

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllPlaces, Place } from "@/lib/redux/slices/placesSlice";
import { Badge } from "@/components/ui/badge";

export default function AllPlacesPage() {
    const allPlaces = useSelector(selectAllPlaces);

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
                                <Badge>{place.status}</Badge>
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
