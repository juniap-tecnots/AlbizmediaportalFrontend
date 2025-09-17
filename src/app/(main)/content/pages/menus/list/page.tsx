'use client'

import React from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { selectAllMenus } from "@/lib/redux/slices/menusSlice"

export default function MenusListPage() {
  const router = useRouter();
  const menus = useSelector(selectAllMenus);

  const handleCreateMenu = () => {
    router.push('/content/pages/menus');
  };

  const handleBack = () => {
    router.back();
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Menus</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleCreateMenu}
              className="bg-gray-800 hover:bg-gray-900 text-white"
            >
              Create menu.
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-8">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <span className="text-sm font-medium text-gray-600">Menu</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Menu items</span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {menus.map((menu) => (
                <div key={menu.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">{menu.name}</span>
                  </div>
                  <div className="flex-1 text-right">
                    <span className="text-sm text-gray-600">{menu.items.map(item => item.label).join('')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {menus.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500">No menus created yet.</p>
                <Button 
                  onClick={handleCreateMenu}
                  className="mt-4 bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Create your first menu
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
