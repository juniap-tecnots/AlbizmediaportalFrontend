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
  FileText, 
  Globe, 
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  Eye,
  Archive,
  Calendar,
  Users,
  Menu,
  Palette
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllPages, 
  selectPagesByStatus, 
  createPage,
  deletePage,
  duplicatePage,
  publishPage,
  archivePage,
  setCurrentPage
} from '@/lib/redux/slices/pageBuilderSlice';
import type { RootState } from '@/lib/redux/store';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

export default function PagesManagement() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const allPages = useSelector(selectAllPages);
  const publishedPages = useSelector((state: RootState) => selectPagesByStatus(state, 'published'));
  const draftPages = useSelector((state: RootState) => selectPagesByStatus(state, 'draft'));
  const scheduledPages = useSelector((state: RootState) => selectPagesByStatus(state, 'scheduled'));
  const archivedPages = useSelector((state: RootState) => selectPagesByStatus(state, 'archived'));

  const handleCreatePage = () => {
    const newPageTitle = `New Page ${allPages.length + 1}`;
    dispatch(createPage({ title: newPageTitle }));
    toast({
      title: "Page Created",
      description: "Your new page has been created successfully.",
    });
    router.push('/page-builder/pages/all');
  };

  const handlePageAction = (action: string, pageId: string) => {
    switch (action) {
      case 'edit':
        dispatch(setCurrentPage(allPages.find(p => p.id === pageId) || null));
        router.push(`/page-builder/pages/${pageId}`);
        break;
      case 'duplicate':
        const page = allPages.find(p => p.id === pageId);
        if (page) {
          dispatch(duplicatePage({
            id: pageId,
            newTitle: `${page.title} (Copy)`,
            newSlug: `${page.slug}-copy`
          }));
          toast({
            title: "Page Duplicated",
            description: "Page has been duplicated successfully.",
          });
        }
        break;
      case 'publish':
        dispatch(publishPage(pageId));
        toast({
          title: "Page Published",
          description: "Page has been published successfully.",
        });
        break;
      case 'archive':
        dispatch(archivePage(pageId));
        toast({
          title: "Page Archived",
          description: "Page has been archived successfully.",
        });
        break;
      case 'delete':
        dispatch(deletePage(pageId));
        toast({
          title: "Page Deleted",
          description: "Page has been deleted successfully.",
        });
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'Published', variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      draft: { label: 'Draft', variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      scheduled: { label: 'Scheduled', variant: 'outline' as const, className: 'bg-blue-100 text-blue-800' },
      archived: { label: 'Archived', variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' },
      pending_review: { label: 'Pending Review', variant: 'outline' as const, className: 'bg-orange-100 text-orange-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderPagesList = (pages: any[]) => {
    const filteredPages = pages.filter(page => 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (viewMode === 'grid') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <CardDescription className="text-sm">
                      /{page.slug}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handlePageAction('edit', page.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePageAction('duplicate', page.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {page.status === 'draft' && (
                        <DropdownMenuItem onClick={() => handlePageAction('publish', page.id)}>
                          <Globe className="mr-2 h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      {page.status === 'published' && (
                        <DropdownMenuItem onClick={() => handlePageAction('archive', page.id)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handlePageAction('delete', page.id)}
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
                  {getStatusBadge(page.status)}
                  <span className="text-xs text-muted-foreground">
                    v{page.version}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Updated {formatDate(page.updatedAt)}
                  </div>
                  {page.publishedAt && (
                    <div className="flex items-center gap-1 mt-1">
                      <Globe className="h-3 w-3" />
                      Published {formatDate(page.publishedAt)}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {page.content.length} blocks
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageAction('edit', page.id)}
                    className="h-6 px-2"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          {filteredPages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{page.title}</h3>
                      <p className="text-sm text-muted-foreground">/{page.slug}</p>
                    </div>
                    {getStatusBadge(page.status)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {page.content.length} blocks • v{page.version}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePageAction('edit', page.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePageAction('duplicate', page.id)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {page.status === 'draft' && (
                          <DropdownMenuItem onClick={() => handlePageAction('publish', page.id)}>
                            <Globe className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        {page.status === 'published' && (
                          <DropdownMenuItem onClick={() => handlePageAction('archive', page.id)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handlePageAction('delete', page.id)}
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
        title="Pages"
        description="Manage all your website pages in one place."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/page-builder/templates')}>
              <FileText className="mr-2 h-4 w-4" />
              Templates
            </Button>
            <Button onClick={handleCreatePage}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </div>
        }
      />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allPages.length}</div>
            <p className="text-xs text-muted-foreground">
              +{allPages.filter(p => new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPages.length}</div>
            <p className="text-xs text-muted-foreground">
              {allPages.length > 0 ? Math.round((publishedPages.length / allPages.length) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPages.length}</div>
            <p className="text-xs text-muted-foreground">
              {scheduledPages.length} scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Archived</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{archivedPages.length}</div>
            <p className="text-xs text-muted-foreground">
              {allPages.length > 0 ? Math.round((archivedPages.length / allPages.length) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Pages ({allPages.length})</TabsTrigger>
          <TabsTrigger value="published">Published ({publishedPages.length})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftPages.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled ({scheduledPages.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({archivedPages.length})</TabsTrigger>
          <TabsTrigger value="legacy-pages">Legacy Pages</TabsTrigger>
          <TabsTrigger value="menus">Menus</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>

        {/* Search and View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
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
          {renderPagesList(allPages)}
        </TabsContent>

        <TabsContent value="published">
          {renderPagesList(publishedPages)}
        </TabsContent>

        <TabsContent value="drafts">
          {renderPagesList(draftPages)}
        </TabsContent>

        <TabsContent value="scheduled">
          {renderPagesList(scheduledPages)}
        </TabsContent>

        <TabsContent value="archived">
          {renderPagesList(archivedPages)}
        </TabsContent>

        <TabsContent value="legacy-pages">
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Legacy Pages</h3>
            <p className="text-muted-foreground">
              Access the original pages management system.
            </p>
            <Button className="mt-4" onClick={() => router.push('/content/pages/all')}>
              <FileText className="mr-2 h-4 w-4" />
              Open Legacy Pages
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="menus">
          <div className="text-center py-12">
            <Menu className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Menu Management</h3>
            <p className="text-muted-foreground">
              Manage navigation menus and site structure.
            </p>
            <Button className="mt-4" onClick={() => router.push('/content/pages/menus/list')}>
              <Menu className="mr-2 h-4 w-4" />
              Open Menu Management
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="themes">
          <div className="text-center py-12">
            <Palette className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Theme Management</h3>
            <p className="text-muted-foreground">
              Access the original theme management system.
            </p>
            <Button className="mt-4" onClick={() => router.push('/content/pages/themes')}>
              <Palette className="mr-2 h-4 w-4" />
              Open Theme Management
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
