
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventsCalendarPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Events Calendar</CardTitle>
                <CardDescription>A calendar view of all events.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">Events calendar view will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
