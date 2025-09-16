'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CallToActionData, BlockConfig } from '@/lib/redux/slices/blocksSlice';

interface CallToActionBlockProps {
  block: BlockConfig;
  isPreview?: boolean;
}

export function CallToActionBlock({ block, isPreview = false }: CallToActionBlockProps) {
  const data = block.data as CallToActionData;
  const styling = block.styling;

  const getAlignmentClass = () => {
    switch (data.alignment) {
      case 'left':
        return 'text-left items-start';
      case 'center':
        return 'text-center items-center';
      case 'right':
        return 'text-right items-end';
      default:
        return 'text-center items-center';
    }
  };

  const getButtonVariant = () => {
    switch (data.buttonStyle) {
      case 'primary':
        return 'default';
      case 'secondary':
        return 'secondary';
      case 'outline':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <div
      className={cn(
        'w-full py-12 px-6 md:px-12',
        getAlignmentClass(),
        styling?.customCSS
      )}
      style={{
        backgroundColor: data.backgroundColor || styling?.backgroundColor,
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: styling?.textColor,
        padding: styling?.padding ? `${styling.padding.top}px ${styling.padding.right}px ${styling.padding.bottom}px ${styling.padding.left}px` : undefined,
        margin: styling?.margin ? `${styling.margin.top}px ${styling.margin.right}px ${styling.margin.bottom}px ${styling.margin.left}px` : undefined,
        borderRadius: styling?.borderRadius ? `${styling.borderRadius}px` : undefined,
      }}
    >
      {/* Background Overlay */}
      {data.backgroundImage && (
        <div className="absolute inset-0 bg-black/20 rounded-lg" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            {data.title}
          </h2>
          
          {data.subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              {data.subtitle}
            </p>
          )}
          
          <Button
            size="lg"
            variant={getButtonVariant()}
            className="px-8 py-3 text-lg"
            onClick={() => {
              if (!isPreview && data.buttonLink) {
                if (data.buttonLink.startsWith('http')) {
                  window.open(data.buttonLink, '_blank');
                } else {
                  window.location.href = data.buttonLink;
                }
              }
            }}
          >
            {data.buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CallToActionBlock;
