
'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabs = [
    { value: 'all', label: 'All Restaurants', href: '/curated/foods/all' },
    { value: 'cuisines', label: 'Cuisine Management', href: '/curated/foods/cuisines' },
    { value: 'updates', label: 'Menu Updates', href: '/curated/foods/updates' },
];

export default function FoodsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isNewPage = pathname === '/curated/foods/new';

  if (isNewPage) {
    return <>{children}</>;
  }

  const getCurrentTab = () => {
    const currentPath = pathname.split('/').pop();
    return tabs.find(tab => tab.value === currentPath)?.value || 'all';
  }

  const handleTabChange = (value: string) => {
    const href = tabs.find(tab => tab.value === value)?.href;
    if (href) {
      router.push(href);
    }
  };
  
  return (
    <div className="space-y-4">
      <PageHeader
        title="Foods"
        description="Manage your curated list of restaurants and food venues."
        actions={(
            <Link href="/curated/foods/new">
                <Button>
                    Add New
                </Button>
            </Link>
        )}
      />
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="w-full">
          <TabsList>
              {tabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value} asChild>
                      <Link href={tab.href}>{tab.label}</Link>
                  </TabsTrigger>
              ))}
          </TabsList>
        <TabsContent value={getCurrentTab()} className="mt-4">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
}
