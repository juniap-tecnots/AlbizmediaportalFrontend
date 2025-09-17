'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addBlock, selectAllBlocks } from '@/lib/redux/slices/blocksSlice';
import { BlockRenderer } from './BlockRenderer';
import { Plus } from 'lucide-react';

export function BlockTest() {
  const dispatch = useDispatch();
  const blocks = useSelector(selectAllBlocks);

  const addTestBlock = (type: 'hero-banner' | 'text' | 'call-to-action') => {
    const testData = {
      'hero-banner': {
        heading: 'Welcome to Albiz Media',
        subheading: 'Your trusted source for news and information',
        backgroundImage: 'https://picsum.photos/1200/600?random=1',
        textAlignment: 'center',
        overlay: 'gradient',
        height: 'medium',
      },
      'text': {
        heading: 'Sample Heading',
        content: '<p>This is a sample text block with <strong>rich content</strong> and <em>formatting</em>.</p>',
        headingLevel: 2,
        alignment: 'left',
        fontSize: 'medium',
        fontWeight: 'normal',
      },
      'call-to-action': {
        title: 'Ready to Get Started?',
        subtitle: 'Join thousands of satisfied customers today',
        buttonText: 'Get Started',
        buttonLink: '#',
        alignment: 'center',
        buttonStyle: 'primary',
      },
    };

    dispatch(addBlock({
      type,
      data: testData[type],
      styling: {
        backgroundColor: 'transparent',
        textColor: 'inherit',
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        borderRadius: 0,
      },
      layout: {
        width: 'full',
        alignment: 'left',
        responsive: {
          mobile: { width: 'full', alignment: 'left', responsive: {} as any },
          tablet: { width: 'full', alignment: 'left', responsive: {} as any },
          desktop: { width: 'full', alignment: 'left', responsive: {} as any },
        },
      },
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Block System Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={() => addTestBlock('hero-banner')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Hero Banner
            </Button>
            <Button onClick={() => addTestBlock('text')}>
              <Plus className="mr-2 h-4 w-4" />
              Add Text Block
            </Button>
            <Button onClick={() => addTestBlock('call-to-action')}>
              <Plus className="mr-2 h-4 w-4" />
              Add CTA Block
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Current blocks: {blocks.length}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Block Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <BlockRenderer blocks={blocks} isPreview={true} />
        </CardContent>
      </Card>
    </div>
  );
}

export default BlockTest;



