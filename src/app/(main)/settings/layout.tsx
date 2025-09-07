
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
    { value: 'accounts', label: 'Accounts', href: '/settings/accounts' },
    { value: 'roles', label: 'Roles', href: '/settings/roles' },
    { value: 'permissions', label: 'Permissions', href: '/settings/permissions' },
    { value: 'hierarchy', label: 'Hierarchy', href: '/settings/hierarchy' },
    { value: 'workflow', label: 'Workflow', href: '/settings/workflow' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentTab = () => {
    // Special case for /settings/roles/new and /settings/permissions/new
    if (pathname.startsWith('/settings/roles')) return 'roles';
    if (pathname.startsWith('/settings/permissions')) return 'permissions';
    return tabs.find(tab => pathname.startsWith(tab.href))?.value || 'accounts';
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
        title="Settings"
        description="Manage your user access, organizational structure, and content lifecycle."
      />
      <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="w-full">
          <TabsList>
              {tabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                      {tab.label}
                  </TabsTrigger>
              ))}
          </TabsList>
           <div className="mt-4">{children}</div>
      </Tabs>
    </div>
  );
}
