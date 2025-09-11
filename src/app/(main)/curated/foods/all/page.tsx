
'use client';

import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { selectAllFoodVenues, FoodVenue, deleteFoodVenue } from "@/lib/redux/slices/foodsSlice";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function AllFoodsPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const allVenues = useSelector(selectAllFoodVenues);

    const handleDelete = (id: string) => {
        dispatch(deleteFoodVenue(id));
        toast({
            title: "Restaurant Deleted",
            description: "The venue has been successfully deleted.",
            variant: 'destructive'
        })
    }
    
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Restaurant Name</TableHead>
                        <TableHead>Cuisine</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allVenues.map((venue: FoodVenue) => (
                        <TableRow key={venue.id}>
                            <TableCell className="font-medium">{venue.restaurantName}</TableCell>
                            <TableCell>
                                {venue.cuisineType.map(cuisine => (
                                    <Badge key={cuisine} variant="outline" className="mr-1">{cuisine}</Badge>
                                ))}
                            </TableCell>
                            <TableCell>{venue.location}</TableCell>
                            <TableCell>{venue.priceRange}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 hover:text-blue-600">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600" onClick={() => handleDelete(venue.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             {allVenues.length === 0 && (
                <div className="text-center p-12 text-muted-foreground">
                    No restaurants found.
                </div>
            )}
        </div>
    );
}
