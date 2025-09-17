'use client'

import { useSelector } from "react-redux"
import { selectDraftPages } from "@/lib/redux/slices/pagesSlice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Eye, Calendar } from "lucide-react"
import Link from "next/link"

export default function DraftPagesPage() {
  const draftPages = useSelector(selectDraftPages);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Draft Pages</h2>
          <p className="text-muted-foreground">
            Pages that are still being worked on.
          </p>
        </div>
      </div>

      {draftPages.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-muted-foreground">
            <Pencil className="h-12 w-12" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No draft pages</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Get started by creating a new page.
          </p>
          <div className="mt-6">
            <Link href="/content/pages/new">
              <Button>
                <Pencil className="mr-2 h-4 w-4" />
                Create New Page
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {draftPages.map((page) => (
            <div key={page.id} className="rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{page.title}</h3>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                  <Badge variant="secondary">{page.template}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Link href={`/content/pages/edit/${page.id}`}>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Last updated: {new Date(page.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

