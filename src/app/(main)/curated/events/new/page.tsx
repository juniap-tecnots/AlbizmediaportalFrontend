
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewEventPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Event</CardTitle>
                <CardDescription>Fill out the form to add a new event.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                    Content Creation Wizard for Events will be here.
                    </p>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Draft</Button>
                </div>
            </CardContent>
        </Card>
    );
}
