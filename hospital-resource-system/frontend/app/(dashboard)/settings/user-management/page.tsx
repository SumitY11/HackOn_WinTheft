'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, Plus, MoreHorizontal, Mail, Shield, UserX, Edit } from 'lucide-react'
import { getRoleLabel, type UserRole } from '@/lib/auth'

interface UserData {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  hospital?: string
}

const mockUsers: UserData[] = [
  { id: '1', name: 'Dr. Rajesh Kumar', email: 'admin@healthtrack.gov', role: 'admin', status: 'active', lastLogin: '2 hours ago' },
  { id: '2', name: 'Dr. Priya Sharma', email: 'doctor@healthtrack.gov', role: 'doctor', status: 'active', lastLogin: '1 day ago', hospital: 'AIIMS Delhi' },
  { id: '3', name: 'Nurse Sunita Verma', email: 'nurse@aiims.in', role: 'nurse', status: 'active', lastLogin: '5 hours ago', hospital: 'AIIMS Delhi' },
  { id: '4', name: 'Amit Patel', email: 'patient@example.com', role: 'patient', status: 'active', lastLogin: '3 days ago', hospital: 'AIIMS Delhi' },
  { id: '5', name: 'Rahul Singh', email: 'staff@gangaram.org', role: 'staff', status: 'inactive', lastLogin: '1 week ago', hospital: 'Sir Ganga Ram Hospital' },
  { id: '6', name: 'Dr. Meera Joshi', email: 'meera.joshi@safdarjung.gov', role: 'doctor', status: 'pending', lastLogin: 'Never', hospital: 'Safdarjung Hospital' },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-success text-success-foreground'
    case 'inactive':
      return 'bg-muted text-muted-foreground'
    case 'pending':
      return 'bg-warning text-warning-foreground'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

function getRoleColor(role: UserRole) {
  switch (role) {
    case 'admin':
      return 'bg-primary text-primary-foreground'
    case 'doctor':
      return 'bg-accent text-accent-foreground'
    case 'nurse':
      return 'bg-chart-2 text-card'
    case 'patient':
      return 'bg-chart-3 text-card'
    case 'staff':
      return 'bg-muted text-muted-foreground'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{mockUsers.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{mockUsers.filter((u) => u.status === 'active').length}</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{mockUsers.filter((u) => u.role === 'doctor').length}</p>
            <p className="text-sm text-muted-foreground">Doctors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-2xl font-bold">{mockUsers.filter((u) => u.status === 'pending').length}</p>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
          </CardContent>
        </Card>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and their permissions</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'admin', 'doctor', 'nurse', 'patient', 'staff'] as const).map((role) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter(role)}
                >
                  {role === 'all' ? 'All' : getRoleLabel(role)}
                </Button>
              ))}
            </div>
          </div>

          {/* User Table */}
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">User</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Role</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Hospital</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Status</th>
                  <th className="text-left p-4 font-medium hidden xl:table-cell">Last Login</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const initials = user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()

                  return (
                    <tr key={user.id} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <Badge className={getRoleColor(user.role)}>{getRoleLabel(user.role)}</Badge>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-sm">{user.hospital || '-'}</span>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <Badge className={getStatusColor(user.status)} variant="secondary">
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 hidden xl:table-cell">
                        <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
