'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Palette, 
  Type, 
  Layout, 
  Save, 
  RotateCcw,
  Eye,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';
import { 
  selectThemeById
} from '@/lib/redux/slices/themesSlice';
import type { RootState } from '@/lib/redux/store';

export default function ThemeCustomizerPage() {
  const params = useParams();
  const router = useRouter();
  const themeId = params.id as string;
  
  const theme = useSelector((state: RootState) => selectThemeById(state, themeId));
  
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customizations, setCustomizations] = useState({
    colors: {
      primary: theme?.styles.colors.primary || '#673AB7',
      secondary: theme?.styles.colors.secondary || '#2196F3',
      accent: theme?.styles.colors.accent || '#FF9800',
      background: theme?.styles.colors.background || '#F5F5F5',
      surface: theme?.styles.colors.surface || '#FFFFFF',
      textPrimary: theme?.styles.colors.text.primary || '#212121',
      textSecondary: theme?.styles.colors.text.secondary || '#757575',
      border: theme?.styles.colors.border || '#E0E0E0',
    },
    typography: {
      fontFamily: theme?.styles.typography.fontFamily || 'Inter, sans-serif',
      headingFont: theme?.styles.typography.headingFont || 'Inter, sans-serif',
      fontSizeBase: theme?.styles.typography.fontSize.base || '16px',
      fontSizeH1: theme?.styles.typography.fontSize.h1 || '32px',
      fontSizeH2: theme?.styles.typography.fontSize.h2 || '24px',
    },
    spacing: {
      sectionPadding: theme?.styles.spacing.sectionPadding || '40px',
      contentMargin: theme?.styles.spacing.contentMargin || '20px',
      gridGap: theme?.styles.spacing.gridGap || '24px',
    },
    layout: {
      maxWidth: theme?.styles.layout.maxWidth || '1200px',
      sidebarWidth: theme?.styles.layout.sidebarWidth || '300px',
      headerHeight: theme?.styles.layout.headerHeight || '80px',
    },
  });

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    console.log('Saving customizations:', customizations);
    // Save customizations logic
  };

  const handleReset = () => {
    if (theme) {
      setCustomizations({
        colors: {
          primary: theme.styles.colors.primary,
          secondary: theme.styles.colors.secondary,
          accent: theme.styles.colors.accent,
          background: theme.styles.colors.background,
          surface: theme.styles.colors.surface,
          textPrimary: theme.styles.colors.text.primary,
          textSecondary: theme.styles.colors.text.secondary,
          border: theme.styles.colors.border,
        },
        typography: {
          fontFamily: theme.styles.typography.fontFamily,
          headingFont: theme.styles.typography.headingFont,
          fontSizeBase: theme.styles.typography.fontSize.base,
          fontSizeH1: theme.styles.typography.fontSize.h1,
          fontSizeH2: theme.styles.typography.fontSize.h2,
        },
        spacing: {
          sectionPadding: theme.styles.spacing.sectionPadding,
          contentMargin: theme.styles.spacing.contentMargin,
          gridGap: theme.styles.spacing.gridGap,
        },
        layout: {
          maxWidth: theme.styles.layout.maxWidth,
          sidebarWidth: theme.styles.layout.sidebarWidth,
          headerHeight: theme.styles.layout.headerHeight,
        },
      });
    }
  };

  const handlePreview = () => {
    router.push(`/content/pages/themes/preview/${themeId}`);
  };

  const updateCustomization = (section: string, field: string, value: any) => {
    setCustomizations(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  if (!theme) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Theme Not Found</h2>
            <p className="text-gray-600 mb-4">The requested theme could not be found.</p>
            <Button onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Customize {theme.name}</span>
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
            
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
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
        {/* Left Sidebar - Customization Panels */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <Tabs defaultValue="colors" className="p-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">
                <Palette className="h-4 w-4 mr-2" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography">
                <Type className="h-4 w-4 mr-2" />
                Fonts
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="h-4 w-4 mr-2" />
                Layout
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Color Scheme</CardTitle>
                  <CardDescription>Customize your theme's color palette</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={customizations.colors.primary}
                        onChange={(e) => updateCustomization('colors', 'primary', e.target.value)}
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={customizations.colors.primary}
                        onChange={(e) => updateCustomization('colors', 'primary', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="secondary-color"
                        type="color"
                        value={customizations.colors.secondary}
                        onChange={(e) => updateCustomization('colors', 'secondary', e.target.value)}
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={customizations.colors.secondary}
                        onChange={(e) => updateCustomization('colors', 'secondary', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="accent-color"
                        type="color"
                        value={customizations.colors.accent}
                        onChange={(e) => updateCustomization('colors', 'accent', e.target.value)}
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={customizations.colors.accent}
                        onChange={(e) => updateCustomization('colors', 'accent', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="background-color">Background Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="background-color"
                        type="color"
                        value={customizations.colors.background}
                        onChange={(e) => updateCustomization('colors', 'background', e.target.value)}
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={customizations.colors.background}
                        onChange={(e) => updateCustomization('colors', 'background', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surface-color">Surface Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="surface-color"
                        type="color"
                        value={customizations.colors.surface}
                        onChange={(e) => updateCustomization('colors', 'surface', e.target.value)}
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={customizations.colors.surface}
                        onChange={(e) => updateCustomization('colors', 'surface', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Typography</CardTitle>
                  <CardDescription>Customize fonts and text styling</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select 
                      value={customizations.typography.fontFamily} 
                      onValueChange={(value) => updateCustomization('typography', 'fontFamily', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                        <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                        <SelectItem value="Open Sans, sans-serif">Open Sans</SelectItem>
                        <SelectItem value="Lato, sans-serif">Lato</SelectItem>
                        <SelectItem value="Montserrat, sans-serif">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heading-font">Heading Font</Label>
                    <Select 
                      value={customizations.typography.headingFont} 
                      onValueChange={(value) => updateCustomization('typography', 'headingFont', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                        <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                        <SelectItem value="Open Sans, sans-serif">Open Sans</SelectItem>
                        <SelectItem value="Lato, sans-serif">Lato</SelectItem>
                        <SelectItem value="Montserrat, sans-serif">Montserrat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-font-size">Base Font Size</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[parseInt(customizations.typography.fontSizeBase)]}
                        onValueChange={([value]) => updateCustomization('typography', 'fontSizeBase', `${value}px`)}
                        max={24}
                        min={12}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-12">
                        {customizations.typography.fontSizeBase}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="h1-font-size">H1 Font Size</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[parseInt(customizations.typography.fontSizeH1)]}
                        onValueChange={([value]) => updateCustomization('typography', 'fontSizeH1', `${value}px`)}
                        max={48}
                        min={20}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-12">
                        {customizations.typography.fontSizeH1}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Layout Settings</CardTitle>
                  <CardDescription>Customize spacing and layout dimensions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-width">Max Width</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[parseInt(customizations.layout.maxWidth)]}
                        onValueChange={([value]) => updateCustomization('layout', 'maxWidth', `${value}px`)}
                        max={1600}
                        min={800}
                        step={50}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-16">
                        {customizations.layout.maxWidth}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="header-height">Header Height</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[parseInt(customizations.layout.headerHeight)]}
                        onValueChange={([value]) => updateCustomization('layout', 'headerHeight', `${value}px`)}
                        max={120}
                        min={60}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-12">
                        {customizations.layout.headerHeight}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section-padding">Section Padding</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[parseInt(customizations.spacing.sectionPadding)]}
                        onValueChange={([value]) => updateCustomization('spacing', 'sectionPadding', `${value}px`)}
                        max={80}
                        min={20}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-12">
                        {customizations.spacing.sectionPadding}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grid-gap">Grid Gap</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[parseInt(customizations.spacing.gridGap)]}
                        onValueChange={([value]) => updateCustomization('spacing', 'gridGap', `${value}px`)}
                        max={48}
                        min={8}
                        step={2}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-12">
                        {customizations.spacing.gridGap}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Side - Live Preview */}
        <div className="flex-1 p-6">
          <div className="flex justify-center">
            <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
              previewMode === 'mobile' ? 'w-80' : 
              previewMode === 'tablet' ? 'w-2xl' : 
              'w-full max-w-4xl'
            }`}>
              {/* Live Preview */}
              <div className="relative">
                {/* Navbar Preview */}
                <div 
                  className="w-full px-6 py-4 flex items-center justify-between"
                  style={{ 
                    backgroundColor: customizations.colors.surface,
                    color: customizations.colors.textPrimary,
                    height: customizations.layout.headerHeight 
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="font-bold text-xl"
                      style={{ fontFamily: customizations.typography.headingFont }}
                    >
                      {theme.navbar.config.logo}
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                      {theme.navbar.config.menuItems.map((item: any, index: number) => (
                        <a key={index} href={item.href} className="hover:opacity-80 transition-opacity">
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Hero Banner Preview */}
                <div 
                  className="relative w-full bg-cover bg-center flex items-center justify-center"
                  style={{ 
                    backgroundImage: `url(${theme.heroBanner.config.backgroundImage})`,
                    minHeight: '400px'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                  <div className="relative z-10 text-center text-white p-8">
                    <h1 
                      className="font-bold mb-4"
                      style={{ 
                        fontSize: customizations.typography.fontSizeH1,
                        fontFamily: customizations.typography.headingFont 
                      }}
                    >
                      {theme.heroBanner.config.heading}
                    </h1>
                    <p 
                      className="mb-8 opacity-90"
                      style={{ 
                        fontSize: customizations.typography.fontSizeBase,
                        fontFamily: customizations.typography.fontFamily 
                      }}
                    >
                      {theme.heroBanner.config.subheading}
                    </p>
                    <Button 
                      size="lg" 
                      style={{ 
                        backgroundColor: customizations.colors.primary,
                        color: customizations.colors.surface 
                      }}
                    >
                      {theme.heroBanner.config.ctaButton?.label}
                    </Button>
                  </div>
                </div>

                {/* Sample Content */}
                <div 
                  className="p-6 space-y-6"
                  style={{ 
                    backgroundColor: customizations.colors.background,
                    padding: customizations.spacing.sectionPadding 
                  }}
                >
                  {/* Article Grid */}
                  <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    style={{ gap: customizations.spacing.gridGap }}
                  >
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="overflow-hidden">
                        <img 
                          src={`https://picsum.photos/400/250?random=${i + 20}`}
                          alt={`Sample article ${i}`}
                          className="w-full h-48 object-cover"
                        />
                        <CardContent 
                          className="p-4"
                          style={{ backgroundColor: customizations.colors.surface }}
                        >
                          <h3 
                            className="font-semibold mb-2"
                            style={{ 
                              color: customizations.colors.textPrimary,
                              fontFamily: customizations.typography.headingFont 
                            }}
                          >
                            Sample Article Title {i}
                          </h3>
                          <p 
                            className="text-sm mb-3"
                            style={{ 
                              color: customizations.colors.textSecondary,
                              fontFamily: customizations.typography.fontFamily 
                            }}
                          >
                            This is a sample article description to show how content will look with your customizations.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div 
                    className="rounded-lg p-8 text-center text-white"
                    style={{ backgroundColor: customizations.colors.primary }}
                  >
                    <h3 
                      className="text-2xl font-bold mb-2"
                      style={{ fontFamily: customizations.typography.headingFont }}
                    >
                      Join Our Community
                    </h3>
                    <p 
                      className="mb-4 opacity-90"
                      style={{ fontFamily: customizations.typography.fontFamily }}
                    >
                      Stay connected with the latest news and updates
                    </p>
                    <Button 
                      variant="secondary" 
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      style={{ fontFamily: customizations.typography.fontFamily }}
                    >
                      Subscribe Now
                    </Button>
                  </div>

                  {/* Layout 1: Featured Content Section */}
                  <div 
                    className="rounded-lg p-8"
                    style={{ backgroundColor: customizations.colors.surface }}
                  >
                    <div className="text-center mb-8">
                      <h2 
                        className="text-3xl font-bold mb-4"
                        style={{ 
                          color: customizations.colors.textPrimary,
                          fontFamily: customizations.typography.headingFont 
                        }}
                      >
                        Featured Content
                      </h2>
                      <p 
                        style={{ 
                          color: customizations.colors.textSecondary,
                          fontFamily: customizations.typography.fontFamily 
                        }}
                      >
                        Highlighted articles and important updates
                      </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div 
                        className="rounded-lg overflow-hidden shadow-md"
                        style={{ backgroundColor: customizations.colors.background }}
                      >
                        <img 
                          src="https://picsum.photos/600/300?random=20"
                          alt="Featured article"
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span 
                              className="px-3 py-1 text-xs font-medium rounded-full"
                              style={{ 
                                backgroundColor: customizations.colors.accent,
                                color: customizations.colors.textPrimary 
                              }}
                            >
                              Featured
                            </span>
                            <span 
                              className="text-sm"
                              style={{ color: customizations.colors.textSecondary }}
                            >
                              2 hours ago
                            </span>
                          </div>
                          <h3 
                            className="text-xl font-bold mb-3"
                            style={{ 
                              color: customizations.colors.textPrimary,
                              fontFamily: customizations.typography.headingFont 
                            }}
                          >
                            Breaking News: Major Development
                          </h3>
                          <p 
                            className="mb-4"
                            style={{ 
                              color: customizations.colors.textSecondary,
                              fontFamily: customizations.typography.fontFamily 
                            }}
                          >
                            This is a featured article that showcases important news and developments in our community.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            style={{ fontFamily: customizations.typography.fontFamily }}
                          >
                            Read More
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i} 
                            className="rounded-lg p-4 shadow-md flex gap-4"
                            style={{ backgroundColor: customizations.colors.background }}
                          >
                            <img 
                              src={`https://picsum.photos/150/100?random=${20 + i}`}
                              alt={`Article ${i}`}
                              className="w-24 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 
                                className="font-semibold mb-1"
                                style={{ 
                                  color: customizations.colors.textPrimary,
                                  fontFamily: customizations.typography.headingFont 
                                }}
                              >
                                Article Title {i}
                              </h4>
                              <p 
                                className="text-sm mb-2"
                                style={{ 
                                  color: customizations.colors.textSecondary,
                                  fontFamily: customizations.typography.fontFamily 
                                }}
                              >
                                Brief description of the article content...
                              </p>
                              <span 
                                className="text-xs"
                                style={{ color: customizations.colors.textSecondary }}
                              >
                                {i} hours ago
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Layout 2: Statistics Section */}
                  <div 
                    className="rounded-lg p-8 border"
                    style={{ 
                      backgroundColor: customizations.colors.background,
                      borderColor: customizations.colors.accent 
                    }}
                  >
                    <div className="text-center mb-8">
                      <h2 
                        className="text-3xl font-bold mb-4"
                        style={{ 
                          color: customizations.colors.textPrimary,
                          fontFamily: customizations.typography.headingFont 
                        }}
                      >
                        Our Impact
                      </h2>
                      <p 
                        style={{ 
                          color: customizations.colors.textSecondary,
                          fontFamily: customizations.typography.fontFamily 
                        }}
                      >
                        Numbers that matter to our community
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {[
                        { number: "50K+", label: "Active Readers", icon: "👥" },
                        { number: "1.2M", label: "Articles Published", icon: "📰" },
                        { number: "95%", label: "Reader Satisfaction", icon: "⭐" },
                        { number: "24/7", label: "News Coverage", icon: "🕐" }
                      ].map((stat, index) => (
                        <div 
                          key={index} 
                          className="text-center p-6 rounded-lg"
                          style={{ backgroundColor: customizations.colors.surface }}
                        >
                          <div className="text-4xl mb-3">{stat.icon}</div>
                          <div 
                            className="text-3xl font-bold mb-2"
                            style={{ 
                              color: customizations.colors.textPrimary,
                              fontFamily: customizations.typography.headingFont 
                            }}
                          >
                            {stat.number}
                          </div>
                          <div 
                            style={{ 
                              color: customizations.colors.textSecondary,
                              fontFamily: customizations.typography.fontFamily 
                            }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layout 3: Newsletter Section */}
                  <div 
                    className="rounded-lg p-8 text-center text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${customizations.colors.primary} 0%, ${customizations.colors.secondary} 100%)`
                    }}
                  >
                    <div className="max-w-2xl mx-auto">
                      <h2 
                        className="text-3xl font-bold mb-4"
                        style={{ fontFamily: customizations.typography.headingFont }}
                      >
                        Stay Updated
                      </h2>
                      <p 
                        className="text-lg mb-6 opacity-90"
                        style={{ fontFamily: customizations.typography.fontFamily }}
                      >
                        Get the latest news and updates delivered directly to your inbox
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                          type="email" 
                          placeholder="Enter your email"
                          className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                          style={{ fontFamily: customizations.typography.fontFamily }}
                        />
                        <Button 
                          className="bg-white text-gray-900 hover:bg-gray-100 px-8"
                          style={{ fontFamily: customizations.typography.fontFamily }}
                        >
                          Subscribe
                        </Button>
                      </div>
                      <p 
                        className="text-sm mt-4 opacity-75"
                        style={{ fontFamily: customizations.typography.fontFamily }}
                      >
                        No spam, unsubscribe at any time
                      </p>
                    </div>
                  </div>

                  {/* Layout 4: Team Section */}
                  <div 
                    className="rounded-lg p-8"
                    style={{ backgroundColor: customizations.colors.surface }}
                  >
                    <div className="text-center mb-8">
                      <h2 
                        className="text-3xl font-bold mb-4"
                        style={{ 
                          color: customizations.colors.textPrimary,
                          fontFamily: customizations.typography.headingFont 
                        }}
                      >
                        Meet Our Team
                      </h2>
                      <p 
                        style={{ 
                          color: customizations.colors.textSecondary,
                          fontFamily: customizations.typography.fontFamily 
                        }}
                      >
                        The people behind the news
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { name: "Sarah Johnson", role: "Editor-in-Chief", image: "https://picsum.photos/200/200?random=30" },
                        { name: "Michael Chen", role: "Senior Reporter", image: "https://picsum.photos/200/200?random=31" },
                        { name: "Emily Rodriguez", role: "Content Manager", image: "https://picsum.photos/200/200?random=32" }
                      ].map((member, index) => (
                        <div key={index} className="text-center">
                          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                            <img 
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 
                            className="text-xl font-semibold mb-2"
                            style={{ 
                              color: customizations.colors.textPrimary,
                              fontFamily: customizations.typography.headingFont 
                            }}
                          >
                            {member.name}
                          </h3>
                          <p 
                            className="mb-3"
                            style={{ 
                              color: customizations.colors.textSecondary,
                              fontFamily: customizations.typography.fontFamily 
                            }}
                          >
                            {member.role}
                          </p>
                          <div className="flex justify-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              style={{ fontFamily: customizations.typography.fontFamily }}
                            >
                              Twitter
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              style={{ fontFamily: customizations.typography.fontFamily }}
                            >
                              LinkedIn
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layout 5: Testimonials Section */}
                  <div 
                    className="rounded-lg p-8 border"
                    style={{ 
                      backgroundColor: customizations.colors.background,
                      borderColor: customizations.colors.accent 
                    }}
                  >
                    <div className="text-center mb-8">
                      <h2 
                        className="text-3xl font-bold mb-4"
                        style={{ 
                          color: customizations.colors.textPrimary,
                          fontFamily: customizations.typography.headingFont 
                        }}
                      >
                        What Our Readers Say
                      </h2>
                      <p 
                        style={{ 
                          color: customizations.colors.textSecondary,
                          fontFamily: customizations.typography.fontFamily 
                        }}
                      >
                        Trusted by thousands of readers worldwide
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { 
                          quote: "Albiz Media provides the most accurate and timely news coverage. I trust them completely.",
                          author: "John Smith",
                          role: "Business Owner",
                          rating: 5
                        },
                        { 
                          quote: "The quality of journalism here is outstanding. Always well-researched and balanced.",
                          author: "Maria Garcia",
                          role: "Journalist",
                          rating: 5
                        },
                        { 
                          quote: "I've been reading Albiz Media for years. They never disappoint with their coverage.",
                          author: "David Lee",
                          role: "Student",
                          rating: 5
                        }
                      ].map((testimonial, index) => (
                        <div 
                          key={index} 
                          className="rounded-lg p-6"
                          style={{ backgroundColor: customizations.colors.surface }}
                        >
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                          <p 
                            className="mb-4 italic"
                            style={{ 
                              color: customizations.colors.textPrimary,
                              fontFamily: customizations.typography.fontFamily 
                            }}
                          >
                            "{testimonial.quote}"
                          </p>
                          <div className="border-t pt-4">
                            <div 
                              className="font-semibold"
                              style={{ 
                                color: customizations.colors.textPrimary,
                                fontFamily: customizations.typography.headingFont 
                              }}
                            >
                              {testimonial.author}
                            </div>
                            <div 
                              className="text-sm"
                              style={{ 
                                color: customizations.colors.textSecondary,
                                fontFamily: customizations.typography.fontFamily 
                              }}
                            >
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
