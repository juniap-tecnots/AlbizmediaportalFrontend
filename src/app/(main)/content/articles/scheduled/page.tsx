import { PageHeader } from "@/components/page-header";

export default function ScheduledPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Scheduled Articles"
        description="Articles scheduled for publication."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Scheduled Articles Content</p>
      </div>
    </div>
  );
}
