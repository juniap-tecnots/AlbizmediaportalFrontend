
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { 
    AiOutlineDashboard, 
    AiOutlineBarChart, 
    AiOutlineSetting, 
    AiOutlineFileText, 
    AiOutlineTag, 
    AiOutlineFolder, 
    AiOutlineCheckSquare, 
    AiOutlineComment,
    AiOutlineRight,
    AiOutlineDown,
    AiOutlineCarryOut,
    AiOutlineExclamationCircle,
    AiOutlineHistory,
    AiOutlineNodeIndex,
} from 'react-icons/ai'
import { FaGem } from 'react-icons/fa'
import { cn } from '@/lib/utils'

const menuItems = [
  { id: 'dashboard', href: '/dashboard', label: 'Dashboard', icon: AiOutlineDashboard },
  { id: 'analytics', href: '/analytics', label: 'Analytics', icon: AiOutlineBarChart },
]

const contentManagementItems = [
    { 
        id: 'articles',
        label: 'Articles', 
        icon: AiOutlineFileText,
        href: '/content/articles/all'
    },
    {
        id: 'categories',
        label: 'Categories',
        icon: AiOutlineTag,
        href: '/content/categories',
    },
    {
        id: 'media-library',
        label: 'Media Library',
        icon: AiOutlineFolder,
        href: '/content/media/images',
    },
    {
        id: 'comments',
        label: 'Comments',
        icon: AiOutlineComment,
        children: [
            { id: 'all-comments', href: '/content/comments/all', label: 'All Comments' },
            { id: 'moderation', href: '/content/comments/moderation', label: 'Pending Moderation' },
            { id: 'flagged-content', href: '/content/comments/flagged', label: 'Flagged Content' },
            { id: 'spam-queue', href: '/content/comments/spam', label: 'Spam Queue' },
        ]
    }
];

const workflowManagementItems = [
    {
        id: 'workflows',
        label: 'Workflows',
        icon: AiOutlineNodeIndex,
        href: '/workflow'
    },
    {
        id: 'review-queues',
        label: 'Review Queues',
        icon: AiOutlineCarryOut,
        href: '/workflow/queues'
    },
    {
        id: 'sla-escalations',
        label: 'SLA & Escalations',
        icon: AiOutlineExclamationCircle,
        href: '/workflow/sla'
    },
    {
        id: 'audit-trail',
        label: 'Audit Trail',
        icon: AiOutlineHistory,
        href: '/workflow/audit'
    }
];

const settingsMenuItem = {
    id: 'settings',
    label: 'Settings',
    icon: AiOutlineSetting,
    children: [
        { id: 'users', href: '/users', label: 'Users' },
        { id: 'accounts', href: '/settings/accounts', label: 'Accounts' },
        { id: 'roles', href: '/settings/roles', label: 'Roles' },
        { id: 'permissions', href: '/settings/permissions', label: 'Permissions' },
        { id: 'hierarchy', href: '/settings/hierarchy', label: 'Hierarchy' },
        {
            id: 'contracts',
            label: 'Contracts',
            href: '/contracts',
            children: [
                { id: 'contracts-dashboard', href: '/contracts', label: 'Dashboard' },
                { id: 'contracts-create', href: '/contracts/create', label: 'Create New' },
                { id: 'contracts-active', href: '/contracts/active', label: 'Active Contracts' },
                { id: 'contracts-expired', href: '/contracts/expired', label: 'Expired Contracts' },
                { id: 'contracts-templates', href: '/contracts/templates', label: 'Templates' },
                { id: 'contracts-settings', href: '/contracts/settings', label: 'Settings' },
            ]
        }
    ]
};


interface MenuItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: (Omit<MenuItemProps, 'icon'>)[];
}

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<string[]>(['content-management', 'workflow-management', 'settings', 'contracts']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path?: string, hasChildren?: boolean) => {
    if (!path) return false;
    
    // For items with children, check if the current path starts with the item's path,
    // but isn't a more specific match for another top-level item.
    if (pathname.startsWith(path)) {
      if (path === '/content/articles') return pathname.startsWith('/content/articles');
      if (path === '/content/media') return pathname.startsWith('/content/media');
      if (path === '/settings') return pathname.startsWith('/settings') || pathname === '/users';
      if (path === '/workflow') return pathname.startsWith('/workflow');
      if (path === '/contracts') return pathname.startsWith('/contracts');
      if (path === '/content/categories') return pathname === '/content/categories';

      // Special case for settings children, since /users is outside /settings
      if(itemIsChildOf(settingsMenuItem, path)) {
        return pathname === path;
      }
      
      return true;
    }
    return false;
  }
  
  const itemIsChildOf = (parent: MenuItemProps, childHref: string): boolean => {
    if(!parent.children) return false;
    return parent.children.some(child => child.href === childHref || (child.children && itemIsChildOf(child as MenuItemProps, childHref)));
  }

  const renderMenuItem = (item: MenuItemProps) => {
    const hasChildren = item.children && item.children.length > 0;
    
    const anyChildActive = hasChildren && item.children?.some(child => isActive(child.href));
    
    const isExpanded = expandedItems.includes(item.id) || !!anyChildActive;
    
    let active = isActive(item.href, hasChildren);

    if (item.id === 'settings' && (isActive('/users') || isActive('/contracts'))) {
      active = true;
    }

    if (hasChildren && item.children?.some(child => pathname.startsWith(child.href!))) {
        active = true;
    }
    
    // A more specific match for another item should not cause the parent to be active.
    const isMoreSpecificActive = menuItems
      .concat(contentManagementItems as any)
      .concat(workflowManagementItems as any)
      .concat([settingsMenuItem as any])
      .some(i => {
        if (i.href && item.href && i.href !== item.href && pathname.startsWith(i.href) && i.href.length > item.href.length) {
          return true;
        }
        if(i.children) {
            return i.children.some(child => child.href && item.href && child.href !== item.href && pathname.startsWith(child.href) && child.href.length > item.href.length);
        }
        return false;
      });

    if (active && isMoreSpecificActive && item.href !== '/') {
        // Special case for settings
        if (item.id === 'settings' && (pathname.startsWith('/users') || pathname.startsWith('/contracts'))) {
            // keep active
        } else {
            active = false;
        }
    }
    
    if (pathname === item.href) {
        active = true;
    }

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
                        } else if(item.href) {
                            router.push(item.href);
                        }
                    }}
                >
                    <div className="flex items-center space-x-3 flex-1">
                        {item.icon && <span className={cn(
                            'text-sidebar-foreground group-hover:text-sidebar-accent-foreground',
                             active && 'text-primary-foreground'
                        )}>
                            <item.icon size={20} />
                        </span>}
                        <span className="font-medium text-sm truncate">
                            {item.label}
                        </span>
                    </div>
                    <div className='w-4'>
                        {hasChildren && (
                            <span className={cn("text-gray-400 group-hover:text-gray-600", active && 'text-primary-foreground')}>
                                {isExpanded ? <AiOutlineDown size={12} /> : <AiOutlineRight size={12} />}
                            </span>
                        )}
                    </div>
                </div>
            </WrapperComponent>

            {hasChildren && isExpanded && (
                <div className="mt-1 ml-4 pl-5 border-l border-sidebar-border space-y-1 py-1">
                    {item.children?.map(child => renderMenuItem(child as MenuItemProps))}
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
            {menuItems.map(item => renderMenuItem(item as MenuItemProps))}
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
              Workflow Management
            </span>
          </div>
          <div className="space-y-1">
            {workflowManagementItems.map(item => renderMenuItem(item as MenuItemProps))}
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

    </div>
  )
}
