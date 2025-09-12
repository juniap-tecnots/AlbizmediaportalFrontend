
'use client'

import { usePathname, useRouter } from 'next/navigation';
import { PageHeader } from "@/components/page-header"

export default function CuratedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If we are on a detail page, don't render the default layout
  const isDetailPage = /^\/curated\/(places|events|foods)\/.+$/.test(pathname);

  if (isDetailPage) {
    return <div className="p-6 md:p-8">{children}</div>;
  }
  
  return (
    <div className="p-6 md:p-8">
       {children}
    </div>
  );
}
