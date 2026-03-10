'use client'

import { useEffect, useState } from 'react'
import { Users, Search, Filter, UserPlus } from 'lucide-react'
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
import { getPatients } from '@/lib/api'
import type { Patient } from '@/lib/types'

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [conditionFilter, setConditionFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPatients()
        setPatients(data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCondition = conditionFilter === 'all' || patient.condition === conditionFilter
    const matchesPriority = priorityFilter === 'all' || patient.priority === priorityFilter
    return matchesSearch && matchesCondition && matchesPriority
  })

  const getConditionBadge = (condition: Patient['condition']) => {
    switch (condition) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>
      case 'stable':
        return <Badge className="bg-primary text-primary-foreground">Stable</Badge>
      case 'recovering':
        return <Badge className="bg-success text-success-foreground">Recovering</Badge>
    }
  }

  const getPriorityBadge = (priority: Patient['priority']) => {
    switch (priority) {
      case 'emergency':
        return <Badge variant="destructive">Emergency</Badge>
      case 'high':
        return <Badge className="bg-critical/80 text-critical-foreground">High</Badge>
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>
      case 'low':
        return <Badge variant="outline">Low</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">Monitor patient status and assignments</p>
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
          <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
          <p className="text-muted-foreground">
            {patients.length} patients currently admitted
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Admit Patient
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Patients</p>
            <p className="text-2xl font-bold">{patients.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-critical/5 border-critical/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Critical</p>
            <p className="text-2xl font-bold text-critical">
              {patients.filter((p) => p.condition === 'critical').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Stable</p>
            <p className="text-2xl font-bold text-primary">
              {patients.filter((p) => p.condition === 'stable').length}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Recovering</p>
            <p className="text-2xl font-bold text-success">
              {patients.filter((p) => p.condition === 'recovering').length}
            </p>
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
                placeholder="Search patients by name, ID, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={conditionFilter} onValueChange={setConditionFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="recovering">Recovering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Assigned Bed</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Admission Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {patient.age}y, {patient.gender} | ID: {patient.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getConditionBadge(patient.condition)}</TableCell>
                  <TableCell>{getPriorityBadge(patient.priority)}</TableCell>
                  <TableCell>
                    <p className="text-sm">{patient.hospitalName}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.assignedBed || 'Pending'}</Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm max-w-[200px] truncate">{patient.diagnosis}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">
                      {new Date(patient.admissionDate).toLocaleDateString()}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No patients found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
