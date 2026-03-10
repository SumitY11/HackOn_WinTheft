import type { Hospital, Patient, Equipment, DashboardStats, Alert } from './types'

// Mock data for demonstration - in production, these would be API calls
const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'AIIMS Delhi',
    location: { lat: 28.5672, lng: 77.2100, address: 'Ansari Nagar East', city: 'New Delhi', state: 'Delhi' },
    totalBeds: 2500, availableBeds: 342, icuBeds: 200, icuAvailable: 28,
    ventilators: 150, ventilatorsAvailable: 23, oxygenUnits: 500, oxygenAvailable: 180,
    status: 'available', lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Safdarjung Hospital',
    location: { lat: 28.5686, lng: 77.2066, address: 'Ring Road', city: 'New Delhi', state: 'Delhi' },
    totalBeds: 1800, availableBeds: 120, icuBeds: 100, icuAvailable: 8,
    ventilators: 80, ventilatorsAvailable: 5, oxygenUnits: 300, oxygenAvailable: 45,
    status: 'moderate', lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Sir Ganga Ram Hospital',
    location: { lat: 28.6395, lng: 77.1908, address: 'Rajinder Nagar', city: 'New Delhi', state: 'Delhi' },
    totalBeds: 675, availableBeds: 0, icuBeds: 50, icuAvailable: 0,
    ventilators: 40, ventilatorsAvailable: 0, oxygenUnits: 150, oxygenAvailable: 12,
    status: 'full', lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Fortis Hospital',
    location: { lat: 28.4595, lng: 77.0266, address: 'Sector 62', city: 'Gurugram', state: 'Haryana' },
    totalBeds: 450, availableBeds: 85, icuBeds: 60, icuAvailable: 12,
    ventilators: 45, ventilatorsAvailable: 8, oxygenUnits: 200, oxygenAvailable: 65,
    status: 'available', lastUpdated: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Max Super Speciality Hospital',
    location: { lat: 28.5355, lng: 77.2020, address: 'Saket', city: 'New Delhi', state: 'Delhi' },
    totalBeds: 520, availableBeds: 42, icuBeds: 70, icuAvailable: 4,
    ventilators: 55, ventilatorsAvailable: 3, oxygenUnits: 180, oxygenAvailable: 28,
    status: 'moderate', lastUpdated: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Apollo Hospital',
    location: { lat: 28.5245, lng: 77.2800, address: 'Jasola', city: 'New Delhi', state: 'Delhi' },
    totalBeds: 710, availableBeds: 156, icuBeds: 90, icuAvailable: 18,
    ventilators: 70, ventilatorsAvailable: 15, oxygenUnits: 250, oxygenAvailable: 95,
    status: 'available', lastUpdated: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Medanta The Medicity',
    location: { lat: 28.4180, lng: 77.0431, address: 'Sector 38', city: 'Gurugram', state: 'Haryana' },
    totalBeds: 1250, availableBeds: 210, icuBeds: 150, icuAvailable: 22,
    ventilators: 100, ventilatorsAvailable: 18, oxygenUnits: 400, oxygenAvailable: 140,
    status: 'available', lastUpdated: new Date().toISOString()
  },
  {
    id: '8',
    name: 'BLK Super Speciality Hospital',
    location: { lat: 28.6519, lng: 77.1859, address: 'Pusa Road', city: 'New Delhi', state: 'Delhi' },
    totalBeds: 650, availableBeds: 78, icuBeds: 80, icuAvailable: 6,
    ventilators: 60, ventilatorsAvailable: 4, oxygenUnits: 220, oxygenAvailable: 35,
    status: 'moderate', lastUpdated: new Date().toISOString()
  },
]

const mockPatients: Patient[] = [
  { id: 'P001', name: 'Rajesh Kumar', age: 45, gender: 'male', condition: 'critical', priority: 'emergency', admissionDate: '2026-03-08', assignedBed: 'ICU-12', hospitalId: '1', hospitalName: 'AIIMS Delhi', diagnosis: 'Acute Respiratory Distress' },
  { id: 'P002', name: 'Priya Sharma', age: 32, gender: 'female', condition: 'stable', priority: 'medium', admissionDate: '2026-03-07', assignedBed: 'GW-45', hospitalId: '1', hospitalName: 'AIIMS Delhi', diagnosis: 'Post-operative Care' },
  { id: 'P003', name: 'Amit Singh', age: 58, gender: 'male', condition: 'critical', priority: 'high', admissionDate: '2026-03-09', assignedBed: 'ICU-08', hospitalId: '2', hospitalName: 'Safdarjung Hospital', diagnosis: 'Cardiac Arrest Recovery' },
  { id: 'P004', name: 'Sunita Devi', age: 67, gender: 'female', condition: 'recovering', priority: 'low', admissionDate: '2026-03-05', assignedBed: 'GW-23', hospitalId: '4', hospitalName: 'Fortis Hospital', diagnosis: 'Hip Replacement Recovery' },
  { id: 'P005', name: 'Mohammed Ali', age: 41, gender: 'male', condition: 'stable', priority: 'medium', admissionDate: '2026-03-08', assignedBed: 'GW-67', hospitalId: '6', hospitalName: 'Apollo Hospital', diagnosis: 'Appendectomy' },
  { id: 'P006', name: 'Lakshmi Narayan', age: 72, gender: 'female', condition: 'critical', priority: 'emergency', admissionDate: '2026-03-09', assignedBed: 'ICU-03', hospitalId: '5', hospitalName: 'Max Super Speciality Hospital', diagnosis: 'Stroke' },
  { id: 'P007', name: 'Vikram Patel', age: 29, gender: 'male', condition: 'recovering', priority: 'low', admissionDate: '2026-03-06', assignedBed: 'GW-12', hospitalId: '7', hospitalName: 'Medanta The Medicity', diagnosis: 'Fracture - Left Leg' },
  { id: 'P008', name: 'Ananya Reddy', age: 35, gender: 'female', condition: 'stable', priority: 'medium', admissionDate: '2026-03-08', assignedBed: 'GW-89', hospitalId: '8', hospitalName: 'BLK Super Speciality Hospital', diagnosis: 'Pneumonia' },
]

const mockEquipment: Equipment[] = [
  { id: 'E001', type: 'ventilator', hospitalId: '1', hospitalName: 'AIIMS Delhi', status: 'in_use', lastMaintenance: '2026-02-15' },
  { id: 'E002', type: 'ventilator', hospitalId: '1', hospitalName: 'AIIMS Delhi', status: 'available', lastMaintenance: '2026-02-20' },
  { id: 'E003', type: 'oxygen_unit', hospitalId: '1', hospitalName: 'AIIMS Delhi', status: 'in_use', lastMaintenance: '2026-02-18' },
  { id: 'E004', type: 'icu_bed', hospitalId: '2', hospitalName: 'Safdarjung Hospital', status: 'in_use', lastMaintenance: '2026-02-10' },
  { id: 'E005', type: 'monitor', hospitalId: '2', hospitalName: 'Safdarjung Hospital', status: 'maintenance', lastMaintenance: '2026-03-01' },
  { id: 'E006', type: 'ventilator', hospitalId: '3', hospitalName: 'Sir Ganga Ram Hospital', status: 'in_use', lastMaintenance: '2026-02-25' },
  { id: 'E007', type: 'oxygen_unit', hospitalId: '4', hospitalName: 'Fortis Hospital', status: 'available', lastMaintenance: '2026-02-28' },
  { id: 'E008', type: 'ventilator', hospitalId: '5', hospitalName: 'Max Super Speciality Hospital', status: 'in_use', lastMaintenance: '2026-02-22' },
  { id: 'E009', type: 'icu_bed', hospitalId: '6', hospitalName: 'Apollo Hospital', status: 'available', lastMaintenance: '2026-02-14' },
  { id: 'E010', type: 'monitor', hospitalId: '7', hospitalName: 'Medanta The Medicity', status: 'in_use', lastMaintenance: '2026-02-19' },
]

const mockAlerts: Alert[] = [
  { id: 'A001', type: 'critical', title: 'ICU Capacity Critical', message: 'Sir Ganga Ram Hospital has reached 100% ICU capacity', hospitalId: '3', hospitalName: 'Sir Ganga Ram Hospital', timestamp: new Date(Date.now() - 300000).toISOString(), acknowledged: false },
  { id: 'A002', type: 'warning', title: 'Ventilator Shortage Predicted', message: 'Safdarjung Hospital may face ventilator shortage in next 3 hours', hospitalId: '2', hospitalName: 'Safdarjung Hospital', timestamp: new Date(Date.now() - 600000).toISOString(), acknowledged: false },
  { id: 'A003', type: 'warning', title: 'Critical Patient Surge', message: 'Multiple critical patients admitted in last hour across NCR region', timestamp: new Date(Date.now() - 900000).toISOString(), acknowledged: true },
  { id: 'A004', type: 'info', title: 'Resource Replenishment', message: 'Oxygen supply restocked at Apollo Hospital', hospitalId: '6', hospitalName: 'Apollo Hospital', timestamp: new Date(Date.now() - 1800000).toISOString(), acknowledged: true },
  { id: 'A005', type: 'critical', title: 'Emergency Response Activated', message: 'Mass casualty incident reported - diverting resources', timestamp: new Date(Date.now() - 120000).toISOString(), acknowledged: false },
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(300)
  
  const totalBeds = mockHospitals.reduce((sum, h) => sum + h.totalBeds, 0)
  const availableBeds = mockHospitals.reduce((sum, h) => sum + h.availableBeds, 0)
  const totalIcu = mockHospitals.reduce((sum, h) => sum + h.icuBeds, 0)
  const availableIcu = mockHospitals.reduce((sum, h) => sum + h.icuAvailable, 0)
  const totalVentilators = mockHospitals.reduce((sum, h) => sum + h.ventilators, 0)
  const availableVentilators = mockHospitals.reduce((sum, h) => sum + h.ventilatorsAvailable, 0)
  const totalOxygen = mockHospitals.reduce((sum, h) => sum + h.oxygenUnits, 0)
  const availableOxygen = mockHospitals.reduce((sum, h) => sum + h.oxygenAvailable, 0)
  
  return {
    totalHospitals: mockHospitals.length,
    totalPatients: mockPatients.length,
    criticalCases: mockPatients.filter(p => p.condition === 'critical').length,
    icuBedsAvailable: availableIcu,
    ventilatorsAvailable: availableVentilators,
    oxygenUnitsAvailable: availableOxygen,
    patientsBySeverity: {
      critical: mockPatients.filter(p => p.condition === 'critical').length,
      stable: mockPatients.filter(p => p.condition === 'stable').length,
      recovering: mockPatients.filter(p => p.condition === 'recovering').length,
    },
    resourceUsage: {
      beds: { used: totalBeds - availableBeds, total: totalBeds },
      icu: { used: totalIcu - availableIcu, total: totalIcu },
      ventilators: { used: totalVentilators - availableVentilators, total: totalVentilators },
      oxygen: { used: totalOxygen - availableOxygen, total: totalOxygen },
    },
    predictedIcuShortage: {
      shortage: true,
      estimatedTime: '2-3 hours',
      severity: 'medium',
    },
  }
}

export async function getHospitalMapData(): Promise<Hospital[]> {
  await delay(200)
  return mockHospitals
}

export async function getHospitals(): Promise<Hospital[]> {
  await delay(300)
  return mockHospitals
}

export async function getPatients(): Promise<Patient[]> {
  await delay(300)
  return mockPatients
}

export async function getEquipment(): Promise<Equipment[]> {
  await delay(300)
  return mockEquipment
}

export async function getAlerts(): Promise<Alert[]> {
  await delay(200)
  return mockAlerts
}

export async function acknowledgeAlert(alertId: string): Promise<void> {
  await delay(100)
  const alert = mockAlerts.find(a => a.id === alertId)
  if (alert) {
    alert.acknowledged = true
  }
}
