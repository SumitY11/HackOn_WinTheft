'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Building2, Database, Shield, Clock, AlertTriangle, Settings } from 'lucide-react'

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState('80')

  return (
    <div className="space-y-6">
      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>Current system health and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">API Status</span>
                <Badge className="bg-success text-success-foreground">Healthy</Badge>
              </div>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-xs text-muted-foreground">Uptime last 30 days</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Database</span>
                <Badge className="bg-success text-success-foreground">Connected</Badge>
              </div>
              <p className="text-2xl font-bold">24ms</p>
              <p className="text-xs text-muted-foreground">Avg response time</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Last Sync</span>
                <Badge variant="secondary">Live</Badge>
              </div>
              <p className="text-2xl font-bold">Now</p>
              <p className="text-xs text-muted-foreground">Real-time data sync</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Maintenance Mode
          </CardTitle>
          <CardDescription>
            Enable maintenance mode to temporarily disable access for non-admin users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Enable Maintenance Mode</p>
              <p className="text-sm text-muted-foreground">
                All users except administrators will see a maintenance page
              </p>
            </div>
            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
          </div>
          {maintenanceMode && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-warning flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Maintenance mode is currently active. Non-admin users cannot access the system.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Database Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Configuration
          </CardTitle>
          <CardDescription>Manage database backup and sync settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Automatic Backups</p>
              <p className="text-sm text-muted-foreground">
                Automatically backup database every 24 hours
              </p>
            </div>
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Last Backup</p>
                <p className="text-sm text-muted-foreground">March 10, 2026 at 02:00 AM</p>
              </div>
            </div>
            <Button variant="outline">Backup Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Alert Configuration
          </CardTitle>
          <CardDescription>Configure system-wide alert thresholds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Capacity Warning Threshold (%)</label>
              <Input
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                min="50"
                max="100"
              />
              <p className="text-xs text-muted-foreground">
                Trigger warning when capacity exceeds this percentage
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Critical Alert Threshold (%)</label>
              <Input type="number" defaultValue="95" min="50" max="100" />
              <p className="text-xs text-muted-foreground">
                Trigger critical alert when capacity exceeds this percentage
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital Registration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Hospital Registration
          </CardTitle>
          <CardDescription>Manage hospital onboarding settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Require Admin Approval</p>
              <p className="text-sm text-muted-foreground">
                New hospital registrations require admin approval
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Auto-sync Hospital Data</p>
              <p className="text-sm text-muted-foreground">
                Automatically sync hospital data from government registry
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
