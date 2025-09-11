
'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
    { value: 'all', label: 'All Restaurants', href: '/curated/foods/all' },
    { value: 'new', label: 'Add New', href: '/curated/foods/new' },
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
      />
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
          <TabsList>
              {tabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value} asChild>
                      <Link href={tab.href}>{tab.label}</Link>
                  </TabsTrigger>
              ))}
          </TabsList>
      </Tabs>
      <div className="mt-4">{children}</div>
    </div>
  );
}
