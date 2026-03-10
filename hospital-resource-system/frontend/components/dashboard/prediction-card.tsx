'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, TrendingUp, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DashboardStats } from '@/lib/types'

interface PredictionCardProps {
  stats: DashboardStats | null
}

export function PredictionCard({ stats }: PredictionCardProps) {
  if (!stats) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 w-48 bg-muted rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded" />
        </CardContent>
      </Card>
    )
  }

  const { predictedIcuShortage } = stats

  const severityStyles = {
    low: 'bg-success/10 border-success/30 text-success',
    medium: 'bg-warning/10 border-warning/30 text-warning',
    high: 'bg-critical/10 border-critical/30 text-critical',
  }

  const badgeVariant = {
    low: 'outline' as const,
    medium: 'secondary' as const,
    high: 'destructive' as const,
  }

  return (
    <Card className={cn('border-2', severityStyles[predictedIcuShortage.severity])}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Brain className="h-5 w-5" />
          AI Prediction Module
          <Badge variant={badgeVariant[predictedIcuShortage.severity]} className="ml-auto">
            {predictedIcuShortage.severity.toUpperCase()} RISK
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Predicted ICU Shortage</p>
              <p className="text-2xl font-bold">
                {predictedIcuShortage.shortage ? 'Yes' : 'No'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-background">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estimated Time</p>
              <p className="text-xl font-semibold">{predictedIcuShortage.estimatedTime}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Based on current admission rates, ICU occupancy trends, and historical data analysis.
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
