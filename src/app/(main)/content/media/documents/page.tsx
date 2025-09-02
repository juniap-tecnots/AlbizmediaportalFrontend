import { PageHeader } from "@/components/page-header";

export default function DocumentsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Document Library"
        description="Manage all your document assets."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Document Library Content</p>
      </div>
    </div>
  );
}
