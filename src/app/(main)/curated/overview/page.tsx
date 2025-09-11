
import { PageHeader } from "@/components/page-header";

export default function CuratedOverviewPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Curated Content Overview"
        description="A unified view of all curated sections."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Curated Content Dashboard</p>
      </div>
    </div>
  );
}
