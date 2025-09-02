import { PageHeader } from "@/components/page-header";

export default function AllCommentsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="All Comments"
        description="View and manage all user comments."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">All Comments Content</p>
      </div>
    </div>
  );
}
