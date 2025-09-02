import { PageHeader } from "@/components/page-header";

export default function EditorialReviewPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Editorial Review"
        description="Articles under editorial review."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Editorial Review Content</p>
      </div>
    </div>
  );
}
