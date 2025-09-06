
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
  { id: 'settings', href: '/settings', label: 'Settings', icon: Settings },
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
    
    const WrapperComponent = item.href ? Link : 'div';
    const wrapperProps = item.href ? { href: item.href } : {};

    return (
        <div key={item.id}>
            <WrapperComponent {...wrapperProps}>
                <div
                    className={cn(
                        'flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group',
                        'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
                        (isActive(item.href) || (hasChildren && (isExpanded || isSubItemActive(item.children)))) && 'bg-gray-50 text-gray-900'
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
                            'text-gray-500 group-hover:text-gray-700',
                             (isActive(item.href) || isSubItemActive(item.children)) && 'text-gray-700'
                        )}>
                            <item.icon size={20} />
                        </span>
                        <span className="font-medium text-sm">
                            {item.label}
                        </span>
                    </div>
                    {hasChildren && (
                        <span className="text-gray-400 group-hover:text-gray-600">
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                    )}
                </div>
            </WrapperComponent>

            {hasChildren && isExpanded && (
                <div className="mt-1 ml-4 pl-5 border-l border-gray-200 space-y-1 py-1">
                    {item.children?.map(child => (
                         <Link href={child.href || '#'} key={child.id}>
                             <div className={cn(
                                'block px-3 py-2 rounded-md text-sm font-medium',
                                'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                isActive(child.href) && 'text-gray-900 bg-gray-100'
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
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Albiz Media</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </div>
        
        <div className="mt-8">
          <div className="px-3 mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Content Management
            </span>
          </div>
          <div className="space-y-1">
            {contentManagementItems.map(item => renderMenuItem(item as MenuItemProps))}
          </div>
        </div>
      </nav>

      <div className="px-4 py-4">
        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://picsum.photos/100" alt="Admin" data-ai-hint="person" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@ecom.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
