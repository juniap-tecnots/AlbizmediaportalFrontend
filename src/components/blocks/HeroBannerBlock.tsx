'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HeroBannerData, BlockConfig } from '@/lib/redux/slices/blocksSlice';

interface HeroBannerBlockProps {
  block: BlockConfig;
  isPreview?: boolean;
}

export function HeroBannerBlock({ block, isPreview = false }: HeroBannerBlockProps) {
  const data = block.data as HeroBannerData;
  const styling = block.styling;

  const getHeightClass = () => {
    switch (data.height) {
      case 'small':
        return 'h-64';
      case 'medium':
        return 'h-96';
      case 'fullscreen':
        return 'h-screen';
      default:
        return 'h-96';
    }
  };

  const getTextAlignmentClass = () => {
    switch (data.textAlignment) {
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

  const getOverlayClass = () => {
    switch (data.overlay) {
      case 'solid':
        return 'bg-black/50';
      case 'gradient':
        return 'bg-gradient-to-r from-black/60 via-black/40 to-black/60';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-gradient-to-r from-black/60 via-black/40 to-black/60';
    }
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        getHeightClass(),
        styling?.customCSS
      )}
      style={{
        backgroundColor: styling?.backgroundColor,
        color: styling?.textColor,
        padding: styling?.padding ? `${styling.padding.top}px ${styling.padding.right}px ${styling.padding.bottom}px ${styling.padding.left}px` : undefined,
        margin: styling?.margin ? `${styling.margin.top}px ${styling.margin.right}px ${styling.margin.bottom}px ${styling.margin.left}px` : undefined,
        borderRadius: styling?.borderRadius ? `${styling.borderRadius}px` : undefined,
      }}
    >
      {/* Background Image/Video */}
      {data.backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={data.backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {data.backgroundVideo && (
        <div className="absolute inset-0">
          <video
            src={data.backgroundVideo}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Overlay */}
      <div className={cn('absolute inset-0', getOverlayClass())} />

      {/* Content */}
      <div className={cn(
        'relative z-10 h-full flex flex-col justify-center px-6 md:px-12',
        getTextAlignmentClass()
      )}>
        <div className="max-w-4xl mx-auto">
          {data.heading && (
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {data.heading}
            </h1>
          )}
          
          {data.subheading && (
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
              {data.subheading}
            </p>
          )}
          
          {data.ctaButton && (
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
              onClick={() => {
                if (!isPreview && data.ctaButton?.link) {
                  window.open(data.ctaButton.link, '_blank');
                }
              }}
            >
              {data.ctaButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroBannerBlock;
