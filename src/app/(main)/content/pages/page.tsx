export default function PagesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Pages</h2>
          <p className="text-muted-foreground">
            Manage all your website pages in one place.
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Published</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Live pages</p>
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium">Drafts</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </div>
        </div>
        
        <div className="rounded-lg border p-6">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">Total</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">All pages</p>
          </div>
        </div>
      </div>
    </div>
  );
}
