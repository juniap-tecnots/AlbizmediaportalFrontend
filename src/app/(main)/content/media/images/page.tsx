
'use client'

import Image from "next/image";
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
import { PlusCircle, UploadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mediaItems = [
  { src: "https://picsum.photos/300/200?random=1", alt: "Newspaper on a table", 'data-ai-hint': 'newspaper' },
  { src: "https://picsum.photos/300/200?random=2", alt: "Man reading a newspaper", 'data-ai-hint': 'man newspaper' },
  { src: "https://picsum.photos/300/200?random=3", alt: "Business newspaper", 'data-ai-hint': 'business newspaper' },
  { src: "https://picsum.photos/300/200?random=4", alt: "Architectural detail", 'data-ai-hint': 'architecture detail' },
  { src: "https://picsum.photos/300/200?random=5", alt: "Mountain peak", 'data-ai-hint': 'mountain peak' },
  { src: "https://picsum.photos/300/200?random=6", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=7", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=8", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=9", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=10", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=11", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=12", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=13", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=14", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=15", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=16", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=17", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
  { src: "https://picsum.photos/300/200?random=18", alt: "Placeholder", 'data-ai-hint': 'placeholder' },
];

export default function ImagesPage() {
    const [showAddMedia, setShowAddMedia] = useState(false);

  return (
    <div className="space-y-4">
       <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddMedia(prev => !prev)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
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
              width={300}
              height={200}
              className="w-full h-auto object-cover rounded-md"
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
