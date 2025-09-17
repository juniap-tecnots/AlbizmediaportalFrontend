'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArticleFeedData, BlockConfig } from '@/lib/redux/slices/blocksSlice';
import { selectAllArticles } from '@/lib/redux/slices/articlesSlice';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ArticleFeedBlockProps {
  block: BlockConfig;
  isPreview?: boolean;
}

export function ArticleFeedBlock({ block, isPreview = false }: ArticleFeedBlockProps) {
  const data = block.data as ArticleFeedData;
  const styling = block.styling;
  const allArticles = useSelector(selectAllArticles);

  // Filter articles based on source
  const getFilteredArticles = () => {
    let filtered = [...allArticles];

    switch (data.source) {
      case 'latest':
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'trending':
        // For now, use latest as trending. In real app, this would be based on views/engagement
        filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'category':
        if (data.category) {
          filtered = filtered.filter(article => 
            article.categories.includes(data.category!)
          );
        }
        break;
      case 'tagged':
        if (data.tags && data.tags.length > 0) {
          filtered = filtered.filter(article => 
            data.tags!.some(tag => article.tags.includes(tag))
          );
        }
        break;
    }

    return filtered.slice(0, data.limit);
  };

  const articles = getFilteredArticles();

  const getLayoutClass = () => {
    switch (data.layout) {
      case 'grid':
        return `grid gap-6 ${data.columns === 1 ? 'grid-cols-1' : data.columns === 2 ? 'grid-cols-1 md:grid-cols-2' : data.columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`;
      case 'list':
        return 'space-y-4';
      case 'carousel':
        return 'flex overflow-x-auto space-x-4 pb-4';
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      default:
        return 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getImageRatioClass = () => {
    switch (data.imageRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-video';
    }
  };

  const renderArticleCard = (article: any, index: number) => {
    if (data.layout === 'list') {
      return (
        <Card key={article.id} className="flex flex-row overflow-hidden">
          <div className="w-48 h-32 flex-shrink-0">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{article.categories[0]}</Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="text-lg mb-2 line-clamp-2">
              {article.title}
            </CardTitle>
            {data.showExcerpt && (
              <CardDescription className="line-clamp-2">
                {article.excerpt}
              </CardDescription>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              <Button variant="ghost" size="sm">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className={cn('w-full', getImageRatioClass())}>
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">{article.categories[0]}</Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(article.date).toLocaleDateString()}
            </span>
          </div>
          <CardTitle className="text-lg mb-2 line-clamp-2">
            {article.title}
          </CardTitle>
          {data.showExcerpt && (
            <CardDescription className="line-clamp-3 mb-4">
              {article.excerpt}
            </CardDescription>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {article.author}
            </div>
            <Button variant="ghost" size="sm">
              Read More <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      className={cn('w-full', styling?.customCSS)}
      style={{
        backgroundColor: styling?.backgroundColor,
        color: styling?.textColor,
        padding: styling?.padding ? `${styling.padding.top}px ${styling.padding.right}px ${styling.padding.bottom}px ${styling.padding.left}px` : undefined,
        margin: styling?.margin ? `${styling.margin.top}px ${styling.margin.right}px ${styling.margin.bottom}px ${styling.margin.left}px` : undefined,
        borderRadius: styling?.borderRadius ? `${styling.borderRadius}px` : undefined,
      }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Latest Articles</h2>
        <p className="text-muted-foreground">
          {data.source === 'latest' && 'Stay updated with our latest news and stories'}
          {data.source === 'trending' && 'Discover what\'s trending right now'}
          {data.source === 'category' && `Articles in ${data.category}`}
          {data.source === 'tagged' && `Articles tagged with ${data.tags?.join(', ')}`}
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found.</p>
        </div>
      ) : (
        <div className={getLayoutClass()}>
          {articles.map((article, index) => renderArticleCard(article, index))}
        </div>
      )}

      {articles.length >= data.limit && (
        <div className="text-center mt-8">
          <Button variant="outline">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ArticleFeedBlock;



