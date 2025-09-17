'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Palette, 
  Layout, 
  Eye, 
  Save, 
  Settings,
  Monitor,
  Tablet,
  Smartphone,
  Grid3X3,
  Columns,
  Rows,
  Sidebar,
  Blocks
} from 'lucide-react';
import { BlockEditor } from '@/components/blocks/BlockEditor';

export default function ThemeBuilderPage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState<string>('blocks');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Save theme logic
    console.log('Saving theme...');
  };

  const handlePreview = () => {
    // Preview logic
    console.log('Previewing theme...');
  };

  const layouts = [
    {
      id: 'blocks',
      name: 'Blocks Layout',
      description: 'Flexible block-based layout for dynamic content',
      icon: Blocks,
      thumbnail: 'https://picsum.photos/300/200?random=1',
    },
    {
      id: 'grids',
      name: 'Grids Layout',
      description: 'Organized grid system for structured content',
      icon: Grid3X3,
      thumbnail: 'https://picsum.photos/300/200?random=2',
    },
    {
      id: 'columns',
      name: 'Columns Layout',
      description: 'Multi-column layout for diverse content types',
      icon: Columns,
      thumbnail: 'https://picsum.photos/300/200?random=3',
    },
    {
      id: 'rows',
      name: 'Rows Layout',
      description: 'Horizontal row-based layout for sequential content',
      icon: Rows,
      thumbnail: 'https://picsum.photos/300/200?random=4',
    },
    {
      id: 'sidebar',
      name: 'Sidebar Layout',
      description: 'Layout with sidebar for additional content and navigation',
      icon: Sidebar,
      thumbnail: 'https://picsum.photos/300/200?random=5',
    },
  ];

  const previewModes = [
    { id: 'desktop', name: 'Desktop', icon: Monitor },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
    { id: 'mobile', name: 'Mobile', icon: Smartphone },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Theme Builder</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Preview Mode Selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {previewModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={previewMode === mode.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setPreviewMode(mode.id as any)}
                  className="h-8 w-8 p-0"
                >
                  <mode.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
            
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-60px)] pt-16">
        {/* Left Sidebar - Layout Selection */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Theme Components</h3>
              <p className="text-sm text-gray-600">Configure your theme's main components</p>
            </div>

            {/* Navbar Configuration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Navigation Bar</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Logo</span>
                    <Badge variant="outline">Albiz Media</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Menu Items</span>
                    <Badge variant="outline">4 items</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Search</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hero Banner Configuration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Hero Banner</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Heading</span>
                    <Badge variant="outline">Welcome</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Background</span>
                    <Badge variant="outline">Image</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">CTA Button</span>
                    <Badge variant="outline">Enabled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Templates</h3>
              <div className="space-y-3">
                {layouts.map((layout) => (
                  <Card 
                    key={layout.id} 
                    className={`cursor-pointer transition-all ${
                      selectedLayout === layout.id ? 'ring-2 ring-primary border-primary' : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedLayout(layout.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <layout.icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{layout.name}</h4>
                          <p className="text-sm text-gray-600">{layout.description}</p>
                        </div>
                        {selectedLayout === layout.id && (
                          <Badge variant="default">Selected</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Preview Mode Indicator */}
          <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {layouts.find(l => l.id === selectedLayout)?.name}
                </span>
                <Badge variant="outline" className="capitalize">{previewMode}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Layout Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Block Editor */}
          <div className="flex-1 overflow-hidden">
            <div className={`h-full transition-all duration-300 ${
              previewMode === 'mobile' ? 'max-w-sm mx-auto' : 
              previewMode === 'tablet' ? 'max-w-2xl mx-auto' : 
              'w-full'
            }`}>
              <BlockEditor />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
