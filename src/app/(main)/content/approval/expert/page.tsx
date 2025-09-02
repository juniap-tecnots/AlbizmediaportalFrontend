import { PageHeader } from "@/components/page-header";

export default function ExpertReviewPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Expert Review"
        description="Articles under expert review."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Expert Review Content</p>
      </div>
    </div>
  );
}
