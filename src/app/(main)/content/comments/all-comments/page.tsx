'use client'

import { useState } from 'react'
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Check, 
  X, 
  Flag, 
  Trash2, 
  Eye,
  User,
  Calendar,
  MessageSquare,
  Clock,
  AlertTriangle,
  Shield,
  ShieldOff,
  CheckCircle,
  XCircle,
  Bot,
  ArrowUpDown,
  ChevronDown
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

// Sample data for all tabs
const allComments = [
  {
    id: 1,
    content: "Great article! Very informative and well-written.",
    author: "John Smith",
    email: "john@example.com",
    article: "Breaking News: Technology Update",
    status: "approved",
    date: "2024-01-15T10:30:00Z",
    likes: 12,
    replies: 3,
    isSpam: false,
    isReported: false
  },
  {
    id: 2,
    content: "This is spam content with promotional links.",
    author: "Spam User",
    email: "spam@fake.com",
    article: "Latest News Update",
    status: "spam",
    date: "2024-01-15T09:15:00Z",
    likes: 0,
    replies: 0,
    isSpam: true,
    isReported: false
  },
  {
    id: 3,
    content: "I disagree with this opinion piece. The facts are wrong.",
    author: "Jane Doe",
    email: "jane@example.com",
    article: "Opinion: Economic Analysis",
    status: "pending",
    date: "2024-01-15T08:45:00Z",
    likes: 5,
    replies: 1,
    isSpam: false,
    isReported: true
  },
  {
    id: 4,
    content: "Thanks for sharing this information. Very helpful!",
    author: "Mike Johnson",
    email: "mike@example.com",
    article: "Health Tips Article",
    status: "approved",
    date: "2024-01-14T16:20:00Z",
    likes: 8,
    replies: 0,
    isSpam: false,
    isReported: false
  }
]

const pendingComments = [
  {
    id: 5,
    content: "This is a great article! I learned a lot from it. Keep up the good work!",
    author: "Sarah Johnson",
    email: "sarah@example.com",
    article: "Breaking News: Technology Update",
    date: "2024-01-15T10:30:00Z",
    likes: 0,
    replies: 0,
    isFirstTime: true
  },
  {
    id: 6,
    content: "I disagree with some points in this article. The data seems outdated.",
    author: "Mike Chen",
    email: "mike@example.com",
    article: "Economic Analysis Report",
    date: "2024-01-15T09:15:00Z",
    likes: 0,
    replies: 0,
    isFirstTime: false
  }
]

const reportedComments = [
  {
    id: 7,
    content: "This comment contains inappropriate language and personal attacks.",
    author: "Anonymous User",
    email: "anonymous@example.com",
    article: "Political News Update",
    date: "2024-01-15T10:30:00Z",
    reportCount: 3,
    reportReasons: ["Inappropriate Language", "Personal Attacks", "Spam"],
    status: "pending"
  },
  {
    id: 8,
    content: "This comment spreads misinformation about health topics.",
    author: "HealthSkeptic",
    email: "skeptic@example.com",
    article: "Health and Wellness Guide",
    date: "2024-01-15T09:15:00Z",
    reportCount: 2,
    reportReasons: ["Misinformation", "Harmful Content"],
    status: "pending"
  }
]

const commentUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    commentCount: 45,
    lastComment: "2024-01-15T10:30:00Z",
    status: "active",
    isVerified: true,
    joinDate: "2023-06-15T00:00:00Z",
    reputation: 1250
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    commentCount: 23,
    lastComment: "2024-01-14T16:20:00Z",
    status: "active",
    isVerified: false,
    joinDate: "2023-08-20T00:00:00Z",
    reputation: 890
  },
  {
    id: 3,
    name: "SpamUser123",
    email: "spam@fake.com",
    commentCount: 12,
    lastComment: "2024-01-10T14:30:00Z",
    status: "banned",
    isVerified: false,
    joinDate: "2024-01-01T00:00:00Z",
    reputation: -500,
    banReason: "Spam comments",
    banDate: "2024-01-12T00:00:00Z"
  }
]

export default function AllCommentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedComments, setSelectedComments] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState('all')

  const filteredComments = allComments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.article.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectComment = (commentId: number) => {
    setSelectedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(filteredComments.map(comment => comment.id))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'spam':
        return <Badge className="bg-red-100 text-red-800">Spam</Badge>
      case 'rejected':
        return <Badge className="bg-gray-100 text-gray-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getReputationColor = (reputation: number) => {
    if (reputation >= 1000) return 'text-green-600'
    if (reputation >= 500) return 'text-blue-600'
    if (reputation >= 0) return 'text-gray-600'
    return 'text-red-600'
  }

  const CommentTableRow = ({ comment, showCheckbox = true }: { comment: any, showCheckbox?: boolean }) => (
    <TableRow className="hover:bg-gray-50">
      {showCheckbox && (
        <TableCell className="w-12">
          <Checkbox
            checked={selectedComments.includes(comment.id)}
            onCheckedChange={() => handleSelectComment(comment.id)}
          />
        </TableCell>
      )}
      <TableCell className="max-w-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium text-sm">{comment.author}</span>
            {comment.isVerified && (
              <CheckCircle className="h-3 w-3 text-blue-500" />
            )}
          </div>
          <div className="text-xs text-gray-500">{comment.email}</div>
        </div>
      </TableCell>
      <TableCell className="max-w-md">
        <div className="space-y-2">
          <p className="text-sm text-gray-900 line-clamp-2">{comment.content}</p>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{comment.article}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          {comment.status && getStatusBadge(comment.status)}
          <div className="flex flex-wrap gap-1">
            {comment.isReported && (
              <Badge variant="destructive" className="text-xs">
                <Flag className="h-2 w-2 mr-1" />
                Reported
              </Badge>
            )}
            {comment.isFirstTime && (
              <Badge variant="outline" className="text-xs">
                <AlertTriangle className="h-2 w-2 mr-1" />
                First
              </Badge>
            )}
            {comment.reportCount && (
              <Badge className="bg-red-100 text-red-800 text-xs">
                <AlertTriangle className="h-2 w-2 mr-1" />
                {comment.reportCount}
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {formatDate(comment.date)}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {comment.likes !== undefined && (
              <span className="flex items-center gap-1">
                <span>👍</span> {comment.likes}
              </span>
            )}
            {comment.replies !== undefined && (
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {comment.replies}
              </span>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Check className="h-4 w-4 mr-2" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem>
              <X className="h-4 w-4 mr-2" />
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Flag className="h-4 w-4 mr-2" />
              Mark as Spam
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )

  const UserTableRow = ({ user }: { user: any }) => (
    <TableRow className={`hover:bg-gray-50 ${user.status === 'banned' ? 'bg-red-50' : ''}`}>
      <TableCell>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500" />
          <div>
            <div className="font-medium text-sm">{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <Badge className={user.status === 'banned' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
            {user.status === 'banned' ? 'Banned' : 'Active'}
          </Badge>
          {user.isVerified && (
            <Badge className="bg-blue-100 text-blue-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm font-medium">{user.commentCount}</div>
      </TableCell>
      <TableCell>
        <div className={`text-sm font-medium ${getReputationColor(user.reputation)}`}>
          {user.reputation}
        </div>
      </TableCell>
      <TableCell>
        <div className="text-xs text-gray-500">{formatDate(user.joinDate)}</div>
      </TableCell>
      <TableCell>
        <div className="text-xs text-gray-500">{formatDate(user.lastComment)}</div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.status === 'banned' ? (
              <DropdownMenuItem 
                onClick={() => console.log('Unban user:', user.id)}
                className="text-green-600"
              >
                <ShieldOff className="h-4 w-4 mr-2" />
                Unban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem 
                onClick={() => console.log('Ban user:', user.id)}
                className="text-red-600"
              >
                <Shield className="h-4 w-4 mr-2" />
                Ban User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="All Comments"
        description="Manage all comments across your articles"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Comments ({allComments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingComments.length})</TabsTrigger>
          <TabsTrigger value="reported">Reported ({reportedComments.length})</TabsTrigger>
          <TabsTrigger value="users">Users ({commentUsers.length})</TabsTrigger>
        </TabsList>

        {/* All Comments Tab */}
        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search comments, authors, or articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Comments</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedComments.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">
                {selectedComments.length} comment(s) selected
              </span>
              <Button size="sm" variant="outline">
                <Check className="h-4 w-4 mr-2" />
                Approve Selected
              </Button>
              <Button size="sm" variant="outline">
                <X className="h-4 w-4 mr-2" />
                Reject Selected
              </Button>
              <Button size="sm" variant="outline">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          )}

          {/* Comments Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Stats</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <CommentTableRow key={comment.id} comment={comment} />
                ))}
              </TableBody>
            </Table>
          </Card>

          {filteredComments.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No comments found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>

        {/* Pending Comments Tab */}
        <TabsContent value="pending" className="space-y-6">
          <div className="flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Approve All ({pendingComments.length})
            </Button>
            <Button variant="outline">
              <X className="h-4 w-4 mr-2" />
              Reject All
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedComments.length === pendingComments.length && pendingComments.length > 0}
                      onCheckedChange={() => {
                        if (selectedComments.length === pendingComments.length) {
                          setSelectedComments([])
                        } else {
                          setSelectedComments(pendingComments.map(comment => comment.id))
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Stats</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingComments.map((comment) => (
                  <CommentTableRow key={comment.id} comment={comment} />
                ))}
              </TableBody>
            </Table>
          </Card>

          {pendingComments.length === 0 && (
            <div className="text-center py-12">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No comments are pending review at the moment.</p>
            </div>
          )}
        </TabsContent>

        {/* Reported Comments Tab */}
        <TabsContent value="reported" className="space-y-6">
          <div className="flex gap-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Approve All ({reportedComments.length})
            </Button>
            <Button variant="outline">
              <X className="h-4 w-4 mr-2" />
              Reject All
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedComments.length === reportedComments.length && reportedComments.length > 0}
                      onCheckedChange={() => {
                        if (selectedComments.length === reportedComments.length) {
                          setSelectedComments([])
                        } else {
                          setSelectedComments(reportedComments.map(comment => comment.id))
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Stats</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportedComments.map((comment) => (
                  <CommentTableRow key={comment.id} comment={comment} />
                ))}
              </TableBody>
            </Table>
          </Card>

          {reportedComments.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reported comments</h3>
              <p className="text-gray-600">All reported comments have been reviewed and resolved.</p>
            </div>
          )}
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-blue-600">{commentUsers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-green-600">
                      {commentUsers.filter(user => user.status === 'active').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Banned Users</p>
                    <p className="text-2xl font-bold text-red-600">
                      {commentUsers.filter(user => user.status === 'banned').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Verified Users</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {commentUsers.filter(user => user.isVerified).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Reputation</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Comment</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commentUsers.map((user) => (
                  <UserTableRow key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </Card>

          {commentUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">No comment users available at the moment.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
