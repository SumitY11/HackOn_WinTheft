'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Sun, Moon, Monitor, Check, Type, Layout } from 'lucide-react'

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [sidebarCompact, setSidebarCompact] = useState(false)

  const themes = [
    { id: 'light', label: 'Light', icon: Sun, description: 'Light background with dark text' },
    { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark background with light text' },
    { id: 'system', label: 'System', icon: Monitor, description: 'Follows your system preference' },
  ] as const

  const fontSizes = [
    { id: 'small', label: 'Small', size: '14px' },
    { id: 'medium', label: 'Medium', size: '16px' },
    { id: 'large', label: 'Large', size: '18px' },
  ] as const

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Select your preferred color theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {themes.map((t) => {
              const Icon = t.icon
              const isSelected = theme === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    'relative flex flex-col items-center gap-3 p-4 border rounded-lg transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 p-1 bg-primary rounded-full">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'p-3 rounded-lg',
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Font Size
          </CardTitle>
          <CardDescription>Adjust the text size across the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {fontSizes.map((f) => {
              const isSelected = fontSize === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setFontSize(f.id)}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-2 p-4 border rounded-lg transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  )}
                >
                  <span style={{ fontSize: f.size }} className="font-medium">
                    Aa
                  </span>
                  <span className="text-sm">{f.label}</span>
                  <span className="text-xs text-muted-foreground">{f.size}</span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Layout Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Layout
          </CardTitle>
          <CardDescription>Customize the dashboard layout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Compact Sidebar</p>
              <p className="text-sm text-muted-foreground">
                Use a narrower sidebar to maximize content space
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSidebarCompact(false)}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg border transition-colors',
                  !sidebarCompact
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary/50'
                )}
              >
                Default
              </button>
              <button
                onClick={() => setSidebarCompact(true)}
                className={cn(
                  'px-4 py-2 text-sm rounded-lg border transition-colors',
                  sidebarCompact
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary/50'
                )}
              >
                Compact
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
