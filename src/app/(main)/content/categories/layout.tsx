
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tabs = [
    { value: 'categories', label: 'Categories', href: '/content/categories' },
    { value: 'tags', label: 'Tags', href: '/content/tags' },
];

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    if (pathname.includes('/content/tags')) return 'tags';
    return 'categories';
  }

  const handleTabChange = (value: string) => {
    const href = tabs.find(tab => tab.value === value)?.href;
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Categories & Tags"
        description="Manage your categories and tags."
      />
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
        <TabsList>
            {tabs.map(tab => (
                 <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                 </TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value={getCurrentTab()}>
            {children}
        </TabsContent>
      </Tabs>
    </div>
  );
}
