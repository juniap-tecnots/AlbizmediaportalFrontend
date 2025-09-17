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
  Layout, 
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
  Palette,
  Code,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllTemplates,
  selectTemplatesByCategory,
  createTemplate,
  deleteTemplate,
  updateTemplate
} from '@/lib/redux/slices/pageBuilderSlice';
import type { RootState } from '@/lib/redux/store';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function TemplatesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const allTemplates = useSelector(selectAllTemplates);
  const landingTemplates = useSelector((state: RootState) => selectTemplatesByCategory(state, 'landing'));
  const blogTemplates = useSelector((state: RootState) => selectTemplatesByCategory(state, 'blog'));
  const portfolioTemplates = useSelector((state: RootState) => selectTemplatesByCategory(state, 'portfolio'));
  const businessTemplates = useSelector((state: RootState) => selectTemplatesByCategory(state, 'business'));
  const customTemplates = useSelector((state: RootState) => selectTemplatesByCategory(state, 'custom'));

  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateTemplate = () => {
    router.push('/page-builder/templates/create');
  };

  const handleUseTemplate = (templateId: string) => {
    const template = allTemplates.find(t => t.id === templateId);
    if (template) {
      // TODO: Create page from template
      toast({
        title: "Template Selected",
        description: `Creating page from ${template.name} template...`,
      });
      router.push('/page-builder/pages');
    }
  };

  const handleTemplateAction = (action: string, templateId: string) => {
    switch (action) {
      case 'preview':
        router.push(`/page-builder/templates/preview/${templateId}`);
        break;
      case 'edit':
        router.push(`/page-builder/templates/edit/${templateId}`);
        break;
      case 'duplicate':
        const template = allTemplates.find(t => t.id === templateId);
        if (template) {
          dispatch(createTemplate({
            name: `${template.name} (Copy)`,
            description: template.description,
            category: template.category,
            thumbnail: template.thumbnail,
            preview: template.preview,
            content: template.content,
            styling: template.styling,
            seo: template.seo,
            settings: template.settings,
            isCustom: true,
            createdBy: 'current_user',
            tags: template.tags
          }));
          toast({
            title: "Template Duplicated",
            description: "Template has been duplicated successfully.",
          });
        }
        break;
      case 'delete':
        dispatch(deleteTemplate(templateId));
        toast({
          title: "Template Deleted",
          description: "Template has been deleted successfully.",
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
    const Icon = icons[category as keyof typeof icons] || Layout;
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

  const renderTemplatesList = (templates: any[]) => {
    if (viewMode === 'grid') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                  <Layout className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleTemplateAction('preview', template.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUseTemplate(template.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Use Template
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {template.isCustom && (
                        <DropdownMenuItem onClick={() => handleTemplateAction('edit', template.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleTemplateAction('duplicate', template.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      {template.isCustom && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleTemplateAction('delete', template.id)}
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
                  <Badge className={getCategoryColor(template.category)}>
                    <div className="flex items-center gap-1">
                      {getCategoryIcon(template.category)}
                      {template.category}
                    </div>
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {template.usageCount} uses
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{template.content.length} blocks</span>
                  <span>{template.isCustom ? 'Custom' : 'System'}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleUseTemplate(template.id)}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center">
                      <Layout className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Badge className={getCategoryColor(template.category)}>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(template.category)}
                        {template.category}
                      </div>
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {template.content.length} blocks • {template.usageCount} uses
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleTemplateAction('preview', template.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUseTemplate(template.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Use Template
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {template.isCustom && (
                          <DropdownMenuItem onClick={() => handleTemplateAction('edit', template.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleTemplateAction('duplicate', template.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        {template.isCustom && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleTemplateAction('delete', template.id)}
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
        title="Templates"
        description="Choose from pre-built templates or create your own custom templates."
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button onClick={handleCreateTemplate}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>
        }
      />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTemplates.length}</div>
            <p className="text-xs text-muted-foreground">
              {customTemplates.length} custom templates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Landing Pages</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{landingTemplates.length}</div>
            <p className="text-xs text-muted-foreground">
              Marketing focused
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Templates</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogTemplates.length}</div>
            <p className="text-xs text-muted-foreground">
              Content focused
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolioTemplates.length}</div>
            <p className="text-xs text-muted-foreground">
              Showcase focused
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Templates ({allTemplates.length})</TabsTrigger>
          <TabsTrigger value="landing">Landing ({landingTemplates.length})</TabsTrigger>
          <TabsTrigger value="blog">Blog ({blogTemplates.length})</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio ({portfolioTemplates.length})</TabsTrigger>
          <TabsTrigger value="business">Business ({businessTemplates.length})</TabsTrigger>
          <TabsTrigger value="custom">Custom ({customTemplates.length})</TabsTrigger>
        </TabsList>

        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
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
                  Blog Templates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('portfolio')}>
                  Portfolio Templates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('business')}>
                  Business Templates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory('custom')}>
                  Custom Templates
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

        <TabsContent value="all">
          {renderTemplatesList(filteredTemplates)}
        </TabsContent>

        <TabsContent value="landing">
          {renderTemplatesList(landingTemplates.filter(t => 
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
          ))}
        </TabsContent>

        <TabsContent value="blog">
          {renderTemplatesList(blogTemplates.filter(t => 
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
          ))}
        </TabsContent>

        <TabsContent value="portfolio">
          {renderTemplatesList(portfolioTemplates.filter(t => 
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
          ))}
        </TabsContent>

        <TabsContent value="business">
          {renderTemplatesList(businessTemplates.filter(t => 
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
          ))}
        </TabsContent>

        <TabsContent value="custom">
          {renderTemplatesList(customTemplates.filter(t => 
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
          ))}
        </TabsContent>
      </Tabs>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Layout className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No templates found</h3>
          <p className="text-muted-foreground">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first template.'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && (
            <Button className="mt-4" onClick={handleCreateTemplate}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Template
            </Button>
          )}
        </div>
      )}
    </div>
  );
}



