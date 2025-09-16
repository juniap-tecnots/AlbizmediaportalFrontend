'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const tabs = [
    { value: 'all', label: 'All Pages', href: '/content/pages/all' },
    { value: 'drafts', label: 'Drafts', href: '/content/pages/drafts' },
    { value: 'published', label: 'Published', href: '/content/pages/published' },
    { value: 'archived', label: 'Archived', href: '/content/pages/archived' },
];

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    if (pathname === '/content/pages/new') return 'new';
    return tabs.find(tab => pathname.includes(tab.value))?.value || 'all';
  }

  const handleTabChange = (value: string) => {
    if (value === 'new') {
        router.push('/content/pages/new');
        return;
    }
    const href = tabs.find(tab => tab.value === value)?.href;
    if (href) {
      router.push(href);
    }
  };
  
  const isNewPage = pathname === '/content/pages/new';
  const isEditPage = pathname.includes('/content/pages/edit/');
  const isBlockEditor = pathname === '/content/pages/block-editor';
  const isMenusPage = pathname === '/content/pages/menus';
  const isMenusListPage = pathname === '/content/pages/menus/list';
  const isThemesPage = pathname === '/content/pages/themes';
  const isThemesSubPage = pathname.startsWith('/content/pages/themes/');

  if (isNewPage || isEditPage || isBlockEditor || isMenusPage || isMenusListPage || isThemesPage || isThemesSubPage) {
    return <>{children}</>;
  }

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Pages"
        description="Manage your website pages and content."
        actions={(
            <div className="flex gap-2">
                <Link href="/content/pages/block-editor">
                    <Button variant="outline">
                        <PlusCircle className="mr-2" />
                        Block Editor
                    </Button>
                </Link>
                <Link href="/content/pages/new">
                    <Button>
                        <PlusCircle className="" />
                        Add
                    </Button>
                </Link>
            </div>
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
      <div className="mt-4">{children}</div>
    </div>
  );
}
