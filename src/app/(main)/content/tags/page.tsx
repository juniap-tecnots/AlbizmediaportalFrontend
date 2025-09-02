import { PageHeader } from "@/components/page-header";

export default function TagsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Manage Tags"
        description="Use tags to further classify your content."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Tags Content</p>
      </div>
    </div>
  );
}
