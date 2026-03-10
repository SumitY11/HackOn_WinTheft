'use client'

import { useEffect, useState } from 'react'
import { Package, Search, Filter, Wind, Droplets, Bed, Monitor } from 'lucide-react'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getEquipment } from '@/lib/api'
import type { Equipment } from '@/lib/types'

export default function ResourcesPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEquipment()
        setEquipment(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || item.type === typeFilter
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeIcon = (type: Equipment['type']) => {
    switch (type) {
      case 'ventilator':
        return Wind
      case 'oxygen_unit':
        return Droplets
      case 'icu_bed':
        return Bed
      case 'monitor':
        return Monitor
      default:
        return Package
    }
  }

  const getTypeLabel = (type: Equipment['type']) => {
    switch (type) {
      case 'ventilator':
        return 'Ventilator'
      case 'oxygen_unit':
        return 'Oxygen Unit'
      case 'icu_bed':
        return 'ICU Bed'
      case 'monitor':
        return 'Patient Monitor'
    }
  }

  const getStatusBadge = (status: Equipment['status']) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-success text-success-foreground">Available</Badge>
      case 'in_use':
        return <Badge className="bg-primary text-primary-foreground">In Use</Badge>
      case 'maintenance':
        return <Badge className="bg-warning text-warning-foreground">Maintenance</Badge>
    }
  }

  const countByTypeAndStatus = (type: Equipment['type'], status: Equipment['status']) => {
    return equipment.filter((e) => e.type === type && e.status === status).length
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
            <p className="text-muted-foreground">Manage medical equipment and resources</p>
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
          <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">
            {equipment.length} equipment items tracked across all hospitals
          </p>
        </div>
        <Button>
          <Package className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      {/* Resource Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wind className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ventilators</p>
                <p className="text-xl font-bold">
                  {countByTypeAndStatus('ventilator', 'available')}/
                  {equipment.filter((e) => e.type === 'ventilator').length}
                </p>
                <p className="text-xs text-success">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Droplets className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Oxygen Units</p>
                <p className="text-xl font-bold">
                  {countByTypeAndStatus('oxygen_unit', 'available')}/
                  {equipment.filter((e) => e.type === 'oxygen_unit').length}
                </p>
                <p className="text-xs text-success">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Bed className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ICU Beds</p>
                <p className="text-xl font-bold">
                  {countByTypeAndStatus('icu_bed', 'available')}/
                  {equipment.filter((e) => e.type === 'icu_bed').length}
                </p>
                <p className="text-xs text-success">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                <Monitor className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monitors</p>
                <p className="text-xl font-bold">
                  {countByTypeAndStatus('monitor', 'available')}/
                  {equipment.filter((e) => e.type === 'monitor').length}
                </p>
                <p className="text-xs text-success">Available</p>
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
                placeholder="Search by equipment ID or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Equipment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ventilator">Ventilators</SelectItem>
                <SelectItem value="oxygen_unit">Oxygen Units</SelectItem>
                <SelectItem value="icu_bed">ICU Beds</SelectItem>
                <SelectItem value="monitor">Monitors</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="in_use">In Use</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Equipment Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Maintenance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipment.map((item) => {
                const TypeIcon = getTypeIcon(item.type)
                return (
                  <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <TypeIcon className="h-4 w-4 text-primary" />
                        </div>
                        <p className="font-medium">{item.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{getTypeLabel(item.type)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{item.hospitalName}</p>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.lastMaintenance).toLocaleDateString()}
                      </p>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          {filteredEquipment.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No equipment found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
