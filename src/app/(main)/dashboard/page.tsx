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
import { SalesChart } from "@/components/analytics/sales-chart"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Dashboard" description="Here's a snapshot of your store's performance." />
        <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download Report</Button>
        </div>
      </div>
      <div className="grid gap-6">
        <Overview />
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <SalesChart />
            </CardContent>
          </Card>
          <div className="lg:col-span-3">
            <RecentSales />
          </div>
        </div>
      </div>
    </div>
  );
}
