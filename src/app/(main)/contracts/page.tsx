
import { PageHeader } from "@/components/page-header";

export default function ContractsDashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Contracts Dashboard"
        description="Overview of all contracts and their statuses."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Contracts Dashboard Content</p>
      </div>
    </div>
  );
}
