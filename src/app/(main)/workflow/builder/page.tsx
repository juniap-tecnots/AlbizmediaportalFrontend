
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WorkflowBuilderPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Workflow Builder"
        description="Create and configure your content approval pipelines."
      />
      <Card>
        <CardHeader>
          <CardTitle>Drag-and-Drop Editor</CardTitle>
          <CardDescription>
            Arrange stages, set rules, and define the flow for your content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              Workflow builder canvas will be here.
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Save Template</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
