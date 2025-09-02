import { PageHeader } from "@/components/page-header";

export default function CategoriesPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Manage Categories"
        description="Organize your content with categories."
      />
      <div className="flex items-center justify-center h-96 border rounded-lg">
        <p className="text-muted-foreground">Categories Content</p>
      </div>
    </div>
  );
}
