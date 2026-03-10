'use client'

import { createContext, useContext } from 'react'

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'patient' | 'staff'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  department?: string
  hospitalId?: string
  hospitalName?: string
  phone?: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock users for demo
export const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@healthtrack.gov': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      email: 'admin@healthtrack.gov',
      role: 'admin',
      department: 'Administration',
      phone: '+91 98765 43210',
      createdAt: '2024-01-15',
    },
  },
  'doctor@healthtrack.gov': {
    password: 'doctor123',
    user: {
      id: '2',
      name: 'Dr. Priya Sharma',
      email: 'doctor@healthtrack.gov',
      role: 'doctor',
      department: 'Cardiology',
      hospitalId: 'h1',
      hospitalName: 'AIIMS Delhi',
      phone: '+91 98765 43211',
      createdAt: '2024-02-20',
    },
  },
  'patient@example.com': {
    password: 'patient123',
    user: {
      id: '3',
      name: 'Amit Patel',
      email: 'patient@example.com',
      role: 'patient',
      hospitalId: 'h1',
      hospitalName: 'AIIMS Delhi',
      phone: '+91 98765 43212',
      createdAt: '2024-03-10',
    },
  },
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: 'System Administrator',
    doctor: 'Doctor',
    nurse: 'Nurse',
    patient: 'Patient',
    staff: 'Staff Member',
  }
  return labels[role]
}

export function getRolePermissions(role: UserRole): string[] {
  const permissions: Record<UserRole, string[]> = {
    admin: ['manage_users', 'view_all_data', 'manage_hospitals', 'manage_alerts', 'view_analytics', 'system_settings'],
    doctor: ['view_patients', 'manage_patients', 'view_resources', 'view_alerts'],
    nurse: ['view_patients', 'update_patient_status', 'view_resources'],
    patient: ['view_own_data', 'book_appointments'],
    staff: ['view_resources', 'update_resources', 'view_alerts'],
  }
  return permissions[role]
}
