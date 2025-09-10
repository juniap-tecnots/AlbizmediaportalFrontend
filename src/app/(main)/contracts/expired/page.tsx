
import { PageHeader } from "@/components/page-header";

export default function ExpiredContractsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Expired Contracts"
        description="Archive of expired or terminated contracts."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Expired Contracts List</p>
      </div>
    </div>
  );
}
