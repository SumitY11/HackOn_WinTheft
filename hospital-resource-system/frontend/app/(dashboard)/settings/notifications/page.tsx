'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Bell, Mail, Smartphone, AlertTriangle, Activity, Users } from 'lucide-react'

export default function NotificationsSettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    criticalAlerts: true,
    capacityWarnings: true,
    patientUpdates: false,
    systemUpdates: true,
    weeklyReports: true,
    dailyDigest: false,
  })

  function updateNotification(key: keyof typeof notifications, value: boolean) {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
            </div>
            <Switch
              checked={notifications.emailAlerts}
              onCheckedChange={(v) => updateNotification('emailAlerts', v)}
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
              </div>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(v) => updateNotification('pushNotifications', v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Alert Types */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Types</CardTitle>
          <CardDescription>Configure which alerts you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium">Critical Alerts</p>
                <p className="text-sm text-muted-foreground">
                  ICU capacity critical, equipment failures, emergencies
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.criticalAlerts}
              onCheckedChange={(v) => updateNotification('criticalAlerts', v)}
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Activity className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="font-medium">Capacity Warnings</p>
                <p className="text-sm text-muted-foreground">
                  Bed availability low, resource shortage warnings
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.capacityWarnings}
              onCheckedChange={(v) => updateNotification('capacityWarnings', v)}
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium">Patient Updates</p>
                <p className="text-sm text-muted-foreground">
                  Patient admissions, discharges, and status changes
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.patientUpdates}
              onCheckedChange={(v) => updateNotification('patientUpdates', v)}
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-lg">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">System Updates</p>
                <p className="text-sm text-muted-foreground">
                  Maintenance windows, feature updates, policy changes
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.systemUpdates}
              onCheckedChange={(v) => updateNotification('systemUpdates', v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Reports & Digests</CardTitle>
          <CardDescription>Scheduled reports and summary emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Weekly Summary Report</p>
              <p className="text-sm text-muted-foreground">
                Weekly overview of hospital metrics and trends
              </p>
            </div>
            <Switch
              checked={notifications.weeklyReports}
              onCheckedChange={(v) => updateNotification('weeklyReports', v)}
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Daily Digest</p>
              <p className="text-sm text-muted-foreground">
                Daily summary of all activities and alerts
              </p>
            </div>
            <Switch
              checked={notifications.dailyDigest}
              onCheckedChange={(v) => updateNotification('dailyDigest', v)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
