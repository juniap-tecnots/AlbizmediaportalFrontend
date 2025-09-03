
'use client'

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, UploadCloud } from "lucide-react";
import { useDispatch } from "react-redux";
import { addMediaItem } from "@/lib/redux/slices/mediaSlice";
import { useToast } from "@/hooks/use-toast";

export default function VideosPage() {
  const [showAddMedia, setShowAddMedia] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSelectFilesClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target?.result as string;
          dispatch(addMediaItem({ 
              src, 
              alt: file.name, 
              type: 'video',
              'data-ai-hint': 'new video' 
          }));
        };
        reader.readAsDataURL(file);
      }
       toast({
          title: "Upload Successful",
          description: `${files.length} video(s) have been added.`,
      });
      setShowAddMedia(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddMedia(prev => !prev)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Button>
        </div>
      </div>
       {showAddMedia && (
        <Card>
            <CardHeader>
                <CardTitle>Upload New Video</CardTitle>
                <CardDescription>Drag and drop files here or click to select files.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <UploadCloud className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Drag 'n' drop some files here, or click to select files</p>
                        <Button variant="outline" onClick={handleSelectFilesClick}>Select Files</Button>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                            accept="video/*"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Maximum upload file size: 128 MB.</p>
                </div>
            </CardContent>
        </Card>
      )}
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Video Library Content</p>
      </div>
    </div>
  );
}
