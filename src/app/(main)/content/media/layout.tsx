
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
    { value: 'images', label: 'Images', href: '/content/media/images' },
    { value: 'videos', label: 'Videos', href: '/content/media/videos' },
    { value: 'documents', label: 'Documents', href: '/content/media/documents' },
    { value: 'audio', label: 'Audio/Podcasts', href: '/content/media/audio' },
];

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    return tabs.find(tab => pathname.includes(tab.value))?.value || 'images';
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
        title="Media Library"
        description="Manage your images, videos, and other media assets."
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
