
'use client'

import { useState } from 'react'
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CategoriesPageContent from './categories-page-content';
import TagsPageContent from '../tags/tags-page-content';

export default function CategoriesLayout() {
  const [activeTab, setActiveTab] = useState('categories');

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Categories & Tags"
        description="Manage your categories and tags."
      />
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <CategoriesPageContent />
        </TabsContent>
        <TabsContent value="tags">
          <TagsPageContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
