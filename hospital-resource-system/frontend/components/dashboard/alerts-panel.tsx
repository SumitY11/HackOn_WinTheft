'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AlertTriangle, AlertCircle, Info, Check, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getAlerts, acknowledgeAlert } from '@/lib/api'
import type { Alert } from '@/lib/types'

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const data = await getAlerts()
        setAlerts(data)
      } finally {
        setLoading(false)
      }
    }
    fetchAlerts()
  }, [])

  const handleAcknowledge = async (alertId: string) => {
    await acknowledgeAlert(alertId)
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    )
  }

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return AlertTriangle
      case 'warning':
        return AlertCircle
      default:
        return Info
    }
  }

  const getAlertStyles = (type: Alert['type'], acknowledged: boolean) => {
    if (acknowledged) {
      return 'bg-muted/50 border-muted'
    }
    switch (type) {
      case 'critical':
        return 'bg-critical/5 border-critical/30'
      case 'warning':
        return 'bg-warning/5 border-warning/30'
      default:
        return 'bg-primary/5 border-primary/30'
    }
  }

  const getIconStyles = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'text-critical'
      case 'warning':
        return 'text-warning'
      default:
        return 'text-primary'
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Live Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Bell className="h-5 w-5" />
          Live Alerts
          {unacknowledgedCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unacknowledgedCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type)
              return (
                <div
                  key={alert.id}
                  className={cn(
                    'rounded-lg border p-4 transition-all',
                    getAlertStyles(alert.type, alert.acknowledged)
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', getIconStyles(alert.type))} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn('font-medium text-sm', alert.acknowledged && 'text-muted-foreground')}>
                          {alert.title}
                        </p>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatTime(alert.timestamp)}
                        </span>
                      </div>
                      <p className={cn('text-sm mt-1', alert.acknowledged ? 'text-muted-foreground' : 'text-foreground/80')}>
                        {alert.message}
                      </p>
                      {alert.hospitalName && (
                        <p className="text-xs text-muted-foreground mt-1">{alert.hospitalName}</p>
                      )}
                      {!alert.acknowledged && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 h-7 text-xs"
                          onClick={() => handleAcknowledge(alert.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
