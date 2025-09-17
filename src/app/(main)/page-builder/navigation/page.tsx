'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  Menu, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Eye,
  Copy,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Upload,
  Star,
  Users,
  Calendar,
  Zap,
  Target,
  Layers,
  Code,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Settings,
  Brush,
  Type,
  Layout,
  Image,
  Video,
  Music,
  ArrowRight,
  ArrowDown,
  Link,
  ExternalLink,
  Home,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Heart,
  Bookmark,
  Share2,
  Bell,
  Search as SearchIcon,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Move,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllMenus,
  addMenu,
  updateMenu,
  deleteMenu
} from '@/lib/redux/slices/menusSlice';
import type { RootState } from '@/lib/redux/store';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  target?: '_blank' | '_self';
  children?: MenuItem[];
  isActive?: boolean;
  isExternal?: boolean;
}

interface Menu {
  id: string;
  name: string;
  description: string;
  location: 'header' | 'footer' | 'sidebar' | 'mobile';
  items: MenuItem[];
  styling: {
    backgroundColor: string;
    textColor: string;
    hoverColor: string;
    activeColor: string;
    fontFamily: string;
    fontSize: string;
    spacing: number;
    borderRadius: number;
  };
  settings: {
    showIcons: boolean;
    showArrows: boolean;
    allowSubmenus: boolean;
    maxDepth: number;
    responsive: boolean;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const defaultMenus: Menu[] = [
  {
    id: 'main-navigation',
    name: 'Main Navigation',
    description: 'Primary navigation menu for the header',
    location: 'header',
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: 'Home',
        isActive: true
      },
      {
        id: 'about',
        label: 'About',
        href: '/about',
        icon: 'User'
      },
      {
        id: 'services',
        label: 'Services',
        href: '/services',
        icon: 'Layers',
        children: [
          {
            id: 'web-design',
            label: 'Web Design',
            href: '/services/web-design',
            icon: 'Layout'
          },
          {
            id: 'development',
            label: 'Development',
            href: '/services/development',
            icon: 'Code'
          },
          {
            id: 'seo',
            label: 'SEO',
            href: '/services/seo',
            icon: 'Search'
          }
        ]
      },
      {
        id: 'portfolio',
        label: 'Portfolio',
        href: '/portfolio',
        icon: 'Image'
      },
      {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        icon: 'Mail'
      }
    ],
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      hoverColor: '#3b82f6',
      activeColor: '#1e40af',
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 16,
      borderRadius: 4
    },
    settings: {
      showIcons: true,
      showArrows: true,
      allowSubmenus: true,
      maxDepth: 2,
      responsive: true
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'footer-navigation',
    name: 'Footer Navigation',
    description: 'Secondary navigation menu for the footer',
    location: 'footer',
    items: [
      {
        id: 'privacy',
        label: 'Privacy Policy',
        href: '/privacy',
        icon: 'Shield'
      },
      {
        id: 'terms',
        label: 'Terms of Service',
        href: '/terms',
        icon: 'FileText'
      },
      {
        id: 'support',
        label: 'Support',
        href: '/support',
        icon: 'HelpCircle'
      },
      {
        id: 'sitemap',
        label: 'Sitemap',
        href: '/sitemap',
        icon: 'Map'
      }
    ],
    styling: {
      backgroundColor: '#1f2937',
      textColor: '#d1d5db',
      hoverColor: '#3b82f6',
      activeColor: '#60a5fa',
      fontFamily: 'Inter',
      fontSize: 'small',
      spacing: 12,
      borderRadius: 0
    },
    settings: {
      showIcons: false,
      showArrows: false,
      allowSubmenus: false,
      maxDepth: 1,
      responsive: true
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function NavigationBuilder() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('menus');
  
  const menus = useSelector(selectAllMenus);
  const allMenus = [...defaultMenus, ...menus.map(m => ({
    ...m,
    styling: {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      hoverColor: '#3b82f6',
      activeColor: '#1e40af',
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 16,
      borderRadius: 4
    },
    settings: {
      showIcons: true,
      showArrows: true,
      allowSubmenus: true,
      maxDepth: 2,
      responsive: true
    }
  }))];

  const filteredMenus = allMenus.filter(menu => {
    const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         menu.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || menu.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleCreateMenu = () => {
    router.push('/page-builder/navigation/create');
  };

  const handleMenuAction = (action: string, menuId: string) => {
    switch (action) {
      case 'edit':
        router.push(`/page-builder/navigation/edit/${menuId}`);
        break;
      case 'duplicate':
        const menu = allMenus.find(m => m.id === menuId);
        if (menu) {
          dispatch(addMenu({
            name: `${menu.name} (Copy)`,
            description: menu.description,
            location: menu.location,
            items: menu.items,
            styling: menu.styling,
            settings: menu.settings
          }));
          toast({
            title: "Menu Duplicated",
            description: "Menu has been duplicated successfully.",
          });
        }
        break;
      case 'preview':
        router.push(`/page-builder/navigation/preview/${menuId}`);
        break;
      case 'delete':
        dispatch(deleteMenu(menuId));
        toast({
          title: "Menu Deleted",
          description: "Menu has been deleted successfully.",
        });
        break;
    }
  };

  const getLocationIcon = (location: string) => {
    const icons = {
      header: Monitor,
      footer: Layers,
      sidebar: Menu,
      mobile: Smartphone
    };
    const Icon = icons[location as keyof typeof icons] || Menu;
    return <Icon className="h-4 w-4" />;
  };

  const getLocationColor = (location: string) => {
    const colors = {
      header: 'bg-blue-100 text-blue-800',
      footer: 'bg-gray-100 text-gray-800',
      sidebar: 'bg-purple-100 text-purple-800',
      mobile: 'bg-green-100 text-green-800'
    };
    return colors[location as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderMenusList = (menus: Menu[]) => {
    if (viewMode === 'grid') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <Card key={menu.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center relative">
                  <Menu className="h-8 w-8 text-muted-foreground" />
                  {menu.isActive && (
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      Active
                    </Badge>
                  )}
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{menu.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {menu.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleMenuAction('preview', menu.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMenuAction('edit', menu.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Menu
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleMenuAction('duplicate', menu.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleMenuAction('delete', menu.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getLocationColor(menu.location)}>
                    <div className="flex items-center gap-1">
                      {getLocationIcon(menu.location)}
                      {menu.location}
                    </div>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {menu.items.length} items
                  </span>
                </div>
                
                {/* Menu Preview */}
                <div className="space-y-1">
                  {menu.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">•</span>
                      <span>{item.label}</span>
                      {item.children && (
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                  {menu.items.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{menu.items.length - 3} more items
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{menu.settings.showIcons ? 'With icons' : 'No icons'}</span>
                  <span>{menu.settings.allowSubmenus ? 'Submenus' : 'Simple'}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleMenuAction('edit', menu.id)}
                >
                  Edit Menu
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          {menus.map((menu) => (
            <Card key={menu.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center">
                      <Menu className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{menu.name}</h3>
                      <p className="text-sm text-muted-foreground">{menu.description}</p>
                    </div>
                    <Badge className={getLocationColor(menu.location)}>
                      <div className="flex items-center gap-1">
                        {getLocationIcon(menu.location)}
                        {menu.location}
                      </div>
                    </Badge>
                    {menu.isActive && (
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {menu.items.length} items • {menu.settings.showIcons ? 'With icons' : 'No icons'}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleMenuAction('preview', menu.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMenuAction('edit', menu.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Menu
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleMenuAction('duplicate', menu.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleMenuAction('delete', menu.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <PageHeader
        title="Navigation Builder"
        description="Create and manage navigation menus for your website."
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Menu
            </Button>
            <Button onClick={handleCreateMenu}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Menu
            </Button>
          </div>
        }
      />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Menus</CardTitle>
            <Menu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allMenus.length}</div>
            <p className="text-xs text-muted-foreground">
              {allMenus.filter(m => m.isActive).length} active menus
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Header Menus</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allMenus.filter(m => m.location === 'header').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Primary navigation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Footer Menus</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allMenus.filter(m => m.location === 'footer').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Secondary navigation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Menus</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allMenus.filter(m => m.location === 'mobile').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Mobile navigation
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="menus">Menus</TabsTrigger>
          <TabsTrigger value="breadcrumbs">Breadcrumbs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="menus" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search menus..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedLocation === 'all' ? 'All Locations' : selectedLocation}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedLocation('all')}>
                    All Locations
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedLocation('header')}>
                    Header Menus
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLocation('footer')}>
                    Footer Menus
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLocation('sidebar')}>
                    Sidebar Menus
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLocation('mobile')}>
                    Mobile Menus
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {renderMenusList(filteredMenus)}

          {filteredMenus.length === 0 && (
            <div className="text-center py-12">
              <Menu className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No menus found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedLocation !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first menu.'
                }
              </p>
              {!searchTerm && selectedLocation === 'all' && (
                <Button className="mt-4" onClick={handleCreateMenu}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Menu
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="breadcrumbs" className="space-y-4">
          <div className="text-center py-12">
            <ArrowRight className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Breadcrumb Navigation</h3>
            <p className="text-muted-foreground">
              Configure breadcrumb navigation settings and styling.
            </p>
            <Button className="mt-4">
              <Settings className="mr-2 h-4 w-4" />
              Configure Breadcrumbs
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="text-center py-12">
            <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Navigation Settings</h3>
            <p className="text-muted-foreground">
              Configure global navigation settings and preferences.
            </p>
            <Button className="mt-4">
              <Settings className="mr-2 h-4 w-4" />
              Open Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}



