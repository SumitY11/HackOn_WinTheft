'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { DashboardStats } from '@/lib/types'

interface ChartsPanelProps {
  stats: DashboardStats | null
}

export function ChartsPanel({ stats }: ChartsPanelProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-48 bg-muted rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded" />
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-48 bg-muted rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const severityData = [
    { name: 'Critical', value: stats.patientsBySeverity.critical, color: 'hsl(0 72% 51%)' },
    { name: 'Stable', value: stats.patientsBySeverity.stable, color: 'hsl(217 91% 60%)' },
    { name: 'Recovering', value: stats.patientsBySeverity.recovering, color: 'hsl(142 71% 45%)' },
  ]

  const resourceData = [
    {
      name: 'Beds',
      used: stats.resourceUsage.beds.used,
      available: stats.resourceUsage.beds.total - stats.resourceUsage.beds.used,
    },
    {
      name: 'ICU',
      used: stats.resourceUsage.icu.used,
      available: stats.resourceUsage.icu.total - stats.resourceUsage.icu.used,
    },
    {
      name: 'Ventilators',
      used: stats.resourceUsage.ventilators.used,
      available: stats.resourceUsage.ventilators.total - stats.resourceUsage.ventilators.used,
    },
    {
      name: 'Oxygen',
      used: stats.resourceUsage.oxygen.used,
      available: stats.resourceUsage.oxygen.total - stats.resourceUsage.oxygen.used,
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Patient Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Patient Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Resource Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="used" stackId="a" fill="hsl(217 91% 60%)" name="In Use" radius={[0, 0, 0, 0]} />
                <Bar dataKey="available" stackId="a" fill="hsl(142 71% 45%)" name="Available" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
