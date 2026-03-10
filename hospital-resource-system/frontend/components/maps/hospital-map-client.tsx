'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Map, Building2 } from 'lucide-react'
import { getHospitalMapData } from '@/lib/api'
import type { Hospital } from '@/lib/types'

interface HospitalMapClientProps {
  className?: string
  fullScreen?: boolean
}

export function HospitalMapClient({ className, fullScreen = false }: HospitalMapClientProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHospitalMapData()
        setHospitals(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getStatusBadge = (status: Hospital['status']) => {
    switch (status) {
      case 'available':
        return '<span style="background:#22c55e;color:white;padding:2px 8px;border-radius:9999px;font-size:12px;">Available</span>'
      case 'moderate':
        return '<span style="background:#eab308;color:white;padding:2px 8px;border-radius:9999px;font-size:12px;">Moderate</span>'
      case 'full':
        return '<span style="background:#ef4444;color:white;padding:2px 8px;border-radius:9999px;font-size:12px;">Full</span>'
    }
  }

  const createPopupContent = useCallback((hospital: Hospital) => {
    const bedOccupancy = Math.round(((hospital.totalBeds - hospital.availableBeds) / hospital.totalBeds) * 100)
    const icuOccupancy = Math.round(((hospital.icuBeds - hospital.icuAvailable) / hospital.icuBeds) * 100)
    const ventOccupancy = Math.round(((hospital.ventilators - hospital.ventilatorsAvailable) / hospital.ventilators) * 100)

    return `
      <div style="min-width:260px;padding:8px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <h3 style="font-weight:600;font-size:14px;margin:0;">${hospital.name}</h3>
          ${getStatusBadge(hospital.status)}
        </div>
        <p style="font-size:12px;color:#666;margin:0 0 12px 0;">
          ${hospital.location.address}, ${hospital.location.city}
        </p>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
              <span>General Beds</span>
              <span style="font-weight:500;">${hospital.availableBeds}/${hospital.totalBeds}</span>
            </div>
            <div style="background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;">
              <div style="background:${bedOccupancy > 80 ? '#ef4444' : bedOccupancy > 50 ? '#eab308' : '#22c55e'};height:100%;width:${bedOccupancy}%;"></div>
            </div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
              <span>ICU Beds</span>
              <span style="font-weight:500;">${hospital.icuAvailable}/${hospital.icuBeds}</span>
            </div>
            <div style="background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;">
              <div style="background:${icuOccupancy > 80 ? '#ef4444' : icuOccupancy > 50 ? '#eab308' : '#22c55e'};height:100%;width:${icuOccupancy}%;"></div>
            </div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
              <span>Ventilators</span>
              <span style="font-weight:500;">${hospital.ventilatorsAvailable}/${hospital.ventilators}</span>
            </div>
            <div style="background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;">
              <div style="background:${ventOccupancy > 80 ? '#ef4444' : ventOccupancy > 50 ? '#eab308' : '#22c55e'};height:100%;width:${ventOccupancy}%;"></div>
            </div>
          </div>
        </div>
        <p style="font-size:11px;color:#999;margin:12px 0 0 0;">
          Last updated: ${new Date(hospital.lastUpdated).toLocaleTimeString()}
        </p>
      </div>
    `
  }, [])

  useEffect(() => {
    if (loading || !mapContainerRef.current || mapRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      // Fix default icon issue
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      const map = L.map(mapContainerRef.current!, {
        center: [28.5355, 77.1500],
        zoom: 11,
        scrollWheelZoom: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map)

      mapRef.current = map
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [loading])

  useEffect(() => {
    if (!mapRef.current || hospitals.length === 0) return

    const addMarkers = async () => {
      const L = (await import('leaflet')).default

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

      const colors = {
        available: '#22c55e',
        moderate: '#eab308',
        full: '#ef4444',
      }

      hospitals.forEach((hospital) => {
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background-color: ${colors[hospital.status]};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })

        const marker = L.marker([hospital.location.lat, hospital.location.lng], { icon })
          .addTo(mapRef.current!)
          .bindPopup(createPopupContent(hospital), { minWidth: 280 })

        markersRef.current.push(marker)
      })
    }

    addMarkers()
  }, [hospitals, createPopupContent])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Map className="h-5 w-5" />
          Hospital Capacity Map
          <div className="ml-auto flex items-center gap-3 text-sm font-normal">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-critical" />
              <span className="text-muted-foreground">Full</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          ref={mapContainerRef}
          className="rounded-b-lg overflow-hidden"
          style={{ height: fullScreen ? 'calc(100vh - 200px)' : '400px' }}
        >
          {loading && (
            <div className="h-full w-full bg-muted animate-pulse flex items-center justify-center">
              <Building2 className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
