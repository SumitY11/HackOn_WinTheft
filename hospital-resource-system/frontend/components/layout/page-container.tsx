'use client'

import { cn } from '@/lib/utils'

interface PageContainerProps {
  children: React.ReactNode
  sidebarCollapsed: boolean
  className?: string
}

export function PageContainer({ children, sidebarCollapsed, className }: PageContainerProps) {
  return (
    <main
      className={cn(
        'min-h-screen pt-16 transition-all duration-300 bg-background',
        sidebarCollapsed ? 'pl-16' : 'pl-64',
        className
      )}
    >
      <div className="p-6">{children}</div>
    </main>
  )
}
