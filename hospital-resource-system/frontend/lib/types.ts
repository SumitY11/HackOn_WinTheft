export interface Hospital {
  id: string
  name: string
  location: {
    lat: number
    lng: number
    address: string
    city: string
    state: string
  }
  totalBeds: number
  availableBeds: number
  icuBeds: number
  icuAvailable: number
  ventilators: number
  ventilatorsAvailable: number
  oxygenUnits: number
  oxygenAvailable: number
  status: 'available' | 'moderate' | 'full'
  lastUpdated: string
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  condition: 'stable' | 'critical' | 'recovering'
  priority: 'low' | 'medium' | 'high' | 'emergency'
  admissionDate: string
  assignedBed: string | null
  hospitalId: string
  hospitalName: string
  diagnosis: string
}

export interface Equipment {
  id: string
  type: 'ventilator' | 'oxygen_unit' | 'icu_bed' | 'monitor'
  hospitalId: string
  hospitalName: string
  status: 'available' | 'in_use' | 'maintenance'
  lastMaintenance: string
}

export interface DashboardStats {
  totalHospitals: number
  totalPatients: number
  criticalCases: number
  icuBedsAvailable: number
  ventilatorsAvailable: number
  oxygenUnitsAvailable: number
  patientsBySeverity: {
    critical: number
    stable: number
    recovering: number
  }
  resourceUsage: {
    beds: { used: number; total: number }
    icu: { used: number; total: number }
    ventilators: { used: number; total: number }
    oxygen: { used: number; total: number }
  }
  predictedIcuShortage: {
    shortage: boolean
    estimatedTime: string
    severity: 'low' | 'medium' | 'high'
  }
}

export interface Alert {
  id: string
  type: 'warning' | 'critical' | 'info'
  title: string
  message: string
  hospitalId?: string
  hospitalName?: string
  timestamp: string
  acknowledged: boolean
}

export interface SocketEvent {
  type: 'patient_admitted' | 'bed_allocated' | 'equipment_used' | 'alert'
  data: Record<string, unknown>
  timestamp: string
}
