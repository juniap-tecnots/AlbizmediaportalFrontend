'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  Tablet, 
  Monitor,
  Save,
  RotateCcw,
  Eye,
  Code,
  Settings,
  Zap,
  Target,
  Layers,
  Grid3X3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  Video,
  Music,
  Download,
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StylingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentStyling: any;
  onStylingChange: (styling: any) => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  onPreviewModeChange: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

interface ColorPreset {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

const colorPresets: ColorPreset[] = [
  {
    name: 'Default',
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937'
    }
  },
  {
    name: 'Dark',
    colors: {
      primary: '#8b5cf6',
      secondary: '#6b7280',
      accent: '#fbbf24',
      background: '#111827',
      text: '#f9fafb'
    }
  },
  {
    name: 'Ocean',
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#f0f9ff',
      text: '#0c4a6e'
    }
  },
  {
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#6b7280',
      accent: '#10b981',
      background: '#f0fdf4',
      text: '#064e3b'
    }
  },
  {
    name: 'Sunset',
    colors: {
      primary: '#dc2626',
      secondary: '#6b7280',
      accent: '#f97316',
      background: '#fef2f2',
      text: '#7f1d1d'
    }
  }
];

const fontFamilies = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: 'Open Sans, sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' },
  { name: 'Nunito', value: 'Nunito, sans-serif' },
  { name: 'Playfair Display', value: 'Playfair Display, serif' },
  { name: 'Merriweather', value: 'Merriweather, serif' },
  { name: 'Lora', value: 'Lora, serif' },
  { name: 'Crimson Text', value: 'Crimson Text, serif' },
  { name: 'Fira Code', value: 'Fira Code, monospace' },
  { name: 'JetBrains Mono', value: 'JetBrains Mono, monospace' },
  { name: 'Courier New', value: 'Courier New, monospace' }
];

const spacingPresets = [
  { name: 'Tight', value: { top: 8, right: 8, bottom: 8, left: 8 } },
  { name: 'Normal', value: { top: 16, right: 16, bottom: 16, left: 16 } },
  { name: 'Loose', value: { top: 24, right: 24, bottom: 24, left: 24 } },
  { name: 'Extra Loose', value: { top: 32, right: 32, bottom: 32, left: 32 } }
];

export const StylingPanel: React.FC<StylingPanelProps> = ({
  isOpen,
  onClose,
  currentStyling,
  onStylingChange,
  previewMode,
  onPreviewModeChange
}) => {
  const [activeTab, setActiveTab] = useState('colors');
  const [customCSS, setCustomCSS] = useState(currentStyling?.customCSS || '');

  const handleColorChange = (colorType: string, value: string) => {
    onStylingChange({
      ...currentStyling,
      [colorType]: value
    });
  };

  const handleFontChange = (fontFamily: string) => {
    onStylingChange({
      ...currentStyling,
      fontFamily
    });
  };

  const handleSpacingChange = (spacingType: string, value: number) => {
    onStylingChange({
      ...currentStyling,
      [spacingType]: {
        ...currentStyling[spacingType],
        [spacingType]: value
      }
    });
  };

  const handlePresetApply = (preset: ColorPreset) => {
    onStylingChange({
      ...currentStyling,
      ...preset.colors
    });
  };

  const handleCustomCSSChange = (css: string) => {
    setCustomCSS(css);
    onStylingChange({
      ...currentStyling,
      customCSS: css
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Styling & Themes</h2>
              <p className="text-muted-foreground">Customize the appearance of your page</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Preview Mode Controls */}
              <div className="flex items-center border rounded-md">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onPreviewModeChange('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onPreviewModeChange('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onPreviewModeChange('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" onClick={onClose}>
                ✕
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="colors">
                <Palette className="mr-2 h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="mr-2 h-4 w-4" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="spacing">
                <Layout className="mr-2 h-4 w-4" />
                Spacing
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Grid3X3 className="mr-2 h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="custom">
                <Code className="mr-2 h-4 w-4" />
                Custom CSS
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6">
              {/* Color Presets */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Color Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {colorPresets.map((preset) => (
                      <Card 
                        key={preset.name} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handlePresetApply(preset)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex gap-1">
                              <div 
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: preset.colors.primary }}
                              />
                              <div 
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: preset.colors.secondary }}
                              />
                              <div 
                                className="w-6 h-6 rounded-full border"
                                style={{ backgroundColor: preset.colors.accent }}
                              />
                            </div>
                            <p className="text-sm font-medium">{preset.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Colors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="primary-color"
                          type="color"
                          value={currentStyling?.primaryColor || '#3b82f6'}
                          onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={currentStyling?.primaryColor || '#3b82f6'}
                          onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="secondary-color"
                          type="color"
                          value={currentStyling?.secondaryColor || '#64748b'}
                          onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={currentStyling?.secondaryColor || '#64748b'}
                          onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                          placeholder="#64748b"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="accent-color"
                          type="color"
                          value={currentStyling?.accentColor || '#f59e0b'}
                          onChange={(e) => handleColorChange('accentColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={currentStyling?.accentColor || '#f59e0b'}
                          onChange={(e) => handleColorChange('accentColor', e.target.value)}
                          placeholder="#f59e0b"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="background-color">Background Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="background-color"
                          type="color"
                          value={currentStyling?.backgroundColor || '#ffffff'}
                          onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={currentStyling?.backgroundColor || '#ffffff'}
                          onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                          placeholder="#ffffff"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Font Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select
                      value={currentStyling?.fontFamily || 'Inter'}
                      onValueChange={handleFontChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontFamilies.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            <span style={{ fontFamily: font.value }}>{font.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="font-size">Font Size</Label>
                    <Select
                      value={currentStyling?.fontSize || 'medium'}
                      onValueChange={(value) => onStylingChange({ ...currentStyling, fontSize: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="line-height">Line Height</Label>
                    <Slider
                      value={[currentStyling?.lineHeight || 1.6]}
                      onValueChange={([value]) => onStylingChange({ ...currentStyling, lineHeight: value })}
                      min={1}
                      max={3}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {currentStyling?.lineHeight || 1.6}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="spacing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Spacing Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {spacingPresets.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        onClick={() => onStylingChange({ ...currentStyling, padding: preset.value })}
                        className="h-auto p-4"
                      >
                        <div className="text-center">
                          <div className="text-sm font-medium">{preset.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {preset.value.top}px
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Spacing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="padding-top">Padding Top</Label>
                      <Input
                        id="padding-top"
                        type="number"
                        value={currentStyling?.padding?.top || 16}
                        onChange={(e) => handleSpacingChange('padding', { ...currentStyling?.padding, top: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="padding-right">Padding Right</Label>
                      <Input
                        id="padding-right"
                        type="number"
                        value={currentStyling?.padding?.right || 16}
                        onChange={(e) => handleSpacingChange('padding', { ...currentStyling?.padding, right: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="padding-bottom">Padding Bottom</Label>
                      <Input
                        id="padding-bottom"
                        type="number"
                        value={currentStyling?.padding?.bottom || 16}
                        onChange={(e) => handleSpacingChange('padding', { ...currentStyling?.padding, bottom: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="padding-left">Padding Left</Label>
                      <Input
                        id="padding-left"
                        type="number"
                        value={currentStyling?.padding?.left || 16}
                        onChange={(e) => handleSpacingChange('padding', { ...currentStyling?.padding, left: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Layout Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="width">Width</Label>
                    <Select
                      value={currentStyling?.width || 'full'}
                      onValueChange={(value) => onStylingChange({ ...currentStyling, width: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Width</SelectItem>
                        <SelectItem value="half">Half Width</SelectItem>
                        <SelectItem value="third">Third Width</SelectItem>
                        <SelectItem value="quarter">Quarter Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="alignment">Alignment</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant={currentStyling?.alignment === 'left' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStylingChange({ ...currentStyling, alignment: 'left' })}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={currentStyling?.alignment === 'center' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStylingChange({ ...currentStyling, alignment: 'center' })}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={currentStyling?.alignment === 'right' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStylingChange({ ...currentStyling, alignment: 'right' })}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="border-radius">Border Radius</Label>
                    <Slider
                      value={[currentStyling?.borderRadius || 0]}
                      onValueChange={([value]) => onStylingChange({ ...currentStyling, borderRadius: value })}
                      min={0}
                      max={20}
                      step={1}
                      className="mt-2"
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {currentStyling?.borderRadius || 0}px
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom CSS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="custom-css">CSS Code</Label>
                      <Textarea
                        id="custom-css"
                        value={customCSS}
                        onChange={(e) => handleCustomCSSChange(e.target.value)}
                        placeholder="/* Add your custom CSS here */"
                        rows={10}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Import CSS
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSS
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <Button variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>
                <Save className="mr-2 h-4 w-4" />
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



