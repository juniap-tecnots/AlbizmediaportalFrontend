
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Dashboard" description="Here's a snapshot of your store's performance." />
        <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button variant="accent">Download Report</Button>
        </div>
      </div>
      <div className="space-y-6">
        {/* Overview Section */}
        <Overview />
        
        {/* Main Dashboard Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <RecentSales />
          </div>
          <div className="col-span-3">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                  <CardDescription>
                    A quick look at the latest content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-foreground hover:text-primary cursor-pointer">The Future of AI in Journalism</p>
                        <p className="text-xs text-muted-foreground">Published 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-foreground hover:text-primary cursor-pointer">City Council Approves New Budget</p>
                        <p className="text-xs text-muted-foreground">Published yesterday</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-foreground hover:text-primary cursor-pointer">Tech Stocks Rally on Positive News</p>
                        <p className="text-xs text-muted-foreground">Published 3 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
