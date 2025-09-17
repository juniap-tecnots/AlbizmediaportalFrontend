'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Layout, 
  Eye, 
  Smartphone, 
  Tablet, 
  Monitor,
  GripVertical,
  Move,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import { DraggableBlock } from './DraggableBlock';
import { BlockLibrary } from './BlockLibrary';
import { DragDropProvider } from './DragDropContext';
import { BlockConfig } from '@/lib/redux/slices/pageBuilderSlice';
import { cn } from '@/lib/utils';

interface PageCanvasProps {
  blocks: BlockConfig[];
  selectedBlockId: string | null;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  onSelectBlock: (blockId: string) => void;
  onEditBlock: (blockId: string) => void;
  onCopyBlock: (blockId: string) => void;
  onDeleteBlock: (blockId: string) => void;
  onDuplicateBlock: (blockId: string) => void;
  onReorderBlocks: (fromIndex: number, toIndex: number) => void;
  onAddBlock: (blockType: string, index?: number) => void;
  onMoveBlockUp: (blockId: string) => void;
  onMoveBlockDown: (blockId: string) => void;
}

export const PageCanvas: React.FC<PageCanvasProps> = ({
  blocks,
  selectedBlockId,
  previewMode,
  onSelectBlock,
  onEditBlock,
  onCopyBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onReorderBlocks,
  onAddBlock,
  onMoveBlockUp,
  onMoveBlockDown
}) => {
  const [isBlockLibraryOpen, setIsBlockLibraryOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getCanvasWidth = () => {
    switch (previewMode) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      case 'desktop':
      default:
        return 'max-w-4xl';
    }
  };

  const getCanvasPadding = () => {
    switch (previewMode) {
      case 'mobile':
        return 'p-4';
      case 'tablet':
        return 'p-6';
      case 'desktop':
      default:
        return 'p-8';
    }
  };

  const handleAddBlock = (blockType: string, index?: number) => {
    onAddBlock(blockType, index);
    setIsBlockLibraryOpen(false);
  };

  const renderBlockContent = (block: BlockConfig) => {
    // This would be replaced with actual block rendering components
    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Text Block</h3>
            <p className="text-gray-600">This is a sample text block. Click to edit content.</p>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-2">
            <div className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Image Placeholder</span>
            </div>
            <p className="text-sm text-gray-600">Click to upload or edit image</p>
          </div>
        );
      case 'hero-banner':
        return (
          <div className="space-y-4">
            <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-md flex items-center justify-center text-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Hero Banner</h2>
                <p className="text-lg">Click to edit hero content</p>
              </div>
            </div>
          </div>
        );
      case 'call-to-action':
        return (
          <div className="space-y-4">
            <div className="text-center p-6 bg-gray-50 rounded-md">
              <h3 className="text-xl font-semibold mb-2">Call to Action</h3>
              <p className="text-gray-600 mb-4">Click to edit CTA content</p>
              <Button>Action Button</Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold capitalize">
              {block.type.replace('-', ' ')} Block
            </h3>
            <p className="text-gray-600">Click to edit this block</p>
          </div>
        );
    }
  };

  return (
    <DragDropProvider
      onReorderBlocks={onReorderBlocks}
      onAddBlock={handleAddBlock}
    >
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className={cn('mx-auto', getCanvasWidth())}>
          <div className={cn('bg-white rounded-lg shadow-sm min-h-96', getCanvasPadding())}>
            {blocks.length === 0 ? (
              <div className="text-center py-12">
                <Layout className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Start Building Your Page</h3>
                <p className="text-muted-foreground">
                  Add blocks from the library to start creating your page content.
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => setIsBlockLibraryOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Block
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Add Block Button at Top */}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBlockLibraryOpen(true)}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Block
                  </Button>
                </div>

                {/* Blocks */}
                {blocks.map((block, index) => (
                  <React.Fragment key={block.id}>
                    {/* Drop Zone Above Block */}
                    <div
                      className={cn(
                        'h-2 transition-all duration-200',
                        hoveredIndex === index ? 'bg-primary/20' : 'bg-transparent'
                      )}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                    
                    <DraggableBlock
                      block={block}
                      index={index}
                      isSelected={selectedBlockId === block.id}
                      onSelect={onSelectBlock}
                      onEdit={onEditBlock}
                      onCopy={onCopyBlock}
                      onDelete={onDeleteBlock}
                      onDuplicate={onDuplicateBlock}
                      onMoveUp={onMoveBlockUp}
                      onMoveDown={onMoveBlockDown}
                    >
                      {renderBlockContent(block)}
                    </DraggableBlock>
                  </React.Fragment>
                ))}

                {/* Add Block Button at Bottom */}
                <div className="flex justify-center pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBlockLibraryOpen(true)}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Block
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Block Library Modal */}
      <BlockLibrary
        isOpen={isBlockLibraryOpen}
        onClose={() => setIsBlockLibraryOpen(false)}
        onAddBlock={handleAddBlock}
      />
    </DragDropProvider>
  );
};



