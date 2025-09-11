
'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const tabs = [
    { value: 'all', label: 'All Events', href: '/curated/events/all' },
    { value: 'calendar', label: 'Calendar View', href: '/curated/events/calendar' },
    { value: 'expired', label: 'Expired Events', href: '/curated/events/expired' },
];

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isNewPage = pathname === '/curated/events/new';

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
        title="Events"
        description="Manage your curated list of events."
        actions={(
            <Link href="/curated/events/new">
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
