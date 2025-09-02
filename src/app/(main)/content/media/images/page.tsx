import { PageHeader } from "@/components/page-header";

export default function ImagesPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Image Library"
        description="Manage all your image assets."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Image Library Content</p>
      </div>
    </div>
  );
}
