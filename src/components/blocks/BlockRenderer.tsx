'use client';

import React from 'react';
import { BlockConfig } from '@/lib/redux/slices/blocksSlice';

// Import all block components
import HeroBannerBlock from './HeroBannerBlock';
import ArticleFeedBlock from './ArticleFeedBlock';
import TextBlock from './TextBlock';
import ImageBlock from './ImageBlock';
import CallToActionBlock from './CallToActionBlock';

interface BlockRendererProps {
  blocks: BlockConfig[];
  isPreview?: boolean;
}

// Block component mapping
const blockComponents = {
  'hero-banner': HeroBannerBlock,
  'article-feed': ArticleFeedBlock,
  'text': TextBlock,
  'image': ImageBlock,
  'call-to-action': CallToActionBlock,
  // Add more blocks as they are implemented
} as const;

export function BlockRenderer({ blocks, isPreview = false }: BlockRendererProps) {
  return (
    <div className="space-y-0">
      {blocks.map((block) => {
        const BlockComponent = blockComponents[block.type as keyof typeof blockComponents];
        
        if (!BlockComponent) {
          console.warn(`Block type "${block.type}" not implemented yet`);
          return (
            <div
              key={block.id}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500"
            >
              Block type "{block.type}" not implemented yet
            </div>
          );
        }

        return (
          <div key={block.id}>
            <BlockComponent block={block} isPreview={isPreview} />
          </div>
        );
      })}
    </div>
  );
}

export default BlockRenderer;
