'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Navbar } from './navbar'
import { PageContainer } from './page-container'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Navbar sidebarCollapsed={sidebarCollapsed} />
      <PageContainer sidebarCollapsed={sidebarCollapsed}>{children}</PageContainer>
    </div>
  )
}
