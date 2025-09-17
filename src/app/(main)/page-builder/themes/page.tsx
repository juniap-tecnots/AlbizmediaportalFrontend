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
  Palette, 
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
  Music
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate
} from '@/lib/redux/slices/pageBuilderSlice';
import type { RootState } from '@/lib/redux/store';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'blog' | 'portfolio' | 'business' | 'ecommerce' | 'custom';
  thumbnail: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: number;
  };
  spacing: {
    padding: number;
    margin: number;
    borderRadius: number;
  };
  layout: {
    width: string;
    alignment: string;
    responsive: boolean;
  };
  isCustom: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
  tags: string[];
  isActive?: boolean;
}

const defaultThemes: Theme[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and minimalist design with focus on content',
    category: 'landing',
    thumbnail: '/themes/modern-minimal.jpg',
    preview: '/themes/modern-minimal-preview.jpg',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 'medium',
      lineHeight: 1.6
    },
    spacing: {
      padding: 24,
      margin: 16,
      borderRadius: 8
    },
    layout: {
      width: 'full',
      alignment: 'center',
      responsive: true
    },
    isCustom: false,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 0,
    tags: ['minimal', 'clean', 'modern'],
    isActive: true
  },
  {
    id: 'news-portal',
    name: 'News Portal',
    description: 'Professional news website layout with article focus',
    category: 'blog',
    thumbnail: '/themes/news-portal.jpg',
    preview: '/themes/news-portal-preview.jpg',
    colors: {
      primary: '#dc2626',
      secondary: '#374151',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#111827'
    },
    typography: {
      fontFamily: 'Roboto',
      fontSize: 'medium',
      lineHeight: 1.7
    },
    spacing: {
      padding: 20,
      margin: 12,
      borderRadius: 4
    },
    layout: {
      width: 'full',
      alignment: 'left',
      responsive: true
    },
    isCustom: false,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 0,
    tags: ['news', 'articles', 'professional']
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Bold and creative design for showcasing work',
    category: 'portfolio',
    thumbnail: '/themes/creative-portfolio.jpg',
    preview: '/themes/creative-portfolio-preview.jpg',
    colors: {
      primary: '#8b5cf6',
      secondary: '#6b7280',
      accent: '#fbbf24',
      background: '#f8fafc',
      text: '#1e293b'
    },
    typography: {
      fontFamily: 'Poppins',
      fontSize: 'large',
      lineHeight: 1.5
    },
    spacing: {
      padding: 32,
      margin: 20,
      borderRadius: 12
    },
    layout: {
      width: 'full',
      alignment: 'center',
      responsive: true
    },
    isCustom: false,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 0,
    tags: ['creative', 'portfolio', 'bold']
  },
  {
    id: 'business-corporate',
    name: 'Business Corporate',
    description: 'Professional corporate website design',
    category: 'business',
    thumbnail: '/themes/business-corporate.jpg',
    preview: '/themes/business-corporate-preview.jpg',
    colors: {
      primary: '#1e40af',
      secondary: '#475569',
      accent: '#059669',
      background: '#ffffff',
      text: '#0f172a'
    },
    typography: {
      fontFamily: 'Open Sans',
      fontSize: 'medium',
      lineHeight: 1.6
    },
    spacing: {
      padding: 20,
      margin: 16,
      borderRadius: 6
    },
    layout: {
      width: 'full',
      alignment: 'left',
      responsive: true
    },
    isCustom: false,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 0,
    tags: ['business', 'corporate', 'professional']
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Optimized for online shopping and product display',
    category: 'ecommerce',
    thumbnail: '/themes/ecommerce-store.jpg',
    preview: '/themes/ecommerce-store-preview.jpg',
    colors: {
      primary: '#059669',
      secondary: '#6b7280',
      accent: '#dc2626',
      background: '#ffffff',
      text: '#111827'
    },
    typography: {
      fontFamily: 'Lato',
      fontSize: 'medium',
      lineHeight: 1.6
    },
    spacing: {
      padding: 16,
      margin: 12,
      borderRadius: 8
    },
    layout: {
      width: 'full',
      alignment: 'center',
      responsive: true
    },
    isCustom: false,
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    usageCount: 0,
    tags: ['ecommerce', 'shopping', 'products']
  }
];

export default function ThemesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('gallery');
  
  const templates = useSelector(selectAllTemplates);
  const allThemes = [...defaultThemes, ...templates.map(t => ({
    ...t,
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: 'medium',
      lineHeight: 1.6
    },
    spacing: {
      padding: 16,
      margin: 0,
      borderRadius: 0
    },
    layout: {
      width: 'full',
      alignment: 'left',
      responsive: true
    }
  }))];

  const filteredThemes = allThemes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theme.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || theme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTheme = () => {
    router.push('/page-builder/themes/create');
  };

  const handleUseTheme = (themeId: string) => {
    const theme = allThemes.find(t => t.id === themeId);
    if (theme) {
      toast({
        title: "Theme Applied",
        description: `${theme.name} theme has been applied to your page.`,
      });
      router.push('/page-builder/pages');
    }
  };

  const handleThemeAction = (action: string, themeId: string) => {
    switch (action) {
      case 'preview':
        router.push(`/page-builder/themes/preview/${themeId}`);
        break;
      case 'customize':
        router.push(`/page-builder/themes/customize/${themeId}`);
        break;
      case 'edit':
        router.push(`/page-builder/themes/edit/${themeId}`);
        break;
      case 'duplicate':
        const theme = allThemes.find(t => t.id === themeId);
        if (theme) {
          dispatch(createTemplate({
            name: `${theme.name} (Copy)`,
            description: theme.description,
            category: theme.category,
            thumbnail: theme.thumbnail,
            preview: theme.preview,
            content: [],
            styling: {
              backgroundColor: theme.colors.background,
              textColor: theme.colors.text,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.typography.fontSize,
              lineHeight: theme.typography.lineHeight,
              customCSS: '',
              theme: theme.id,
              responsive: {
                mobile: {},
                tablet: {},
                desktop: {}
              }
            },
            seo: {},
            settings: {},
            isCustom: true,
            createdBy: 'current_user',
            tags: theme.tags
          }));
          toast({
            title: "Theme Duplicated",
            description: "Theme has been duplicated successfully.",
          });
        }
        break;
      case 'delete':
        dispatch(deleteTemplate(themeId));
        toast({
          title: "Theme Deleted",
          description: "Theme has been deleted successfully.",
        });
        break;
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      landing: Target,
      blog: Globe,
      portfolio: Layers,
      business: Users,
      ecommerce: Zap,
      custom: Code
    };
    const Icon = icons[category as keyof typeof icons] || Palette;
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      landing: 'bg-red-100 text-red-800',
      blog: 'bg-blue-100 text-blue-800',
      portfolio: 'bg-purple-100 text-purple-800',
      business: 'bg-green-100 text-green-800',
      ecommerce: 'bg-orange-100 text-orange-800',
      custom: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderThemesList = (themes: Theme[]) => {
    if (viewMode === 'grid') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <Card key={theme.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center relative">
                  <Palette className="h-8 w-8 text-muted-foreground" />
                  {theme.isActive && (
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      Active
                    </Badge>
                  )}
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{theme.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {theme.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleThemeAction('preview', theme.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleThemeAction('customize', theme.id)}>
                        <Brush className="mr-2 h-4 w-4" />
                        Customize
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUseTheme(theme.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Use Theme
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {theme.isCustom && (
                        <DropdownMenuItem onClick={() => handleThemeAction('edit', theme.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleThemeAction('duplicate', theme.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      {theme.isCustom && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleThemeAction('delete', theme.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getCategoryColor(theme.category)}>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(theme.category)}
                      {theme.category}
                    </div>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {theme.usageCount} uses
                  </span>
                </div>
                
                {/* Color Preview */}
                <div className="flex gap-1">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.primary }}
                    title="Primary"
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.secondary }}
                    title="Secondary"
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.accent }}
                    title="Accent"
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: theme.colors.background }}
                    title="Background"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{theme.typography.fontFamily}</span>
                  <span>{theme.isCustom ? 'Custom' : 'System'}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleUseTheme(theme.id)}
                >
                  Use Theme
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          {themes.map((theme) => (
            <Card key={theme.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center">
                      <Palette className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                    <Badge className={getCategoryColor(theme.category)}>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(theme.category)}
                        {theme.category}
                      </div>
                    </Badge>
                    {theme.isActive && (
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex gap-1">
                      <div 
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full border"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {theme.typography.fontFamily} • {theme.usageCount} uses
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleThemeAction('preview', theme.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleThemeAction('customize', theme.id)}>
                          <Brush className="mr-2 h-4 w-4" />
                          Customize
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUseTheme(theme.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Use Theme
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {theme.isCustom && (
                          <DropdownMenuItem onClick={() => handleThemeAction('edit', theme.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleThemeAction('duplicate', theme.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        {theme.isCustom && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleThemeAction('delete', theme.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
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
        title="Themes"
        description="Choose from pre-built themes or create your own custom designs."
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Theme
            </Button>
            <Button onClick={handleCreateTheme}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Theme
            </Button>
          </div>
        }
      />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Themes</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allThemes.length}</div>
            <p className="text-xs text-muted-foreground">
              {allThemes.filter(t => t.isCustom).length} custom themes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Theme</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allThemes.find(t => t.isActive)?.name || 'None'}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently applied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allThemes.reduce((max, theme) => theme.usageCount > max.usageCount ? theme : max, allThemes[0])?.name || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Popular choice
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(allThemes.map(t => t.category)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Different styles
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="gallery">Theme Gallery</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="builder">Theme Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search themes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedCategory('landing')}>
                    Landing Pages
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('blog')}>
                    Blog Themes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('portfolio')}>
                    Portfolio Themes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('business')}>
                    Business Themes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('ecommerce')}>
                    E-commerce Themes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory('custom')}>
                    Custom Themes
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

          {renderThemesList(filteredThemes)}

          {filteredThemes.length === 0 && (
            <div className="text-center py-12">
              <Palette className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No themes found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first theme.'
                }
              </p>
              {!searchTerm && selectedCategory === 'all' && (
                <Button className="mt-4" onClick={handleCreateTheme}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Theme
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="customize" className="space-y-4">
          <div className="text-center py-12">
            <Brush className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Theme Customizer</h3>
            <p className="text-muted-foreground">
              Customize colors, typography, and layout settings for your active theme.
            </p>
            <Button className="mt-4">
              <Settings className="mr-2 h-4 w-4" />
              Open Customizer
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <div className="text-center py-12">
            <Code className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Theme Builder</h3>
            <p className="text-muted-foreground">
              Create custom themes from scratch with our visual theme builder.
            </p>
            <Button className="mt-4" onClick={handleCreateTheme}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Start Building
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}



