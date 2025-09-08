
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
