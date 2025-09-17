'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TextData, BlockConfig } from '@/lib/redux/slices/blocksSlice';

interface TextBlockProps {
  block: BlockConfig;
  isPreview?: boolean;
}

export function TextBlock({ block, isPreview = false }: TextBlockProps) {
  const data = block.data as TextData;
  const styling = block.styling;

  const getHeadingLevel = () => {
    switch (data.headingLevel) {
      case 1:
        return 'text-4xl md:text-5xl';
      case 2:
        return 'text-3xl md:text-4xl';
      case 3:
        return 'text-2xl md:text-3xl';
      case 4:
        return 'text-xl md:text-2xl';
      case 5:
        return 'text-lg md:text-xl';
      case 6:
        return 'text-base md:text-lg';
      default:
        return 'text-2xl md:text-3xl';
    }
  };

  const getFontSizeClass = () => {
    switch (data.fontSize) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const getFontWeightClass = () => {
    switch (data.fontWeight) {
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-normal';
    }
  };

  const getAlignmentClass = () => {
    switch (data.alignment) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const HeadingComponent = `h${data.headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <div
      className={cn('w-full', getAlignmentClass(), styling?.customCSS)}
      style={{
        backgroundColor: styling?.backgroundColor,
        color: styling?.textColor,
        padding: styling?.padding ? `${styling.padding.top}px ${styling.padding.right}px ${styling.padding.bottom}px ${styling.padding.left}px` : undefined,
        margin: styling?.margin ? `${styling.margin.top}px ${styling.margin.right}px ${styling.margin.bottom}px ${styling.margin.left}px` : undefined,
        borderRadius: styling?.borderRadius ? `${styling.borderRadius}px` : undefined,
      }}
    >
      {data.heading && (
        <HeadingComponent
          className={cn(
            'mb-4',
            getHeadingLevel(),
            getFontWeightClass()
          )}
        >
          {data.heading}
        </HeadingComponent>
      )}
      
      <div
        className={cn(
          'prose prose-gray max-w-none',
          getFontSizeClass(),
          getFontWeightClass()
        )}
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}

export default TextBlock;



