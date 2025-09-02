import { PageHeader } from "@/components/page-header";

export default function NewArticlePage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Create New Article"
        description="Start writing a new article."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">New Article Form</p>
      </div>
    </div>
  );
}
