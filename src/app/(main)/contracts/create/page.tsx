
import { PageHeader } from "@/components/page-header";

export default function CreateContractPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Create New Contract"
        description="Fill in the details to create a new contract."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Contract Creation Form</p>
      </div>
    </div>
  );
}
