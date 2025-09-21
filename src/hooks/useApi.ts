import { useState, useEffect, useCallback } from 'react'
import { apiClient, handleApiError } from '../lib/api'

export interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = [],
  useMockData: boolean = true
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        // For now, we'll use mock data
        // In production, you would call the actual API
        const result = await apiCall()
        setData(result)
      } else {
        const result = await apiCall()
        setData(result)
      }
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

// Specific hooks for different API endpoints
export function useProducts() {
  return useApi(
    () => apiClient.getProducts(),
    [],
    true // Use mock data for now
  )
}

export function useDashboardData(artisanId?: string) {
  return useApi(
    () => apiClient.getDashboardData(artisanId),
    [artisanId],
    true // Use mock data for now
  )
}

export function useSession(sessionId: string) {
  return useApi(
    () => apiClient.getSession(sessionId),
    [sessionId],
    true // Use mock data for now
  )
}

export function useTodayFact() {
  return useApi(
    () => apiClient.getTodayFact(),
    [],
    true // Use mock data for now
  )
}

// Hook for voice processing
export function useVoiceProcessing() {
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const processVoice = useCallback(async (_audioBlob: Blob) => {
    try {
      setProcessing(true)
      setError(null)
      setResult(null)

      // Simulate voice processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock result
      setResult("I'm looking for a handmade ceramic bowl for my kitchen")
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setProcessing(false)
    }
  }, [])

  return {
    processing,
    result,
    error,
    processVoice
  }
}

// Hook for session management
export function useSessionManagement() {
  const [sessions, setSessions] = useState<any[]>([])
  const [currentSession, setCurrentSession] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startSession = useCallback(async (text: string) => {
    try {
      setLoading(true)
      setError(null)

      // Simulate session start
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newSession = {
        id: `session_${Date.now()}`,
        status: 'active',
        createdAt: new Date().toISOString(),
        text,
        steps: []
      }

      setCurrentSession(newSession)
      setSessions(prev => [newSession, ...prev])
      
      return newSession
    } catch (err) {
      setError(handleApiError(err))
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSession = useCallback((sessionId: string, updates: any) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, ...updates }
          : session
      )
    )
    
    if (currentSession?.id === sessionId) {
      setCurrentSession((prev: any) => prev ? { ...prev, ...updates } : null)
    }
  }, [currentSession])

  return {
    sessions,
    currentSession,
    loading,
    error,
    startSession,
    updateSession
  }
}
