import { PageHeader } from "@/components/page-header";

export default function PendingReviewPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Pending Review"
        description="Articles waiting for initial review."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Pending Review Content</p>
      </div>
    </div>
  );
}
