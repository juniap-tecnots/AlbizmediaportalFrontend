
import { PageHeader } from "@/components/page-header";

export default function ContractSettingsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Contract Settings"
        description="Configure contract types, workflows, and deadlines."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Contract Settings Content</p>
      </div>
    </div>
  );
}
