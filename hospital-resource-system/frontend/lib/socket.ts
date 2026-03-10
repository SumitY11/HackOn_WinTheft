'use client'

import { useEffect, useCallback, useRef } from 'react'
import type { SocketEvent } from './types'

type EventHandler = (event: SocketEvent) => void

// Simulated socket connection for demonstration
// In production, this would connect to a real Socket.IO server
class MockSocketConnection {
  private handlers: Map<string, Set<EventHandler>> = new Map()
  private intervalId: NodeJS.Timeout | null = null
  private isConnected = false

  connect() {
    if (this.isConnected) return
    this.isConnected = true
    
    // Simulate periodic real-time updates
    this.intervalId = setInterval(() => {
      this.emitRandomEvent()
    }, 15000) // Every 15 seconds
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.isConnected = false
  }

  on(event: string, handler: EventHandler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler)
  }

  off(event: string, handler: EventHandler) {
    this.handlers.get(event)?.delete(handler)
  }

  private emitRandomEvent() {
    const eventTypes: SocketEvent['type'][] = [
      'patient_admitted',
      'bed_allocated',
      'equipment_used',
      'alert'
    ]
    
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    
    const event: SocketEvent = {
      type: randomType,
      timestamp: new Date().toISOString(),
      data: this.generateEventData(randomType)
    }

    this.handlers.get('update')?.forEach(handler => handler(event))
    this.handlers.get(randomType)?.forEach(handler => handler(event))
  }

  private generateEventData(type: SocketEvent['type']): Record<string, unknown> {
    switch (type) {
      case 'patient_admitted':
        return {
          patientId: `P${Math.floor(Math.random() * 1000)}`,
          hospitalId: String(Math.floor(Math.random() * 8) + 1),
          severity: ['stable', 'critical', 'recovering'][Math.floor(Math.random() * 3)]
        }
      case 'bed_allocated':
        return {
          bedId: `BED-${Math.floor(Math.random() * 100)}`,
          hospitalId: String(Math.floor(Math.random() * 8) + 1),
          bedType: ['general', 'icu'][Math.floor(Math.random() * 2)]
        }
      case 'equipment_used':
        return {
          equipmentId: `E${Math.floor(Math.random() * 100)}`,
          type: ['ventilator', 'oxygen_unit', 'monitor'][Math.floor(Math.random() * 3)],
          hospitalId: String(Math.floor(Math.random() * 8) + 1)
        }
      case 'alert':
        return {
          alertId: `A${Math.floor(Math.random() * 100)}`,
          type: ['warning', 'critical', 'info'][Math.floor(Math.random() * 3)],
          message: 'New system alert generated'
        }
      default:
        return {}
    }
  }
}

// Singleton instance
let socketInstance: MockSocketConnection | null = null

function getSocket(): MockSocketConnection {
  if (!socketInstance) {
    socketInstance = new MockSocketConnection()
  }
  return socketInstance
}

export function useSocket(onEvent?: EventHandler) {
  const handlerRef = useRef(onEvent)
  handlerRef.current = onEvent

  useEffect(() => {
    const socket = getSocket()
    socket.connect()

    const handler: EventHandler = (event) => {
      handlerRef.current?.(event)
    }

    if (onEvent) {
      socket.on('update', handler)
    }

    return () => {
      if (onEvent) {
        socket.off('update', handler)
      }
    }
  }, [onEvent])

  const emit = useCallback((event: string, data: unknown) => {
    console.log('[Socket] Emitting:', event, data)
  }, [])

  return { emit }
}

export function useSocketEvent(eventType: SocketEvent['type'], handler: EventHandler) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const socket = getSocket()
    socket.connect()

    const wrappedHandler: EventHandler = (event) => {
      handlerRef.current(event)
    }

    socket.on(eventType, wrappedHandler)

    return () => {
      socket.off(eventType, wrappedHandler)
    }
  }, [eventType])
}
