import { PageHeader } from "@/components/page-header";

export default function FinalApprovalPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Final Approval Queue"
        description="Articles waiting for final approval."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Final Approval Queue Content</p>
      </div>
    </div>
  );
}
