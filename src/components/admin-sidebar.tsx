
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, LayoutDashboard, Settings, Gem, Newspaper, CheckSquare, Tag, FolderKanban, MessageSquare, ChevronDown } from 'lucide-react'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: BarChart },
  { href: '/settings', label: 'Settings', icon: Settings },
]

const contentManagementItems = [
    { 
        label: 'Articles', 
        icon: Newspaper,
        href: '/content/articles/all'
    },
    {
        label: 'Categories',
        icon: Tag,
        href: '/content/categories',
    },
    {
        label: 'Media Library',
        icon: FolderKanban,
        href: '/content/media/images',
    },
    {
        label: 'Approval Workflow',
        icon: CheckSquare,
        subItems: [
            { href: '/content/approval/pending', label: 'Pending Review' },
            { href: '/content/approval/editorial', label: 'Editorial Review' },
            { href: '/content/approval/expert', label: 'Expert Review' },
            { href: '/content/approval/legal', label: 'Legal Review' },
            { href: '/content/approval/final', label: 'Final Approval Queue' },
        ]
    },
    {
        label: 'Comments & Interactions',
        icon: MessageSquare,
        subItems: [
            { href: '/content/comments/all', label: 'All Comments' },
            { href: '/content/comments/moderation', label: 'Pending Moderation' },
            { href: '/content/comments/flagged', label: 'Flagged Content' },
            { href: '/content/comments/spam', label: 'Spam Queue' },
        ]
    }
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
        <Separator className="my-2" />
        <SidebarGroup>
            <SidebarGroupLabel>
                Content Management
            </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarMenu>
            {contentManagementItems.map((item) => {
                if (item.href) {
                    return (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                                <Link href={item.href}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                }

                return (
                    <Collapsible key={item.label} asChild>
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    className="justify-between"
                                    isActive={item.subItems.some(sub => isActive(sub.href))}
                                >
                                    <div className="flex items-center gap-2">
                                        <item.icon />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent asChild>
                                <SidebarMenuSub>
                                    {item.subItems.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.href}>
                                            <SidebarMenuSubButton asChild isActive={isActive(subItem.href)}>
                                                <Link href={subItem.href}>{subItem.label}</Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                )
            })}
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
