'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ImageData, BlockConfig } from '@/lib/redux/slices/blocksSlice';
import Link from 'next/link';

interface ImageBlockProps {
  block: BlockConfig;
  isPreview?: boolean;
}

export function ImageBlock({ block, isPreview = false }: ImageBlockProps) {
  const data = block.data as ImageData;
  const styling = block.styling;

  const getSizeClass = () => {
    switch (data.size) {
      case 'small':
        return 'max-w-sm';
      case 'medium':
        return 'max-w-md';
      case 'large':
        return 'max-w-lg';
      case 'full':
        return 'w-full';
      default:
        return 'max-w-md';
    }
  };

  const getAlignmentClass = () => {
    switch (data.alignment) {
      case 'left':
        return 'mx-0 mr-auto';
      case 'center':
        return 'mx-auto';
      case 'right':
        return 'mx-0 ml-auto';
      default:
        return 'mx-auto';
    }
  };

  const ImageComponent = () => (
    <img
      src={data.src}
      alt={data.alt}
      className={cn(
        'block',
        getSizeClass(),
        getAlignmentClass(),
        'rounded-lg shadow-sm'
      )}
      style={{
        borderRadius: data.borderRadius ? `${data.borderRadius}px` : undefined,
      }}
    />
  );

  return (
    <div
      className={cn('w-full', styling?.customCSS)}
      style={{
        backgroundColor: styling?.backgroundColor,
        color: styling?.textColor,
        padding: styling?.padding ? `${styling.padding.top}px ${styling.padding.right}px ${styling.padding.bottom}px ${styling.padding.left}px` : undefined,
        margin: styling?.margin ? `${styling.margin.top}px ${styling.margin.right}px ${styling.margin.bottom}px ${styling.margin.left}px` : undefined,
        borderRadius: styling?.borderRadius ? `${styling.borderRadius}px` : undefined,
      }}
    >
      {data.link ? (
        <Link href={data.link} target="_blank" rel="noopener noreferrer">
          <ImageComponent />
        </Link>
      ) : (
        <ImageComponent />
      )}
      
      {data.caption && (
        <p className={cn(
          'text-sm text-muted-foreground mt-2',
          getAlignmentClass()
        )}>
          {data.caption}
        </p>
      )}
    </div>
  );
}

export default ImageBlock;



