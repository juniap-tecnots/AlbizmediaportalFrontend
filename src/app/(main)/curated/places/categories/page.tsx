
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlaceCategoriesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Place Categories</CardTitle>
                <CardDescription>Manage the categories for your curated places.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">Place category management will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
