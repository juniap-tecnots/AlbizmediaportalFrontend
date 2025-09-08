
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaTachometerAlt, FaChartBar, FaCog, FaNewspaper, FaTag, FaFolder, FaCheckSquare, FaComments, FaChevronDown, FaChevronRight, FaUsers, FaGem } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutSuccess } from '@/lib/redux/slices/authSlice'
import { Button } from './ui/button'

const menuItems = [
  { id: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { id: 'analytics', href: '/analytics', label: 'Analytics', icon: FaChartBar },
]

const contentManagementItems = [
    { 
        id: 'articles',
        label: 'Articles', 
        icon: FaNewspaper,
        href: '/content/articles/all'
    },
    {
        id: 'categories',
        label: 'Categories',
        icon: FaTag,
        href: '/content/categories',
    },
    {
        id: 'media-library',
        label: 'Media Library',
        icon: FaFolder,
        href: '/content/media/images',
    },
    {
        id: 'approval-workflow',
        label: 'Approval Workflow',
        icon: FaCheckSquare,
        children: [
            { id: 'pending-review', href: '/content/approval/pending', label: 'Pending Review' },
            { id: 'editorial-review', href: '/content/approval/editorial', label: 'Editorial Review' },
            { id: 'expert-review', href: '/content/approval/expert', label: 'Expert Review' },
            { id: 'legal-review', href: '/content/approval/legal', label: 'Legal Review' },
            { id: 'final-approval', href: '/content/approval/final', label: 'Final Approval Queue' },
        ]
    },
    {
        id: 'comments',
        label: 'Comments',
        icon: FaComments,
        children: [
            { id: 'all-comments', href: '/content/comments/all', label: 'All Comments' },
            { id: 'moderation', href: '/content/comments/moderation', label: 'Pending Moderation' },
            { id: 'flagged-content', href: '/content/comments/flagged', label: 'Flagged Content' },
            { id: 'spam-queue', href: '/content/comments/spam', label: 'Spam Queue' },
        ]
    }
];

const settingsMenuItem = {
    id: 'settings',
    label: 'Settings',
    icon: FaCog,
    children: [
        { id: 'users', href: '/users', label: 'Users' },
        { id: 'accounts', href: '/settings/accounts', label: 'Accounts' },
        { id: 'roles', href: '/settings/roles', label: 'Roles' },
        { id: 'permissions', href: '/settings/permissions', label: 'Permissions' },
        { id: 'hierarchy', href: '/settings/hierarchy', label: 'Hierarchy' },
        { id: 'workflow', href: '/settings/workflow', label: 'Workflow' },
    ]
};


interface MenuItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: Omit<MenuItemProps, 'icon' | 'children'>[];
}

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    router.push('/auth/signin');
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    if (path === '/settings') {
        return pathname.startsWith('/settings') || pathname.startsWith('/users');
    }
    return pathname === path || pathname.startsWith(path + '/');
  }
  
  const isSubItemActive = (items?: Omit<MenuItemProps, 'icon' | 'children'>[]) => {
      return items?.some(child => isActive(child.href));
  }

  const renderMenuItem = (item: MenuItemProps) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.href) || (hasChildren && (isExpanded || isSubItemActive(item.children)));
    
    const WrapperComponent = item.href && !hasChildren ? Link : 'div';
    const wrapperProps = item.href && !hasChildren ? { href: item.href } : {};

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
                        } else if (item.href) {
                            // Let the Link handle it
                        }
                    }}
                >
                    <div className="flex items-center space-x-3 flex-1">
                        <span className={cn(
                            'text-sidebar-foreground group-hover:text-sidebar-accent-foreground',
                             active && 'text-primary-foreground'
                        )}>
                            <item.icon size={16} />
                        </span>
                        <span className="font-medium text-sm truncate">
                            {item.label}
                        </span>
                    </div>
                    <div className='w-4'>
                        {hasChildren && (
                            <span className={cn("text-gray-400 group-hover:text-gray-600", active && 'text-primary-foreground')}>
                                {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                            </span>
                        )}
                    </div>
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
          <div className="w-8 h-8 border border-primary rounded-lg flex items-center justify-center">
            <FaGem className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-foreground">Albiz Media</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className='space-y-1'>
            {menuItems.map(item => renderMenuItem(item))}
        </div>
        
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

        <div className="pt-6">
             <div className="px-3 mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Configuration
                </span>
            </div>
            {renderMenuItem(settingsMenuItem as MenuItemProps)}
        </div>
      </div>

      <div className="px-4 py-4 border-t mt-auto">
        {currentUser ? (
             <div className="flex items-center justify-between space-x-3 px-3 py-2 rounded-lg bg-muted hover:bg-sidebar-accent cursor-pointer transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.firstName} data-ai-hint="person" />
                <AvatarFallback>{currentUser.firstName[0]}{currentUser.lastName[0]}</AvatarFallback>
              </Avatar>
               <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
        ) : (
             <Button className="w-full" onClick={() => router.push('/auth/signin')}>Sign In</Button>
        )}
      </div>
    </div>
  )
}
