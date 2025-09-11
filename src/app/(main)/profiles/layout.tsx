
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const tabs = [
    { value: 'all', label: 'All Profiles', href: '/profiles/all' },
    { value: 'pending', label: 'Pending Approval', href: '/profiles/pending' },
    { value: 'settings', label: 'Settings', href: '/profiles/settings' },
];

export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isNewPage = pathname === '/profiles/new';
  const isDetailPage = /^\/profiles\/(prof_).+$/.test(pathname);

  const getCurrentTab = () => {
    if (isNewPage) return 'new';
    if (isDetailPage) return 'detail';
    return tabs.find(tab => pathname.includes(tab.value))?.value || 'all';
  }

  const handleTabChange = (value: string) => {
    const href = tabs.find(tab => tab.value === value)?.href;
    if (href) {
      router.push(href);
    }
  };

  const showHeaderAndTabs = !isNewPage && !isDetailPage;

  return (
    <div className="p-6 md:p-8">
      {showHeaderAndTabs && (
          <>
            <PageHeader
                title="Profile Card Management"
                description="Manage user profiles, approvals, and settings."
                actions={(
                    <Link href="/profiles/new">
                        <Button>
                            <PlusCircle className="mr-2" />
                            Create Profile
                        </Button>
                    </Link>
                )}
            />
            <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
                <TabsList>
                    {tabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
          </>
      )}
      <div className={showHeaderAndTabs ? "mt-4" : ""}>{children}</div>
    </div>
  );
}
