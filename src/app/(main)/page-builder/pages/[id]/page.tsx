'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Eye, 
  Settings, 
  Palette, 
  Smartphone, 
  Tablet, 
  Monitor,
  Plus,
  Copy,
  Trash2,
  MoreHorizontal,
  Undo,
  Redo,
  Download,
  Upload,
  Calendar,
  Globe,
  Lock,
  Users,
  BarChart3,
  Code,
  Image,
  Type,
  Layout,
  Zap
} from 'lucide-react';
import { 
  selectPageById, 
  selectCurrentPage,
  selectPreviewMode,
  selectSidebarOpen,
  selectBlockLibraryOpen,
  selectSettingsPanelOpen,
  updatePage,
  setCurrentPage,
  setPreviewMode,
  toggleSidebar,
  toggleBlockLibrary,
  toggleSettingsPanel,
  addBlockToPage,
  updateBlockInPage,
  removeBlockFromPage,
  reorderBlocksInPage,
  copyBlock,
  pasteBlock,
  undo,
  redo,
  saveToHistory
} from '@/lib/redux/slices/pageBuilderSlice';
import type { RootState } from '@/lib/redux/store';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PageCanvas } from '@/components/page-builder/PageCanvas';
import { StylingPanel } from '@/components/page-builder/StylingPanel';

export default function PageEditor() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const pageId = params.id as string;
  const page = useSelector((state: RootState) => selectPageById(state, pageId));
  const currentPage = useSelector(selectCurrentPage);
  const previewMode = useSelector(selectPreviewMode);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const blockLibraryOpen = useSelector(selectBlockLibraryOpen);
  const settingsPanelOpen = useSelector(selectSettingsPanelOpen);

  const [isEditing, setIsEditing] = useState(false);
  const [isStylingPanelOpen, setIsStylingPanelOpen] = useState(false);
  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: [] as string[],
      robots: 'index,follow' as const
    },
    settings: {
      allowComments: true,
      showAuthor: true,
      showDate: true,
      showSocialShare: true,
      analytics: {
        trackPageViews: true,
        trackBlockInteractions: true,
        customEvents: [] as string[]
      }
    }
  });

  useEffect(() => {
    if (page) {
      setPageData({
        title: page.title,
        slug: page.slug,
        seo: page.seo,
        settings: page.settings
      });
      dispatch(setCurrentPage(page));
    }
  }, [page, dispatch]);

  const handleSave = () => {
    if (page) {
      dispatch(updatePage({
        id: page.id,
        updates: {
          title: pageData.title,
          slug: pageData.slug,
          seo: pageData.seo,
          settings: pageData.settings
        }
      }));
      
      dispatch(saveToHistory(page));
      
      toast({
        title: "Page Saved",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handlePublish = () => {
    if (page) {
      dispatch(updatePage({
        id: page.id,
        updates: {
          status: 'published',
          publishedAt: new Date().toISOString()
        }
      }));
      
      toast({
        title: "Page Published",
        description: "Your page has been published successfully.",
      });
    }
  };

  const handleSchedule = () => {
    // TODO: Implement scheduling functionality
    toast({
      title: "Schedule Feature",
      description: "Page scheduling will be available soon.",
    });
  };

  const handleAddBlock = (blockType: string) => {
    if (page) {
      const newBlock = {
        id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: blockType as any,
        data: {},
        styling: {
          backgroundColor: 'transparent',
          textColor: 'inherit',
          padding: { top: 16, right: 16, bottom: 16, left: 16 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          borderRadius: 0
        },
        layout: {
          width: 'full' as const,
          alignment: 'left' as const,
          responsive: {
            mobile: { width: 'full' as const, alignment: 'left' as const, responsive: {} as any },
            tablet: { width: 'full' as const, alignment: 'left' as const, responsive: {} as any },
            desktop: { width: 'full' as const, alignment: 'left' as const, responsive: {} as any }
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      dispatch(addBlockToPage({ pageId: page.id, block: newBlock }));
      
      toast({
        title: "Block Added",
        description: `${blockType} block has been added to your page.`,
      });
    }
  };

  const handleBlockAction = (action: string, blockId: string) => {
    if (!page) return;

    switch (action) {
      case 'copy':
        const block = page.content.find(b => b.id === blockId);
        if (block) {
          dispatch(copyBlock(block));
          toast({
            title: "Block Copied",
            description: "Block has been copied to clipboard.",
          });
        }
        break;
      case 'delete':
        dispatch(removeBlockFromPage({ pageId: page.id, blockId }));
        toast({
          title: "Block Removed",
          description: "Block has been removed from your page.",
        });
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'Published', className: 'bg-green-100 text-green-800' },
      draft: { label: 'Draft', className: 'bg-yellow-100 text-yellow-800' },
      scheduled: { label: 'Scheduled', className: 'bg-blue-100 text-blue-800' },
      archived: { label: 'Archived', className: 'bg-gray-100 text-gray-800' },
      pending_review: { label: 'Pending Review', className: 'bg-orange-100 text-orange-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground mt-2">The page you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => router.push('/page-builder/pages')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-80 border-r bg-white flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => dispatch(toggleBlockLibrary())}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => dispatch(toggleSettingsPanel())}>
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <Label htmlFor="page-title">Page Title</Label>
                <Input
                  id="page-title"
                  value={pageData.title}
                  onChange={(e) => setPageData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <Label htmlFor="page-slug">Page Slug</Label>
                <Input
                  id="page-slug"
                  value={pageData.slug}
                  onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="page-slug"
                />
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(page.status)}
                <span className="text-sm text-muted-foreground">v{page.version}</span>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="blocks" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="blocks" className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Add Blocks</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddBlock('text')}
                      className="flex items-center gap-2"
                    >
                      <Type className="h-4 w-4" />
                      Text
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddBlock('image')}
                      className="flex items-center gap-2"
                    >
                      <Image className="h-4 w-4" />
                      Image
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddBlock('hero-banner')}
                      className="flex items-center gap-2"
                    >
                      <Layout className="h-4 w-4" />
                      Hero
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleAddBlock('call-to-action')}
                      className="flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      CTA
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Page Blocks ({page.content.length})</h3>
                  <div className="space-y-2">
                    {page.content.map((block, index) => (
                      <Card key={block.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium capitalize">
                              {block.type.replace('-', ' ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Block {index + 1}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleBlockAction('copy', block.id)}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleBlockAction('delete', block.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">SEO Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input
                          id="meta-title"
                          value={pageData.seo.metaTitle}
                          onChange={(e) => setPageData(prev => ({
                            ...prev,
                            seo: { ...prev.seo, metaTitle: e.target.value }
                          }))}
                          placeholder="SEO title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meta-description">Meta Description</Label>
                        <Textarea
                          id="meta-description"
                          value={pageData.seo.metaDescription}
                          onChange={(e) => setPageData(prev => ({
                            ...prev,
                            seo: { ...prev.seo, metaDescription: e.target.value }
                          }))}
                          placeholder="SEO description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="robots">Robots</Label>
                        <Select
                          value={pageData.seo.robots}
                          onValueChange={(value: any) => setPageData(prev => ({
                            ...prev,
                            seo: { ...prev.seo, robots: value }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="index,follow">Index, Follow</SelectItem>
                            <SelectItem value="noindex,nofollow">No Index, No Follow</SelectItem>
                            <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
                            <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Page Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="allow-comments">Allow Comments</Label>
                        <Switch
                          id="allow-comments"
                          checked={pageData.settings.allowComments}
                          onCheckedChange={(checked) => setPageData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, allowComments: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-author">Show Author</Label>
                        <Switch
                          id="show-author"
                          checked={pageData.settings.showAuthor}
                          onCheckedChange={(checked) => setPageData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, showAuthor: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-date">Show Date</Label>
                        <Switch
                          id="show-date"
                          checked={pageData.settings.showDate}
                          onCheckedChange={(checked) => setPageData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, showDate: checked }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-social-share">Show Social Share</Label>
                        <Switch
                          id="show-social-share"
                          checked={pageData.settings.showSocialShare}
                          onCheckedChange={(checked) => setPageData(prev => ({
                            ...prev,
                            settings: { ...prev.settings, showSocialShare: checked }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => dispatch(toggleSidebar())}>
              <Layout className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{page.title}</h1>
              <p className="text-sm text-muted-foreground">/{page.slug}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Preview Mode Controls */}
            <div className="flex items-center border rounded-md">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => dispatch(setPreviewMode('desktop'))}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => dispatch(setPreviewMode('tablet'))}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => dispatch(setPreviewMode('mobile'))}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <Button variant="outline" size="sm" onClick={() => dispatch(undo())}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatch(redo())}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsStylingPanelOpen(true)}>
              <Palette className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handlePublish}>
              <Send className="mr-2 h-4 w-4" />
              Publish
            </Button>
          </div>
        </header>

        {/* Page Canvas */}
        <PageCanvas
          blocks={page.content}
          selectedBlockId={currentPage?.id || null}
          previewMode={previewMode}
          onSelectBlock={(blockId) => {
            // TODO: Implement block selection
          }}
          onEditBlock={(blockId) => {
            // TODO: Implement block editing
          }}
          onCopyBlock={(blockId) => handleBlockAction('copy', blockId)}
          onDeleteBlock={(blockId) => handleBlockAction('delete', blockId)}
          onDuplicateBlock={(blockId) => {
            // TODO: Implement block duplication
          }}
          onReorderBlocks={(fromIndex, toIndex) => {
            dispatch(reorderBlocksInPage({ pageId: page.id, fromIndex, toIndex }));
          }}
          onAddBlock={(blockType, index) => handleAddBlock(blockType)}
          onMoveBlockUp={(blockId) => {
            // TODO: Implement move up
          }}
          onMoveBlockDown={(blockId) => {
            // TODO: Implement move down
          }}
        />

        {/* Styling Panel */}
        <StylingPanel
          isOpen={isStylingPanelOpen}
          onClose={() => setIsStylingPanelOpen(false)}
          currentStyling={page.styling}
          onStylingChange={(styling) => {
            dispatch(updatePage({
              id: page.id,
              updates: { styling }
            }));
          }}
          previewMode={previewMode}
          onPreviewModeChange={(mode) => dispatch(setPreviewMode(mode))}
        />
      </div>
    </div>
  );
}
