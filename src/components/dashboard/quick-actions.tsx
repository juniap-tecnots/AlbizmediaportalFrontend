import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusCircle, Upload, Send } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Perform common tasks with a single click.</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button>
          <PlusCircle className="mr-2" />
          Create New
        </Button>
        <Button variant="secondary">
          <Upload className="mr-2" />
          Upload File
        </Button>
        <Button variant="secondary">
          <Send className="mr-2" />
          Send Report
        </Button>
      </CardContent>
    </Card>
  )
}
