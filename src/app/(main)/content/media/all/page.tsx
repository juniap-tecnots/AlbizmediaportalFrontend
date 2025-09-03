
'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Grid2x2, List, PlusCircle, UploadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSelector } from "react-redux";
import { selectAllMedia } from "@/lib/redux/slices/mediaSlice";


export default function AllMediaPage() {
    const [showAddMedia, setShowAddMedia] = useState(false);
    const mediaItems = useSelector(selectAllMedia);

  return (
    <div className="space-y-4">
       <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddMedia(prev => !prev)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
            <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-9 w-9">
                    <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 bg-accent">
                    <Grid2x2 className="h-4 w-4" />
                </Button>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">All media items</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Images</DropdownMenuItem>
                    <DropdownMenuItem>Audio</DropdownMenuItem>
                    <DropdownMenuItem>Videos</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">All dates</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>January 2024</DropdownMenuItem>
                    <DropdownMenuItem>February 2024</DropdownMenuItem>
                    <DropdownMenuItem>March 2024</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline">Bulk select</Button>
        </div>
        <div className="flex items-center gap-2">
            <Input placeholder="Search media" />
        </div>
      </div>
      {showAddMedia && (
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
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {mediaItems.map((item, index) => (
          <div key={index} className="relative group aspect-square">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover rounded-md"
              data-ai-hint={item['data-ai-hint']}
            />
             <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Checkbox id={`select-${index}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
