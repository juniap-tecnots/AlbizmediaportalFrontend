import { PageHeader } from "@/components/page-header"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Settings"
        description="Manage your store settings and preferences."
      />
      <Tabs defaultValue="store">
        <TabsList>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Details</CardTitle>
              <CardDescription>Update your store name, email, and other details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="Albiz Media" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Email</Label>
                <Input id="storeEmail" type="email" defaultValue="admin@ecom.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Providers</CardTitle>
              <CardDescription>Connect payment providers to accept payments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Connect Stripe, PayPal, and more.</p>
            </CardContent>
             <CardFooter>
              <Button>Manage Providers</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="newOrders" className="flex flex-col space-y-1">
                  <span>New Orders</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive an email for every new order.
                  </span>
                </Label>
                <Switch id="newOrders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="lowStock" className="flex flex-col space-y-1">
                  <span>Low Stock Alerts</span>
                   <span className="font-normal leading-snug text-muted-foreground">
                    Get notified when products are low in stock.
                  </span>
                </Label>
                <Switch id="lowStock" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
