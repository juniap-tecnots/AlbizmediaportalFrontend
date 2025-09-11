
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MenuUpdatesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Menu Updates</CardTitle>
                <CardDescription>Review and approve menu updates from restaurants.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">Menu updates queue will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
