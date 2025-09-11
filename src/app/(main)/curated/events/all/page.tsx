
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AllEventsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Events</CardTitle>
                <CardDescription>A list of all upcoming and current events.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">All events list will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
