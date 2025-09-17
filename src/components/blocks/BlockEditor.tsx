'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { 
  addBlock, 
  updateBlock, 
  deleteBlock, 
  reorderBlocks,
  duplicateBlock,
  selectAllBlocks,
  selectBlockRegistry,
  BlockConfig,
  BlockType 
} from '@/lib/redux/slices/blocksSlice';
import { BlockRenderer } from './BlockRenderer';
import { 
  Plus, 
  GripVertical, 
  Settings, 
  Trash2, 
  Copy, 
  Eye,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import type { RootState } from '@/lib/redux/store';

interface BlockEditorProps {
  pageId?: string;
  onSave?: (blocks: BlockConfig[]) => void;
}

export function BlockEditor({ pageId, onSave }: BlockEditorProps) {
  const dispatch = useDispatch();
  const blocks = useSelector(selectAllBlocks);
  const blockRegistry = useSelector(selectBlockRegistry);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());

  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  const handleAddBlock = (blockType: BlockType) => {
    const registry = blockRegistry[blockType];
    if (registry) {
      dispatch(addBlock({
        type: blockType,
        data: { ...registry.defaultData },
        styling: { ...registry.defaultStyling },
        layout: { ...registry.defaultLayout },
      }));
    }
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<BlockConfig>) => {
    dispatch(updateBlock({ id: blockId, ...updates }));
  };

  const handleDeleteBlock = (blockId: string) => {
    dispatch(deleteBlock(blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const handleDuplicateBlock = (blockId: string) => {
    dispatch(duplicateBlock(blockId));
  };

  const toggleBlockExpansion = (blockId: string) => {
    const newExpanded = new Set(expandedBlocks);
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId);
    } else {
      newExpanded.add(blockId);
    }
    setExpandedBlocks(newExpanded);
  };

  const getBlockTypeLabel = (blockType: BlockType) => {
    const labels: Record<BlockType, string> = {
      'hero-banner': 'Hero Banner',
      'article-feed': 'Article Feed',
      'featured-article': 'Featured Article',
      'special-day-timeline': 'Special Day Timeline',
      'top-places': 'Top Places',
      'events-calendar': 'Events Calendar',
      'food-restaurant': 'Food & Restaurant',
      'profile-cards': 'Profile Cards',
      'team-author-spotlight': 'Team Spotlight',
      'subscription-plans': 'Subscription Plans',
      'ad-slot': 'Ad Slot',
      'sponsored-content': 'Sponsored Content',
      'newsletter-signup': 'Newsletter Signup',
      'discussion-comments': 'Comments',
      'polls-surveys': 'Polls & Surveys',
      'text': 'Text',
      'image': 'Image',
      'video-podcast': 'Video/Podcast',
      'carousel-slider': 'Carousel',
      'call-to-action': 'Call to Action',
      'paragraph': 'Paragraph',
      'heading': 'Heading',
      'list': 'List',
      'quote': 'Quote',
      'gallery': 'Gallery',
    };
    return labels[blockType] || blockType;
  };

  const renderBlockConfig = () => {
    if (!selectedBlock) return null;

    const blockType = selectedBlock.type;
    const data = selectedBlock.data;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configure {getBlockTypeLabel(blockType)}
          </CardTitle>
          <CardDescription>
            Customize the content and appearance of this block
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Block Type Specific Configuration */}
          {blockType === 'hero-banner' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="heading">Heading</Label>
                <Input
                  id="heading"
                  value={data.heading || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, heading: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subheading">Subheading</Label>
                <Input
                  id="subheading"
                  value={data.subheading || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, subheading: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backgroundImage">Background Image URL</Label>
                <Input
                  id="backgroundImage"
                  value={data.backgroundImage || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, backgroundImage: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textAlignment">Text Alignment</Label>
                <Select
                  value={data.textAlignment || 'center'}
                  onValueChange={(value) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, textAlignment: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {blockType === 'text' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="heading">Heading</Label>
                <Input
                  id="heading"
                  value={data.heading || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, heading: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={data.content || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, content: e.target.value }
                  })}
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headingLevel">Heading Level</Label>
                <Select
                  value={data.headingLevel?.toString() || '2'}
                  onValueChange={(value) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, headingLevel: parseInt(value) }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">H1</SelectItem>
                    <SelectItem value="2">H2</SelectItem>
                    <SelectItem value="3">H3</SelectItem>
                    <SelectItem value="4">H4</SelectItem>
                    <SelectItem value="5">H5</SelectItem>
                    <SelectItem value="6">H6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {blockType === 'call-to-action' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={data.title || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, title: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={data.subtitle || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, subtitle: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={data.buttonText || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, buttonText: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buttonLink">Button Link</Label>
                <Input
                  id="buttonLink"
                  value={data.buttonLink || ''}
                  onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                    data: { ...data, buttonLink: e.target.value }
                  })}
                />
              </div>
            </>
          )}

          {/* General Styling Options */}
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Styling</h4>
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={selectedBlock.styling.backgroundColor || '#ffffff'}
                onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                  styling: { ...selectedBlock.styling, backgroundColor: e.target.value }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textColor">Text Color</Label>
              <Input
                id="textColor"
                type="color"
                value={selectedBlock.styling.textColor || '#000000'}
                onChange={(e) => handleUpdateBlock(selectedBlock.id, {
                  styling: { ...selectedBlock.styling, textColor: e.target.value }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex h-full">
      {/* Block Library Sidebar */}
      <div className="w-64 border-r bg-gray-50 p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Block Library</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600">News & Articles</h4>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleAddBlock('hero-banner')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Hero Banner
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleAddBlock('article-feed')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Article Feed
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600">Content</h4>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleAddBlock('text')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Text
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleAddBlock('image')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Image
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleAddBlock('call-to-action')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Call to Action
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* Block List */}
        <div className="w-80 border-r p-4">
          <h3 className="font-semibold mb-4">Page Blocks</h3>
          <div className="space-y-2">
            {blocks.map((block, index) => (
              <Card
                key={block.id}
                className={cn(
                  'cursor-pointer transition-colors',
                  selectedBlockId === block.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'
                )}
                onClick={() => setSelectedBlockId(block.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <Badge variant="outline">{getBlockTypeLabel(block.type)}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateBlock(block.id);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlock(block.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preview/Editor Area */}
        <div className="flex-1 p-4">
          {isPreviewMode ? (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Preview</h3>
              <BlockRenderer blocks={blocks} isPreview={true} />
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold">Live Editor</h3>
              <BlockRenderer blocks={blocks} isPreview={false} />
            </div>
          )}
        </div>

        {/* Configuration Panel */}
        <div className="w-80 border-l p-4">
          {selectedBlock ? (
            renderBlockConfig()
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Select a block to configure its settings</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlockEditor;
