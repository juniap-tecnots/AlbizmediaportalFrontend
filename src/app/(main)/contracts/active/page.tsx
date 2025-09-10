
import { PageHeader } from "@/components/page-header";

export default function ActiveContractsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Active Contracts"
        description="A list of all currently active contracts."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Active Contracts List</p>
      </div>
    </div>
  );
}
