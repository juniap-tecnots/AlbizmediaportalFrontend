
'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const tabs = [
    { value: 'all', label: 'All Places', href: '/curated/places/all' },
    { value: 'verification', label: 'Verification Queue', href: '/curated/places/verification' },
];

export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isNewPlacePage = pathname === '/curated/places/new';

  if (isNewPlacePage) {
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
        title="Top Places"
        description="Manage your curated places and attractions."
        actions={(
            <Link href="/curated/places/new">
                <Button>
                    <PlusCircle className="mr-2" />
                    Add New
                </Button>
            </Link>
        )}
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
