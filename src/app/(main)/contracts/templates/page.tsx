
import { PageHeader } from "@/components/page-header";

export default function ContractTemplatesPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Contract Templates"
        description="Manage predefined contract templates."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Contract Templates List</p>
      </div>
    </div>
  );
}
