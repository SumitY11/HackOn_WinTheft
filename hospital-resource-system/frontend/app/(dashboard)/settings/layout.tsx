'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, Shield, Bell, Palette, Building2, Users } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { PageContainer } from '@/components/layout/page-container'

const settingsNav = [
  { href: '/settings/account', label: 'My Account', icon: User, roles: ['admin', 'doctor', 'nurse', 'patient', 'staff'] },
  { href: '/settings/security', label: 'Security', icon: Shield, roles: ['admin', 'doctor', 'nurse', 'patient', 'staff'] },
  { href: '/settings/notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'doctor', 'nurse', 'patient', 'staff'] },
  { href: '/settings/appearance', label: 'Appearance', icon: Palette, roles: ['admin', 'doctor', 'nurse', 'patient', 'staff'] },
  { href: '/settings/admin', label: 'Admin Settings', icon: Building2, roles: ['admin'] },
  { href: '/settings/user-management', label: 'User Management', icon: Users, roles: ['admin'] },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()

  const filteredNav = settingsNav.filter((item) => 
    item.roles.includes(user?.role || 'patient')
  )

  return (
    <PageContainer title="Settings" description="Manage your account and preferences">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <nav className="lg:w-64 shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {filteredNav.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </PageContainer>
  )
}
