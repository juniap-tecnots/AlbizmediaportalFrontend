
'use client';

import { useSelector } from "react-redux";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllPlaces, Place } from "@/lib/redux/slices/placesSlice";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AllPlacesPage() {
    const allPlaces = useSelector(selectAllPlaces);

    return (
        <div className="space-y-4">
            <PageHeader
                title="All Top Places"
                description="Manage all your curated places."
                actions={(
                    <Link href="/curated/places/new">
                        <Button>
                            <PlusCircle className="mr-2" />
                            Add New Place
                        </Button>
                    </Link>
                )}
            />
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
        </div>
    );
}
