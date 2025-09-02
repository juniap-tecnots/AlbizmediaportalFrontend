import { PageHeader } from "@/components/page-header";

export default function FlaggedContentPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Flagged Content"
        description="Content that has been flagged by users."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Flagged Content</p>
      </div>
    </div>
  );
}
