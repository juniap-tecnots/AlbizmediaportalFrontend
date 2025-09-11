
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AllFoodsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Restaurants</CardTitle>
                <CardDescription>A list of all curated food venues.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">All restaurants list will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
