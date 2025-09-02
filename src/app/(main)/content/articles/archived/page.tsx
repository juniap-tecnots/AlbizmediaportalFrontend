import { PageHeader } from "@/components/page-header";

export default function ArchivedPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Archived Articles"
        description="View all archived articles."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Archived Articles Content</p>
      </div>
    </div>
  );
}
