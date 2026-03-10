'use client'

import { useEffect, useState } from 'react'
import { AlertTriangle, AlertCircle, Info, Check, Bell, Filter, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { getAlerts, acknowledgeAlert } from '@/lib/api'
import type { Alert } from '@/lib/types'

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAlerts()
        setAlerts(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAcknowledge = async (alertId: string) => {
    await acknowledgeAlert(alertId)
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    )
  }

  const handleAcknowledgeAll = async () => {
    const unacknowledged = alerts.filter((a) => !a.acknowledged)
    for (const alert of unacknowledged) {
      await acknowledgeAlert(alert.id)
    }
    setAlerts((prev) => prev.map((alert) => ({ ...alert, acknowledged: true })))
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alert.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    const matchesType = typeFilter === 'all' || alert.type === typeFilter
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'acknowledged' && alert.acknowledged) ||
      (statusFilter === 'unacknowledged' && !alert.acknowledged)
    return matchesSearch && matchesType && matchesStatus
  })

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
    return date.toLocaleString()
  }

  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length
  const criticalCount = alerts.filter((a) => a.type === 'critical' && !a.acknowledged).length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
            <p className="text-muted-foreground">System alerts and notifications</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-24 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground">
            {alerts.length} total alerts, {unacknowledgedCount} unacknowledged
          </p>
        </div>
        {unacknowledgedCount > 0 && (
          <Button onClick={handleAcknowledgeAll}>
            <Check className="h-4 w-4 mr-2" />
            Acknowledge All ({unacknowledgedCount})
          </Button>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold">{alerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-critical/5 border-critical/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-critical/10">
                <AlertTriangle className="h-5 w-5 text-critical" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-critical">{criticalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/5 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-warning">
                  {alerts.filter((a) => a.type === 'warning' && !a.acknowledged).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Check className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Acknowledged</p>
                <p className="text-2xl font-bold text-success">
                  {alerts.filter((a) => a.acknowledged).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Alert Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="unacknowledged">Unacknowledged</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Alert History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const Icon = getAlertIcon(alert.type)
              return (
                <div
                  key={alert.id}
                  className={cn(
                    'rounded-lg border p-4 transition-all',
                    getAlertStyles(alert.type, alert.acknowledged)
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      <Icon className={cn('h-6 w-6', getIconStyles(alert.type))} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3
                              className={cn(
                                'font-semibold',
                                alert.acknowledged && 'text-muted-foreground'
                              )}
                            >
                              {alert.title}
                            </h3>
                            <Badge
                              variant={alert.type === 'critical' ? 'destructive' : 'outline'}
                              className="capitalize"
                            >
                              {alert.type}
                            </Badge>
                            {alert.acknowledged && (
                              <Badge variant="secondary">Acknowledged</Badge>
                            )}
                          </div>
                          <p
                            className={cn(
                              'text-sm mt-1',
                              alert.acknowledged
                                ? 'text-muted-foreground'
                                : 'text-foreground/80'
                            )}
                          >
                            {alert.message}
                          </p>
                          {alert.hospitalName && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Hospital: {alert.hospitalName}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatTime(alert.timestamp)}
                          </p>
                        </div>
                        {!alert.acknowledged && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcknowledge(alert.id)}
                            className="shrink-0"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {filteredAlerts.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No alerts found matching your criteria
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
