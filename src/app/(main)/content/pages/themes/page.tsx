'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Palette, 
  Check, 
  Star,
  Plus,
  ArrowLeft
} from 'lucide-react';
import { 
  selectAllThemes, 
  selectActiveTheme, 
  setActiveTheme,
  type Theme,
  type ThemeCategory 
} from '@/lib/redux/slices/themesSlice';
import type { RootState } from '@/lib/redux/store';

export default function ThemesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const themes = useSelector(selectAllThemes);
  const activeTheme = useSelector(selectActiveTheme);
  

  const handleBack = () => {
    router.back();
  };

  const handleActivateTheme = (themeId: string) => {
    dispatch(setActiveTheme(themeId));
  };

  const handlePreviewTheme = (themeId: string) => {
    router.push(`/content/pages/themes/preview/${themeId}`);
  };

  const handleCustomizeTheme = (themeId: string) => {
    router.push(`/content/pages/themes/customize/${themeId}`);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Themes</h1>
            <p className="text-gray-600">Manage and customize your website themes</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-6">

            {/* Active Theme Info */}
            {activeTheme && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={activeTheme.thumbnail} 
                        alt={activeTheme.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {activeTheme.name}
                          <Badge variant="default">Active</Badge>
                        </CardTitle>
                        <CardDescription>{activeTheme.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handlePreviewTheme(activeTheme.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCustomizeTheme(activeTheme.id)}>
                        <Palette className="h-4 w-4 mr-2" />
                        Customize
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            {/* Theme Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => (
                <Card key={theme.id} className="relative overflow-hidden">
                  <div className="relative">
                    <img 
                      src={theme.thumbnail} 
                      alt={theme.name}
                      className="w-full h-48 object-cover"
                    />
                    {theme.isActive && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-white">
                          <Check className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    )}
                    {theme.isDefault && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          Default
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {theme.name}
                      <Badge variant="outline">{theme.category}</Badge>
                    </CardTitle>
                    <CardDescription>{theme.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handlePreviewTheme(theme.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        
                        {!theme.isActive ? (
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleActivateTheme(theme.id)}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Activate
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => handleCustomizeTheme(theme.id)}
                          >
                            <Palette className="h-4 w-4 mr-2" />
                            Customize
                          </Button>
                        )}
                      </div>
                      
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {themes.length === 0 && (
              <div className="text-center py-12">
                <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No themes available</h3>
                <p className="text-gray-600 mb-4">No themes have been installed yet</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
