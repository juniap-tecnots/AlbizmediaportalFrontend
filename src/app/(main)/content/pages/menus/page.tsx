'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, GripVertical, Check, Trash2, Plus, FolderOpen, Loader2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { addMenu } from "@/lib/redux/slices/menusSlice"

interface MenuItem {
  id: string;
  label: string;
  link: string;
}

export default function MenusPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [menuName, setMenuName] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', label: '', link: '' }
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      label: '',
      link: ''
    };
    setMenuItems([...menuItems, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateMenuItem = (id: string, field: 'label' | 'link', value: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleBack = () => {
    router.back();
  };

  const validateForm = () => {
    // Validate menu name
    if (!menuName.trim()) {
      toast({
        title: "Validation Error",
        description: "Menu name is required.",
        variant: "destructive",
      });
      return false;
    }

    // Validate menu items
    const validItems = menuItems.filter(item => item.label.trim() && item.link.trim());
    if (validItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one menu item with both label and link is required.",
        variant: "destructive",
      });
      return false;
    }

    // Check for empty labels or links in items
    const hasEmptyFields = menuItems.some(item => 
      (item.label.trim() && !item.link.trim()) || 
      (!item.label.trim() && item.link.trim())
    );
    
    if (hasEmptyFields) {
      toast({
        title: "Validation Error",
        description: "All menu items must have both label and link filled.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Filter out empty items
      const validMenuItems = menuItems.filter(item => item.label.trim() && item.link.trim());
      
      // Simulate API call (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to Redux store
      dispatch(addMenu({
        name: menuName.trim(),
        items: validMenuItems,
      }));

      // Show success message
      toast({
        title: "Menu Saved!",
        description: `"${menuName}" has been created successfully.`,
      });

      // Navigate back to menus list
      router.push('/content/pages/menus/list');

    } catch (error) {
      console.error('Error saving menu:', error);
      toast({
        title: "Save Failed",
        description: "There was an error saving the menu. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Add menu</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="space-y-6">
          {/* Name Section */}
          <Card className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                  <Input 
                    id="name"
                    placeholder="e.g., Sidebar menu"
                    value={menuName}
                    onChange={(e) => setMenuName(e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items Section */}
          <Card className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Menu items</Label>
                
                {/* Menu Items List */}
                <div className="space-y-3">
                  {menuItems.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      {/* Drag Handle */}
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      
                      {/* Label Input */}
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-gray-600">Label</Label>
                        <Input 
                          placeholder="e.g., About us"
                          value={item.label}
                          onChange={(e) => updateMenuItem(item.id, 'label', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      
                      {/* Link Input */}
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-gray-600">Link</Label>
                        <Input 
                          placeholder="Search or paste link"
                          value={item.link}
                          onChange={(e) => updateMenuItem(item.id, 'link', e.target.value)}
                          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      
                      {/* Check Icon */}
                      <Check className="h-4 w-4 text-green-500" />
                      
                      {/* Delete Button */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeMenuItem(item.id)}
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Add Menu Item Button */}
                <Button 
                  variant="outline" 
                  onClick={addMenuItem}
                  className="w-full border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
                >
                  <Plus className="h-4 w-4 mr-2 text-blue-500" />
                  Add menu item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
