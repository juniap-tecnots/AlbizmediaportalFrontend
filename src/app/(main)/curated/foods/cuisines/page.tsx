
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CuisinesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cuisine Management</CardTitle>
                <CardDescription>Manage the cuisine types for your curated food venues.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">Cuisine management will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
