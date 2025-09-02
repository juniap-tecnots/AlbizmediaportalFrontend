
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
    { value: 'categories', label: 'Categories', href: '/content/categories' },
];

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    return tabs.find(tab => pathname.includes(tab.value))?.value || 'categories';
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
        title="Categories"
        description="Manage your categories."
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
