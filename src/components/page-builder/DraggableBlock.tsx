'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GripVertical, 
  Edit, 
  Copy, 
  Trash2, 
  MoreHorizontal,
  Eye,
  Settings,
  Move,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BlockConfig } from '@/lib/redux/slices/pageBuilderSlice';
import { useDragDrop } from './DragDropContext';
import { cn } from '@/lib/utils';

interface DraggableBlockProps {
  block: BlockConfig;
  index: number;
  isSelected: boolean;
  onSelect: (blockId: string) => void;
  onEdit: (blockId: string) => void;
  onCopy: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  onDuplicate: (blockId: string) => void;
  onMoveUp: (blockId: string) => void;
  onMoveDown: (blockId: string) => void;
  children?: React.ReactNode;
}

export const DraggableBlock: React.FC<DraggableBlockProps> = ({
  block,
  index,
  isSelected,
  onSelect,
  onEdit,
  onCopy,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  children
}) => {
  const { handleDragStart, handleDragEnd, handleDragOver, handleDrop, isDragging, dropTargetIndex } = useDragDrop();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('[data-drag-handle]')) {
      handleDragStart(block, index);
    }
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const getBlockIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      'text': '📝',
      'image': '🖼️',
      'hero-banner': '🎯',
      'article-feed': '📰',
      'featured-article': '⭐',
      'call-to-action': '🚀',
      'newsletter-signup': '📧',
      'profile-cards': '👥',
      'top-places': '📍',
      'events-calendar': '📅',
      'food-restaurant': '🍽️',
      'subscription-plans': '💳',
      'ad-slot': '📢',
      'sponsored-content': '💰',
      'discussion-comments': '💬',
      'polls-surveys': '📊',
      'video-podcast': '🎥',
      'carousel-slider': '🎠'
    };
    return icons[type] || '📦';
  };

  const getBlockDisplayName = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div
      className={cn(
        'relative group transition-all duration-200',
        isSelected && 'ring-2 ring-primary ring-offset-2',
        isDragging && dropTargetIndex === index && 'border-t-2 border-primary'
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Drop Zone Indicator */}
      {isDragging && dropTargetIndex === index && (
        <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full z-10" />
      )}

      {/* Block Controls */}
      {(isSelected || isHovered) && (
        <div className="absolute -left-12 top-2 flex flex-col gap-1 z-20">
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0 bg-white shadow-md"
            data-drag-handle
            title="Drag to reorder"
          >
            <GripVertical className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0 bg-white shadow-md"
            onClick={() => onMoveUp(block.id)}
            title="Move up"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0 bg-white shadow-md"
            onClick={() => onMoveDown(block.id)}
            title="Move down"
          >
            <RotateCw className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Block Content */}
      <Card 
        className={cn(
          'cursor-pointer transition-all duration-200',
          isSelected ? 'shadow-lg' : 'hover:shadow-md',
          isDragging && 'opacity-50'
        )}
        onClick={() => onSelect(block.id)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={(e) => handleDrop(e, index)}
      >
        <CardContent className="p-4">
          {/* Block Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getBlockIcon(block.type)}</span>
              <div>
                <h3 className="font-semibold text-sm">
                  {getBlockDisplayName(block.type)}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Block {index + 1}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="text-xs">
                {block.type}
              </Badge>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(block.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Block
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCopy(block.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Block
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDuplicate(block.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate Block
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDelete(block.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Block
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Block Preview */}
          <div className="min-h-20 bg-gray-50 rounded-md p-3 border-2 border-dashed border-gray-200">
            {children || (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <div className="text-2xl mb-2">{getBlockIcon(block.type)}</div>
                  <p className="text-sm">Click to edit {getBlockDisplayName(block.type)} block</p>
                </div>
              </div>
            )}
          </div>

          {/* Block Info */}
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Created: {new Date(block.createdAt).toLocaleDateString()}</span>
            <span>Updated: {new Date(block.updatedAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



