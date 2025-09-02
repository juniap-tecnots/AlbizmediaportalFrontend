import { PageHeader } from "@/components/page-header";

export default function LegalReviewPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Legal Review"
        description="Articles under legal review."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Legal Review Content</p>
      </div>
    </div>
  );
}
