'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  MoreHorizontal,
  GripVertical,
  Move,
  RotateCcw,
  RotateCw,
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
  Settings,
  Palette,
  Type,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Code,
  Upload,
  Download
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDispatch } from 'react-redux';
import { addMenu } from '@/lib/redux/slices/menusSlice';
import { useToast } from '@/hooks/use-toast';

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

const iconOptions = [
  { value: 'Home', label: 'Home', icon: Home },
  { value: 'FileText', label: 'File Text', icon: FileText },
  { value: 'User', label: 'User', icon: User },
  { value: 'Mail', label: 'Mail', icon: Mail },
  { value: 'Phone', label: 'Phone', icon: Phone },
  { value: 'MapPin', label: 'Map Pin', icon: MapPin },
  { value: 'ShoppingCart', label: 'Shopping Cart', icon: ShoppingCart },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Bookmark', label: 'Bookmark', icon: Bookmark },
  { value: 'Share2', label: 'Share', icon: Share2 },
  { value: 'Bell', label: 'Bell', icon: Bell },
  { value: 'Search', label: 'Search', icon: SearchIcon }
];

export default function CreateMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [menuData, setMenuData] = useState({
    name: '',
    description: '',
    location: 'header' as 'header' | 'footer' | 'sidebar' | 'mobile',
    items: [] as MenuItem[],
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
  });

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleSave = () => {
    if (!menuData.name.trim()) {
      toast({
        title: "Error",
        description: "Menu name is required.",
        variant: "destructive"
      });
      return;
    }

    dispatch(addMenu(menuData));
    
    toast({
      title: "Menu Created",
      description: "Your menu has been created successfully.",
    });
    
    router.push('/page-builder/navigation');
  };

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: `item_${Date.now()}`,
      label: 'New Item',
      href: '#',
      icon: 'Home',
      target: '_self',
      children: [],
      isActive: false,
      isExternal: false
    };
    
    setMenuData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
    
    setEditingItem(newItem);
    setIsAddingItem(true);
  };

  const handleUpdateItem = (itemId: string, updates: Partial<MenuItem>) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  };

  const handleDeleteItem = (itemId: string) => {
    setMenuData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleAddSubItem = (parentId: string) => {
    const newSubItem: MenuItem = {
      id: `subitem_${Date.now()}`,
      label: 'New Sub Item',
      href: '#',
      icon: 'FileText',
      target: '_self',
      children: [],
      isActive: false,
      isExternal: false
    };

    setMenuData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === parentId 
          ? { ...item, children: [...(item.children || []), newSubItem] }
          : item
      )
    }));
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : Home;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const IconComponent = getIconComponent(item.icon || 'Home');
    
    return (
      <div key={item.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <Card className="mb-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <IconComponent className="h-4 w-4" />
                <div>
                  <h4 className="font-medium">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.href}</p>
                </div>
                {item.children && item.children.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {item.children.length} subitems
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddSubItem(item.id)}
                  disabled={!menuData.settings.allowSubmenus || level >= menuData.settings.maxDepth}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingItem(item)}
                >
                  <Settings className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Render sub-items */}
        {item.children && item.children.map(subItem => 
          renderMenuItem(subItem, level + 1)
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Create Menu</h1>
              <p className="text-sm text-muted-foreground">Build your navigation menu</p>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="menu-name">Menu Name</Label>
                  <Input
                    id="menu-name"
                    value={menuData.name}
                    onChange={(e) => setMenuData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter menu name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="menu-description">Description</Label>
                  <Textarea
                    id="menu-description"
                    value={menuData.description}
                    onChange={(e) => setMenuData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter menu description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="menu-location">Location</Label>
                  <Select
                    value={menuData.location}
                    onValueChange={(value: any) => setMenuData(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="header">Header</SelectItem>
                      <SelectItem value="footer">Footer</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-icons">Show Icons</Label>
                    <Switch
                      id="show-icons"
                      checked={menuData.settings.showIcons}
                      onCheckedChange={(checked) => setMenuData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, showIcons: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-arrows">Show Arrows</Label>
                    <Switch
                      id="show-arrows"
                      checked={menuData.settings.showArrows}
                      onCheckedChange={(checked) => setMenuData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, showArrows: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-submenus">Allow Submenus</Label>
                    <Switch
                      id="allow-submenus"
                      checked={menuData.settings.allowSubmenus}
                      onCheckedChange={(checked) => setMenuData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, allowSubmenus: checked }
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="responsive">Responsive</Label>
                    <Switch
                      id="responsive"
                      checked={menuData.settings.responsive}
                      onCheckedChange={(checked) => setMenuData(prev => ({
                        ...prev,
                        settings: { ...prev.settings, responsive: checked }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Colors</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="bg-color"
                        type="color"
                        value={menuData.styling.backgroundColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, backgroundColor: e.target.value }
                        }))}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={menuData.styling.backgroundColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, backgroundColor: e.target.value }
                        }))}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="text-color"
                        type="color"
                        value={menuData.styling.textColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, textColor: e.target.value }
                        }))}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={menuData.styling.textColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, textColor: e.target.value }
                        }))}
                        placeholder="#1f2937"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="hover-color">Hover Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="hover-color"
                        type="color"
                        value={menuData.styling.hoverColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, hoverColor: e.target.value }
                        }))}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={menuData.styling.hoverColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, hoverColor: e.target.value }
                        }))}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="active-color">Active Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="active-color"
                        type="color"
                        value={menuData.styling.activeColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, activeColor: e.target.value }
                        }))}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={menuData.styling.activeColor}
                        onChange={(e) => setMenuData(prev => ({
                          ...prev,
                          styling: { ...prev.styling, activeColor: e.target.value }
                        }))}
                        placeholder="#1e40af"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Typography</h3>
                
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select
                    value={menuData.styling.fontFamily}
                    onValueChange={(value) => setMenuData(prev => ({
                      ...prev,
                      styling: { ...prev.styling, fontFamily: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select
                    value={menuData.styling.fontSize}
                    onValueChange={(value) => setMenuData(prev => ({
                      ...prev,
                      styling: { ...prev.styling, fontSize: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold">{menuData.name || 'Untitled Menu'}</h1>
              <p className="text-sm text-muted-foreground">{menuData.description || 'No description'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsAddingItem(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Menu
            </Button>
          </div>
        </header>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu Items ({menuData.items.length})</h2>
                <Button onClick={handleAddItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
              
              {menuData.items.length === 0 ? (
                <div className="text-center py-12">
                  <Menu className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No menu items yet</h3>
                  <p className="text-muted-foreground">
                    Add your first menu item to get started.
                  </p>
                  <Button className="mt-4" onClick={handleAddItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Item
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {menuData.items.map(item => renderMenuItem(item))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Item Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Edit Menu Item</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="item-label">Label</Label>
                  <Input
                    id="item-label"
                    value={editingItem.label}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, label: e.target.value } : null)}
                    placeholder="Menu item label"
                  />
                </div>
                
                <div>
                  <Label htmlFor="item-href">URL</Label>
                  <Input
                    id="item-href"
                    value={editingItem.href}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, href: e.target.value } : null)}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="item-icon">Icon</Label>
                  <Select
                    value={editingItem.icon || 'Home'}
                    onValueChange={(value) => setEditingItem(prev => prev ? { ...prev, icon: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="item-target">Target</Label>
                  <Select
                    value={editingItem.target || '_self'}
                    onValueChange={(value: any) => setEditingItem(prev => prev ? { ...prev, target: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_self">Same Window</SelectItem>
                      <SelectItem value="_blank">New Window</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setEditingItem(null);
                    setIsAddingItem(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    if (editingItem) {
                      handleUpdateItem(editingItem.id, editingItem);
                      setEditingItem(null);
                      setIsAddingItem(false);
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



