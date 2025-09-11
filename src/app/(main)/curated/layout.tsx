
'use client'

import { PageHeader } from "@/components/page-header"

export default function CuratedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="p-6 md:p-8">
       {children}
    </div>
  );
}
