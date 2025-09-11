
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlaceVerificationPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Place Verification Queue</CardTitle>
                <CardDescription>Review and verify new place submissions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-96 border rounded-lg">
                    <p className="text-muted-foreground">Verification queue for places will be here.</p>
                </div>
            </CardContent>
        </Card>
    );
}
