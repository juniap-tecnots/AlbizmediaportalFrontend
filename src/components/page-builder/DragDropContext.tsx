'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { BlockConfig } from '@/lib/redux/slices/pageBuilderSlice';

interface DragDropContextType {
  draggedBlock: BlockConfig | null;
  draggedBlockType: string | null;
  draggedIndex: number | null;
  dropTargetIndex: number | null;
  isDragging: boolean;
  setDraggedBlock: (block: BlockConfig | null) => void;
  setDraggedBlockType: (type: string | null) => void;
  setDraggedIndex: (index: number | null) => void;
  setDropTargetIndex: (index: number | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  handleDragStart: (block: BlockConfig, index: number) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDrop: (e: React.DragEvent, index: number) => void;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
};

interface DragDropProviderProps {
  children: ReactNode;
  onReorderBlocks: (fromIndex: number, toIndex: number) => void;
  onAddBlock: (blockType: string, index: number) => void;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
  onReorderBlocks,
  onAddBlock
}) => {
  const [draggedBlock, setDraggedBlock] = useState<BlockConfig | null>(null);
  const [draggedBlockType, setDraggedBlockType] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((block: BlockConfig, index: number) => {
    setDraggedBlock(block);
    setDraggedIndex(index);
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedBlock(null);
    setDraggedBlockType(null);
    setDraggedIndex(null);
    setDropTargetIndex(null);
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropTargetIndex(index);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    
    if (draggedBlock && draggedIndex !== null) {
      // Reordering existing blocks
      if (draggedIndex !== index) {
        onReorderBlocks(draggedIndex, index);
      }
    } else if (draggedBlockType) {
      // Adding new block from library
      onAddBlock(draggedBlockType, index);
    }
    
    handleDragEnd();
  }, [draggedBlock, draggedIndex, draggedBlockType, onReorderBlocks, onAddBlock]);

  const value: DragDropContextType = {
    draggedBlock,
    draggedBlockType,
    draggedIndex,
    dropTargetIndex,
    isDragging,
    setDraggedBlock,
    setDraggedBlockType,
    setDraggedIndex,
    setDropTargetIndex,
    setIsDragging,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};



