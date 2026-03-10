'use client'

import { HospitalMap } from '@/components/maps/hospital-map'

export default function EmergencyMapPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Emergency Map</h1>
        <p className="text-muted-foreground">
          Real-time hospital capacity visualization across the region
        </p>
      </div>

      {/* Full Screen Map */}
      <HospitalMap fullScreen />
    </div>
  )
}
