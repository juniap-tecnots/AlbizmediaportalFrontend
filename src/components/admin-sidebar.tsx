
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart, LayoutDashboard, Settings, Gem, Newspaper, Tag, FolderKanban, CheckSquare, MessageSquare, ChevronDown, ChevronRight, User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const menuItems = [
  { id: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', href: '/analytics', label: 'Analytics', icon: BarChart },
  { id: 'users', href: '/users', label: 'Users', icon: User },
]

const contentManagementItems = [
    { 
        id: 'articles',
        label: 'Articles', 
        icon: Newspaper,
        href: '/content/articles/all'
    },
    {
        id: 'categories',
        label: 'Categories',
        icon: Tag,
        href: '/content/categories',
    },
    {
        id: 'media-library',
        label: 'Media Library',
        icon: FolderKanban,
        href: '/content/media/images',
    },
    {
        id: 'approval-workflow',
        label: 'Approval Workflow',
        icon: CheckSquare,
        children: [
            { id: 'pending-review', href: '/content/approval/pending', label: 'Pending Review' },
            { id: 'editorial-review', href: '/content/approval/editorial', label: 'Editorial Review' },
            { id: 'expert-review', href: '/content/approval/expert', label: 'Expert Review' },
            { id: 'legal-review', href: '/content/approval/legal', label: 'Legal Review' },
            { id: 'final-approval', href: '/content/approval/final', label: 'Final Approval Queue' },
        ]
    },
    {
        id: 'comments-interactions',
        label: 'Comments & Interactions',
        icon: MessageSquare,
        children: [
            { id: 'all-comments', href: '/content/comments/all', label: 'All Comments' },
            { id: 'moderation', href: '/content/comments/moderation', label: 'Pending Moderation' },
            { id: 'flagged-content', href: '/content/comments/flagged', label: 'Flagged Content' },
            { id: 'spam-queue', href: '/content/comments/spam', label: 'Spam Queue' },
        ]
    }
];

const settingsMenuItem = { id: 'settings', href: '/settings', label: 'Settings', icon: Settings };


interface MenuItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: Omit<MenuItemProps, 'icon' | 'children'>[];
}

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path?: string) => path && (pathname === path || pathname.startsWith(path + '/'));
  
  const isSubItemActive = (items?: Omit<MenuItemProps, 'icon' | 'children'>[]) => {
      return items?.some(child => isActive(child.href));
  }

  const renderMenuItem = (item: MenuItemProps) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.href) || (hasChildren && (isExpanded || isSubItemActive(item.children)));
    
    const WrapperComponent = item.href ? Link : 'div';
    const wrapperProps = item.href ? { href: item.href } : {};

    return (
        <div key={item.id}>
            <WrapperComponent {...wrapperProps}>
                <div
                    className={cn(
                        'flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group',
                        'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        active && 'bg-primary text-primary-foreground'
                    )}
                    onClick={(e) => {
                        if (hasChildren) {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleExpanded(item.id);
                        }
                    }}
                >
                    <div className="flex items-center space-x-3">
                        <span className={cn(
                            'text-sidebar-foreground group-hover:text-sidebar-accent-foreground',
                             active && 'text-primary-foreground'
                        )}>
                            <item.icon size={20} />
                        </span>
                        <span className="font-medium text-sm">
                            {item.label}
                        </span>
                    </div>
                    {hasChildren && (
                        <span className={cn("text-gray-400 group-hover:text-gray-600", active && 'text-primary-foreground')}>
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                    )}
                </div>
            </WrapperComponent>

            {hasChildren && isExpanded && (
                <div className="mt-1 ml-4 pl-5 border-l border-sidebar-border space-y-1 py-1">
                    {item.children?.map(child => (
                         <Link href={child.href || '#'} key={child.id}>
                             <div className={cn(
                                'block px-3 py-2 rounded-md text-sm font-medium',
                                'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent',
                                isActive(child.href) && 'text-primary bg-primary/10'
                             )}>
                                 {child.label}
                             </div>
                         </Link>
                    ))}
                </div>
            )}
        </div>
    );
  };

  return (
    <div className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col fixed top-0 left-0">
      <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Gem className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">Albiz Media</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
        
        <div className="pt-6">
          <div className="px-3 mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Content Management
            </span>
          </div>
          <div className="space-y-1">
            {contentManagementItems.map(item => renderMenuItem(item as MenuItemProps))}
          </div>
        </div>

        <div className="!mt-auto pt-6">
             <div className="px-3 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Configuration
                </span>
            </div>
            {renderMenuItem(settingsMenuItem)}
        </div>
      </nav>

      <div className="px-4 py-4 border-t">
        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://picsum.photos/100" alt="Admin" data-ai-hint="person" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@ecom.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
