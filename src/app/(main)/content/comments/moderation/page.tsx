import { PageHeader } from "@/components/page-header";

export default function ModerationPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Pending Moderation"
        description="Comments waiting for your approval."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Pending Moderation Content</p>
      </div>
    </div>
  );
}
