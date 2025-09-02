'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, LayoutDashboard, Settings, Gem } from 'lucide-react'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: BarChart },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path || (path !== '/dashboard' && pathname.startsWith(path))

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Gem className="size-6 text-primary" />
          <h1 className="text-xl font-semibold">Albiz Media</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild isActive={isActive(href)} tooltip={label}>
                <Link href={href}>
                  <Icon />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/100" alt="Admin" data-ai-hint="person" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">Admin User</span>
            <span className="text-xs text-muted-foreground">admin@ecom.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
