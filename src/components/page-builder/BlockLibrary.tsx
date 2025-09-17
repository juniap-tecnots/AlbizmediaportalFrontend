'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Type,
  Image,
  Layout,
  Zap,
  Globe,
  Users,
  MapPin,
  Calendar,
  Utensils,
  CreditCard,
  Megaphone,
  DollarSign,
  MessageSquare,
  BarChart3,
  Video,
  RotateCcw,
  Plus,
  Eye,
  Copy,
  Star,
  TrendingUp,
  Target,
  Layers,
  Palette,
  Code,
  Settings
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useDragDrop } from './DragDropContext';
import { cn } from '@/lib/utils';

interface BlockLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBlock: (blockType: string) => void;
}

interface BlockType {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

const blockTypes: BlockType[] = [
  // Content Blocks
  {
    id: 'text',
    name: 'Text',
    description: 'Add text content with rich formatting',
    category: 'Content',
    icon: <Type className="h-5 w-5" />,
    tags: ['text', 'content', 'basic'],
    isPopular: true
  },
  {
    id: 'image',
    name: 'Image',
    description: 'Add images with captions and links',
    category: 'Content',
    icon: <Image className="h-5 w-5" />,
    tags: ['image', 'media', 'visual'],
    isPopular: true
  },
  {
    id: 'video-podcast',
    name: 'Video/Podcast',
    description: 'Embed videos and audio content',
    category: 'Content',
    icon: <Video className="h-5 w-5" />,
    tags: ['video', 'audio', 'media']
  },

  // Layout Blocks
  {
    id: 'hero-banner',
    name: 'Hero Banner',
    description: 'Eye-catching header section with CTA',
    category: 'Layout',
    icon: <Target className="h-5 w-5" />,
    tags: ['hero', 'banner', 'header'],
    isPopular: true
  },
  {
    id: 'carousel-slider',
    name: 'Carousel/Slider',
    description: 'Image or content carousel',
    category: 'Layout',
    icon: <RotateCcw className="h-5 w-5" />,
    tags: ['carousel', 'slider', 'gallery']
  },

  // News & Articles
  {
    id: 'article-feed',
    name: 'Article Feed',
    description: 'Display latest or filtered articles',
    category: 'News & Articles',
    icon: <Globe className="h-5 w-5" />,
    tags: ['articles', 'news', 'feed'],
    isPopular: true
  },
  {
    id: 'featured-article',
    name: 'Featured Article',
    description: 'Highlight a specific article',
    category: 'News & Articles',
    icon: <Star className="h-5 w-5" />,
    tags: ['featured', 'article', 'highlight']
  },

  // Curated Content
  {
    id: 'top-places',
    name: 'Top Places',
    description: 'Showcase curated locations',
    category: 'Curated Content',
    icon: <MapPin className="h-5 w-5" />,
    tags: ['places', 'locations', 'curated']
  },
  {
    id: 'events-calendar',
    name: 'Events Calendar',
    description: 'Display upcoming events',
    category: 'Curated Content',
    icon: <Calendar className="h-5 w-5" />,
    tags: ['events', 'calendar', 'schedule']
  },
  {
    id: 'food-restaurant',
    name: 'Food/Restaurant',
    description: 'Showcase restaurants and food content',
    category: 'Curated Content',
    icon: <Utensils className="h-5 w-5" />,
    tags: ['food', 'restaurant', 'dining']
  },

  // Profiles
  {
    id: 'profile-cards',
    name: 'Profile Cards',
    description: 'Display user profiles and cards',
    category: 'Profiles',
    icon: <Users className="h-5 w-5" />,
    tags: ['profiles', 'users', 'cards']
  },

  // Engagement
  {
    id: 'call-to-action',
    name: 'Call to Action',
    description: 'Encourage user actions with buttons',
    category: 'Engagement',
    icon: <Zap className="h-5 w-5" />,
    tags: ['cta', 'button', 'action'],
    isPopular: true
  },
  {
    id: 'newsletter-signup',
    name: 'Newsletter Signup',
    description: 'Email subscription form',
    category: 'Engagement',
    icon: <Megaphone className="h-5 w-5" />,
    tags: ['newsletter', 'email', 'subscription']
  },
  {
    id: 'discussion-comments',
    name: 'Discussion/Comments',
    description: 'Enable user comments and discussions',
    category: 'Engagement',
    icon: <MessageSquare className="h-5 w-5" />,
    tags: ['comments', 'discussion', 'interaction']
  },
  {
    id: 'polls-surveys',
    name: 'Polls & Surveys',
    description: 'Interactive polls and surveys',
    category: 'Engagement',
    icon: <BarChart3 className="h-5 w-5" />,
    tags: ['polls', 'surveys', 'interactive']
  },

  // Monetization
  {
    id: 'subscription-plans',
    name: 'Subscription Plans',
    description: 'Display pricing and subscription options',
    category: 'Monetization',
    icon: <CreditCard className="h-5 w-5" />,
    tags: ['subscription', 'pricing', 'plans']
  },
  {
    id: 'ad-slot',
    name: 'Ad Slot',
    description: 'Advertisement placement area',
    category: 'Monetization',
    icon: <Megaphone className="h-5 w-5" />,
    tags: ['ads', 'advertisement', 'monetization']
  },
  {
    id: 'sponsored-content',
    name: 'Sponsored Content',
    description: 'Highlight sponsored articles',
    category: 'Monetization',
    icon: <DollarSign className="h-5 w-5" />,
    tags: ['sponsored', 'paid', 'content']
  }
];

const categories = [
  'All',
  'Content',
  'Layout',
  'News & Articles',
  'Curated Content',
  'Profiles',
  'Engagement',
  'Monetization'
];

export const BlockLibrary: React.FC<BlockLibraryProps> = ({
  isOpen,
  onClose,
  onAddBlock
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { setDraggedBlockType } = useDragDrop();

  const filteredBlocks = blockTypes.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (blockType: string) => {
    setDraggedBlockType(blockType);
  };

  const handleDragEnd = () => {
    setDraggedBlockType(null);
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Content': <Type className="h-4 w-4" />,
      'Layout': <Layout className="h-4 w-4" />,
      'News & Articles': <Globe className="h-4 w-4" />,
      'Curated Content': <MapPin className="h-4 w-4" />,
      'Profiles': <Users className="h-4 w-4" />,
      'Engagement': <Zap className="h-4 w-4" />,
      'Monetization': <DollarSign className="h-4 w-4" />
    };
    return icons[category] || <Layers className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Content': 'bg-blue-100 text-blue-800',
      'Layout': 'bg-purple-100 text-purple-800',
      'News & Articles': 'bg-green-100 text-green-800',
      'Curated Content': 'bg-orange-100 text-orange-800',
      'Profiles': 'bg-pink-100 text-pink-800',
      'Engagement': 'bg-yellow-100 text-yellow-800',
      'Monetization': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Block Library</h2>
              <p className="text-muted-foreground">Choose blocks to add to your page</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              ✕
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category !== 'All' && (
                      <span className="mr-2">
                        {getCategoryIcon(category)}
                      </span>
                    )}
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlocks.map((block) => (
                <Card 
                  key={block.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer group"
                  draggable
                  onDragStart={() => handleDragStart(block.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onAddBlock(block.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                          {block.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{block.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {block.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {block.isPopular && (
                          <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                            <TrendingUp className="mr-1 h-3 w-3" />
                            Popular
                          </Badge>
                        )}
                        {block.isNew && (
                          <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(block.category)}>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(block.category)}
                          {block.category}
                        </div>
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {block.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {block.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{block.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button className="w-full" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Block
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredBlocks.map((block) => (
                <Card 
                  key={block.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  draggable
                  onDragStart={() => handleDragStart(block.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => onAddBlock(block.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {block.icon}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{block.name}</h3>
                          <p className="text-sm text-muted-foreground">{block.description}</p>
                        </div>
                        <Badge className={getCategoryColor(block.category)}>
                          <div className="flex items-center gap-1">
                            {getCategoryIcon(block.category)}
                            {block.category}
                          </div>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex gap-1">
                          {block.isPopular && (
                            <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              Popular
                            </Badge>
                          )}
                          {block.isNew && (
                            <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                              New
                            </Badge>
                          )}
                        </div>
                        <Button size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredBlocks.length === 0 && (
            <div className="text-center py-12">
              <Layers className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No blocks found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



