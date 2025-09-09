
'use client'

import { PageHeader } from "@/components/page-header"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Settings"
        description="Manage your user access, organizational structure, and content lifecycle."
      />
       <div className="mt-4">{children}</div>
    </div>
  );
}
