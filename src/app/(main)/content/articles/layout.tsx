
'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const tabs = [
    { value: 'all', label: 'All Articles', href: '/content/articles/all' },
    { value: 'drafts', label: 'Drafts', href: '/content/articles/drafts' },
    { value: 'scheduled', label: 'Scheduled', href: '/content/articles/scheduled' },
    { value: 'published', label: 'Published', href: '/content/articles/published' },
    { value: 'archived', label: 'Archived', href: '/content/articles/archived' },
];

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    if (pathname === '/content/articles/new') return 'new';
    return tabs.find(tab => pathname.includes(tab.value))?.value || 'all';
  }

  const handleTabChange = (value: string) => {
    if (value === 'new') {
        router.push('/content/articles/new');
        return;
    }
    const href = tabs.find(tab => tab.value === value)?.href;
    if (href) {
      router.push(href);
    }
  };
  
  const isNewArticlePage = pathname === '/content/articles/new';

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Articles"
        description="Manage your articles and content."
        actions={!isNewArticlePage && (
            <Link href="/content/articles/new">
                <Button>
                    <PlusCircle className="mr-2" />
                    Add New
                </Button>
            </Link>
        )}
      />
      {isNewArticlePage ? (
         <div className="mt-4">{children}</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
