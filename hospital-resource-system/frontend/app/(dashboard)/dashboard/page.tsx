'use client'

import { useEffect, useState } from 'react'
import { Building2, Users, AlertTriangle, Bed, Wind, Droplets } from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { ChartsPanel } from '@/components/dashboard/charts-panel'
import { AlertsPanel } from '@/components/dashboard/alerts-panel'
import { PredictionCard } from '@/components/dashboard/prediction-card'
import { HospitalMap } from '@/components/maps/hospital-map'
import { getDashboardStats } from '@/lib/api'
import { useSocket } from '@/lib/socket'
import type { DashboardStats, SocketEvent } from '@/lib/types'

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats()
        setStats(data)
        setLastUpdate(new Date().toLocaleTimeString())
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Handle real-time updates
  useSocket((event: SocketEvent) => {
    console.log('[v0] Socket event received:', event.type)
    setLastUpdate(new Date().toLocaleTimeString())
    // In production, update specific stats based on event type
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          National Healthcare Resource Monitoring System
          {lastUpdate && (
            <span className="ml-2 text-xs">Last updated: {lastUpdate}</span>
          )}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Hospitals"
          value={loading ? '...' : stats?.totalHospitals ?? 0}
          icon={Building2}
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Total Patients"
          value={loading ? '...' : stats?.totalPatients ?? 0}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Critical Cases"
          value={loading ? '...' : stats?.criticalCases ?? 0}
          icon={AlertTriangle}
          variant="critical"
          trend={{ value: 3, isPositive: false }}
        />
        <StatCard
          title="ICU Beds Available"
          value={loading ? '...' : stats?.icuBedsAvailable ?? 0}
          icon={Bed}
          variant="warning"
        />
        <StatCard
          title="Ventilators Available"
          value={loading ? '...' : stats?.ventilatorsAvailable ?? 0}
          icon={Wind}
          variant="success"
        />
        <StatCard
          title="Oxygen Units"
          value={loading ? '...' : stats?.oxygenUnitsAvailable ?? 0}
          icon={Droplets}
          variant="success"
        />
      </div>

      {/* Charts Section */}
      <ChartsPanel stats={stats} />

      {/* Map and Alerts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <HospitalMap />
        </div>
        <div className="space-y-6">
          <PredictionCard stats={stats} />
          <AlertsPanel />
        </div>
      </div>
    </div>
  )
}
