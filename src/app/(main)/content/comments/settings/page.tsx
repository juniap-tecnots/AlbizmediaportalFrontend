'use client'

import { useState } from 'react'
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Shield, 
  Mail, 
  Bot, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare
} from "lucide-react"

export default function CommentSettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    requireApproval: true,
    allowGuestComments: false,
    maxCommentLength: 1000,
    commentTimeout: 30,
    
    // Moderation Rules
    autoModeration: true,
    spamDetection: true,
    profanityFilter: true,
    linkModeration: true,
    maxLinksPerComment: 2,
    
    // Email Notifications
    notifyOnNewComment: true,
    notifyOnReport: true,
    notifyOnSpam: false,
    adminEmail: "admin@albizmedia.com",
    
    // Spam Protection
    captchaEnabled: true,
    rateLimitEnabled: true,
    maxCommentsPerHour: 5,
    maxCommentsPerDay: 20,
    
    // User Restrictions
    banAfterReports: 3,
    autoBanSpamUsers: true,
    requireEmailVerification: false,
    allowAnonymousReports: true
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    // Here you would typically make an API call to save the settings
    console.log('Saving settings:', settings)
  }

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Comment Settings"
        description="Configure comment moderation and management settings"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Comment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-approval">Require Comment Approval</Label>
                  <p className="text-sm text-gray-600">All comments must be approved before appearing on the site</p>
                </div>
                <Switch
                  id="require-approval"
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="allow-guest">Allow Guest Comments</Label>
                  <p className="text-sm text-gray-600">Allow non-registered users to post comments</p>
                </div>
                <Switch
                  id="allow-guest"
                  checked={settings.allowGuestComments}
                  onCheckedChange={(checked) => handleSettingChange('allowGuestComments', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-length">Maximum Comment Length</Label>
                <Input
                  id="max-length"
                  type="number"
                  value={settings.maxCommentLength}
                  onChange={(e) => handleSettingChange('maxCommentLength', parseInt(e.target.value))}
                  placeholder="1000"
                />
                <p className="text-sm text-gray-600">Maximum number of characters allowed in comments</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment-timeout">Comment Edit Timeout (minutes)</Label>
                <Input
                  id="comment-timeout"
                  type="number"
                  value={settings.commentTimeout}
                  onChange={(e) => handleSettingChange('commentTimeout', parseInt(e.target.value))}
                  placeholder="30"
                />
                <p className="text-sm text-gray-600">How long users can edit their comments after posting</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moderation Settings */}
        <TabsContent value="moderation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Moderation Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-moderation">Enable Auto-Moderation</Label>
                  <p className="text-sm text-gray-600">Automatically moderate comments based on rules</p>
                </div>
                <Switch
                  id="auto-moderation"
                  checked={settings.autoModeration}
                  onCheckedChange={(checked) => handleSettingChange('autoModeration', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="spam-detection">Spam Detection</Label>
                  <p className="text-sm text-gray-600">Automatically detect and flag spam comments</p>
                </div>
                <Switch
                  id="spam-detection"
                  checked={settings.spamDetection}
                  onCheckedChange={(checked) => handleSettingChange('spamDetection', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profanity-filter">Profanity Filter</Label>
                  <p className="text-sm text-gray-600">Filter out inappropriate language</p>
                </div>
                <Switch
                  id="profanity-filter"
                  checked={settings.profanityFilter}
                  onCheckedChange={(checked) => handleSettingChange('profanityFilter', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="link-moderation">Link Moderation</Label>
                  <p className="text-sm text-gray-600">Moderate comments containing links</p>
                </div>
                <Switch
                  id="link-moderation"
                  checked={settings.linkModeration}
                  onCheckedChange={(checked) => handleSettingChange('linkModeration', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-links">Maximum Links per Comment</Label>
                <Input
                  id="max-links"
                  type="number"
                  value={settings.maxLinksPerComment}
                  onChange={(e) => handleSettingChange('maxLinksPerComment', parseInt(e.target.value))}
                  placeholder="2"
                />
                <p className="text-sm text-gray-600">Maximum number of links allowed in a single comment</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-new">Notify on New Comments</Label>
                  <p className="text-sm text-gray-600">Send email notifications when new comments are posted</p>
                </div>
                <Switch
                  id="notify-new"
                  checked={settings.notifyOnNewComment}
                  onCheckedChange={(checked) => handleSettingChange('notifyOnNewComment', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-report">Notify on Reports</Label>
                  <p className="text-sm text-gray-600">Send email notifications when comments are reported</p>
                </div>
                <Switch
                  id="notify-report"
                  checked={settings.notifyOnReport}
                  onCheckedChange={(checked) => handleSettingChange('notifyOnReport', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-spam">Notify on Spam Detection</Label>
                  <p className="text-sm text-gray-600">Send email notifications when spam is detected</p>
                </div>
                <Switch
                  id="notify-spam"
                  checked={settings.notifyOnSpam}
                  onCheckedChange={(checked) => handleSettingChange('notifyOnSpam', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email Address</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                  placeholder="admin@albizmedia.com"
                />
                <p className="text-sm text-gray-600">Email address to receive notifications</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Spam Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="captcha">Enable CAPTCHA</Label>
                  <p className="text-sm text-gray-600">Require CAPTCHA verification for comments</p>
                </div>
                <Switch
                  id="captcha"
                  checked={settings.captchaEnabled}
                  onCheckedChange={(checked) => handleSettingChange('captchaEnabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="rate-limit">Rate Limiting</Label>
                  <p className="text-sm text-gray-600">Limit the number of comments per user</p>
                </div>
                <Switch
                  id="rate-limit"
                  checked={settings.rateLimitEnabled}
                  onCheckedChange={(checked) => handleSettingChange('rateLimitEnabled', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-per-hour">Max Comments per Hour</Label>
                <Input
                  id="max-per-hour"
                  type="number"
                  value={settings.maxCommentsPerHour}
                  onChange={(e) => handleSettingChange('maxCommentsPerHour', parseInt(e.target.value))}
                  placeholder="5"
                />
                <p className="text-sm text-gray-600">Maximum comments allowed per user per hour</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-per-day">Max Comments per Day</Label>
                <Input
                  id="max-per-day"
                  type="number"
                  value={settings.maxCommentsPerDay}
                  onChange={(e) => handleSettingChange('maxCommentsPerDay', parseInt(e.target.value))}
                  placeholder="20"
                />
                <p className="text-sm text-gray-600">Maximum comments allowed per user per day</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                User Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ban-after-reports">Ban After Reports</Label>
                <Input
                  id="ban-after-reports"
                  type="number"
                  value={settings.banAfterReports}
                  onChange={(e) => handleSettingChange('banAfterReports', parseInt(e.target.value))}
                  placeholder="3"
                />
                <p className="text-sm text-gray-600">Number of reports before user is automatically banned</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-ban-spam">Auto-Ban Spam Users</Label>
                  <p className="text-sm text-gray-600">Automatically ban users who post spam</p>
                </div>
                <Switch
                  id="auto-ban-spam"
                  checked={settings.autoBanSpamUsers}
                  onCheckedChange={(checked) => handleSettingChange('autoBanSpamUsers', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-verification">Require Email Verification</Label>
                  <p className="text-sm text-gray-600">Require email verification before commenting</p>
                </div>
                <Switch
                  id="email-verification"
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="anonymous-reports">Allow Anonymous Reports</Label>
                  <p className="text-sm text-gray-600">Allow non-registered users to report comments</p>
                </div>
                <Switch
                  id="anonymous-reports"
                  checked={settings.allowAnonymousReports}
                  onCheckedChange={(checked) => handleSettingChange('allowAnonymousReports', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}



