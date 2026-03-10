'use client'

import { useEffect, useState } from 'react'
import { Building2, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getHospitals } from '@/lib/api'
import type { Hospital } from '@/lib/types'

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getHospitals()
        setHospitals(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || hospital.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Hospital['status']) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success text-success-foreground">Available</Badge>
      case 'moderate':
        return <Badge className="bg-warning text-warning-foreground">Moderate</Badge>
      case 'full':
        return <Badge variant="destructive">Full</Badge>
    }
  }

  const calculateOccupancy = (used: number, total: number) => {
    return Math.round((used / total) * 100)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hospitals</h1>
            <p className="text-muted-foreground">Manage and monitor hospital resources</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse" />
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
          <h1 className="text-2xl font-bold tracking-tight">Hospitals</h1>
          <p className="text-muted-foreground">
            {hospitals.length} hospitals registered in the system
          </p>
        </div>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          Add Hospital
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search hospitals by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hospitals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Hospital List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bed Capacity</TableHead>
                <TableHead>ICU Availability</TableHead>
                <TableHead>Ventilators</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHospitals.map((hospital) => (
                <TableRow key={hospital.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{hospital.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {hospital.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{hospital.location.city}</p>
                      <p className="text-xs text-muted-foreground">{hospital.location.state}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(hospital.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[120px]">
                      <div className="flex justify-between text-xs">
                        <span>Available</span>
                        <span className="font-medium">
                          {hospital.availableBeds}/{hospital.totalBeds}
                        </span>
                      </div>
                      <Progress
                        value={calculateOccupancy(
                          hospital.totalBeds - hospital.availableBeds,
                          hospital.totalBeds
                        )}
                        className="h-1.5"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[100px]">
                      <div className="flex justify-between text-xs">
                        <span>ICU</span>
                        <span className="font-medium">
                          {hospital.icuAvailable}/{hospital.icuBeds}
                        </span>
                      </div>
                      <Progress
                        value={calculateOccupancy(
                          hospital.icuBeds - hospital.icuAvailable,
                          hospital.icuBeds
                        )}
                        className="h-1.5"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[100px]">
                      <div className="flex justify-between text-xs">
                        <span>Available</span>
                        <span className="font-medium">
                          {hospital.ventilatorsAvailable}/{hospital.ventilators}
                        </span>
                      </div>
                      <Progress
                        value={calculateOccupancy(
                          hospital.ventilators - hospital.ventilatorsAvailable,
                          hospital.ventilators
                        )}
                        className="h-1.5"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredHospitals.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No hospitals found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
