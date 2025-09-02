import { PageHeader } from "@/components/page-header";

export default function SpamQueuePage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Spam Queue"
        description="Comments that have been marked as spam."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Spam Queue Content</p>
      </div>
    </div>
  );
}
