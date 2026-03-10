'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Map } from 'lucide-react'

// Dynamically import the map component with SSR disabled
const HospitalMapClient = dynamic(
  () => import('./hospital-map-client').then((mod) => mod.HospitalMapClient),
  {
    ssr: false,
    loading: () => (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Hospital Capacity Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="bg-muted rounded-lg animate-pulse"
            style={{ height: '400px' }}
          />
        </CardContent>
      </Card>
    ),
  }
)

interface HospitalMapProps {
  className?: string
  fullScreen?: boolean
}

export function HospitalMap({ className, fullScreen = false }: HospitalMapProps) {
  return <HospitalMapClient className={className} fullScreen={fullScreen} />
}
