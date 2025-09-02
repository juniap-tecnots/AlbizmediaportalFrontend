import { PageHeader } from "@/components/page-header";

export default function PublishedPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Published Articles"
        description="View all published articles."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Published Articles Content</p>
      </div>
    </div>
  );
}
