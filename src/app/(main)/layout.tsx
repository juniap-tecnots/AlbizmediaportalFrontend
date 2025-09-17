
'use client'

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { AdminSidebar } from "@/components/admin-sidebar";
import { Header } from "@/components/header";
import { selectIsAuthenticated } from '@/lib/redux/slices/authSlice';
import type { RootState } from '@/lib/redux/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  // Check if current page is a theme page (preview, customize, builder)
  const isThemePage = pathname.includes('/content/pages/themes/preview/') || 
                     pathname.includes('/content/pages/themes/customize/') || 
                     pathname.includes('/content/pages/themes/builder');

  // For theme pages, render without sidebar and header
  if (isThemePage) {
    return (
      <div className="min-h-screen w-full bg-white">
        {children}
      </div>
    );
  }

  // For all other pages, render with sidebar and header
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSidebar />
      <div className="flex flex-col sm:pl-64">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
