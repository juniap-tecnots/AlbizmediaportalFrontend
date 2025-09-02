import { PageHeader } from "@/components/page-header";

export default function AudioPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Audio & Podcasts"
        description="Manage all your audio assets."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Audio & Podcasts Content</p>
      </div>
    </div>
  );
}
