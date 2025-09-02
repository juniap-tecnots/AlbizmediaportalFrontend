
'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";

export default function NewMediaPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload New Media</CardTitle>
                        <CardDescription>Drag and drop files here or click to select files.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <UploadCloud className="h-12 w-12 text-muted-foreground" />
                                <p className="text-muted-foreground">Drag 'n' drop some files here, or click to select files</p>
                                <Button variant="outline">Select Files</Button>
                            </div>
                        </div>
                         <div className="mt-4">
                            <p className="text-sm text-muted-foreground">Maximum upload file size: 128 MB.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Publishing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full">Upload</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
