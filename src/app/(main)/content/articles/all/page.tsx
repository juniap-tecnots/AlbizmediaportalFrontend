import { PageHeader } from "@/components/page-header";

export default function AllArticlesPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="All Articles"
        description="View and manage all articles."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">All Articles Content</p>
      </div>
    </div>
  );
}
