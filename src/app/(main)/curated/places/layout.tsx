
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from "@/components/page-header";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';


export default function PlacesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isNewOrEditPage = pathname.startsWith('/curated/places/new') || pathname.startsWith('/curated/places/edit');
  const isDetailPage = /^\/curated\/places\/place_[a-zA-Z0-9_]+$/.test(pathname);

  if (isNewOrEditPage || isDetailPage) {
    return <>{children}</>;
  }

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
      <div className="mt-4">{children}</div>
    </div>
  );
}
