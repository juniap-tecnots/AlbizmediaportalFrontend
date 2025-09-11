
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewFoodPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Restaurant</CardTitle>
                <CardDescription>Fill out the form to add a new restaurant.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                    Content Creation Wizard for Foods will be here.
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
