'use client'

import { useSelector } from "react-redux"
import { selectPublishedPages } from "@/lib/redux/slices/pagesSlice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, ExternalLink, Archive } from "lucide-react"
import Link from "next/link"

export default function PublishedPagesPage() {
  const publishedPages = useSelector(selectPublishedPages);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Published Pages</h2>
          <p className="text-muted-foreground">
            Pages that are live on your website.
          </p>
        </div>
      </div>

      {publishedPages.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground">
            <ExternalLink className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No published pages</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Publish your first page to make it live.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {publishedPages.map((page) => (
            <div key={page.id} className="rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{page.title}</h3>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Published
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Published: {new Date(page.publishDate || page.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
