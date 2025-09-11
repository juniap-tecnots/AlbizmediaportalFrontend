
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExpiredEventsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Expired Events</CardTitle>
                <CardDescription>A list of all past events.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">Expired events list will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
