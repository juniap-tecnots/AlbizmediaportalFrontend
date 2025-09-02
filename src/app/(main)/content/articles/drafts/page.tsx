import { PageHeader } from "@/components/page-header";

export default function DraftsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Drafts"
        description="Articles saved as drafts."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Drafts Content</p>
      </div>
    </div>
  );
}
