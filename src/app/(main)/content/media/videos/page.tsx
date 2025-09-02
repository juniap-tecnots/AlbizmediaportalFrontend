import { PageHeader } from "@/components/page-header";

export default function VideosPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Video Library"
        description="Manage all your video assets."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Video Library Content</p>
      </div>
    </div>
  );
}
