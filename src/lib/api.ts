// API integration utilities for Artelio frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export interface Product {
  id: string
  title: string
  price: number
  image: string
  artisan: string
  category: string
  description?: string
  rating?: number
  inStock?: boolean
}

export interface Session {
  id: string
  status: 'active' | 'completed' | 'failed'
  createdAt: string
  updatedAt: string
  steps: WorkflowStep[]
}

export interface WorkflowStep {
  id: string
  agent: string
  status: 'pending' | 'active' | 'completed' | 'error'
  timestamp: string
  details: string
  duration?: number
}

export interface DashboardData {
  products: number
  sessionsCompleted: number
  factsGenerated: number
  revenue: number
  activeUsers: number
  aiUsage: {
    voiceAgent: number
    marketingAgent: number
    learningAgent: number
    inventoryAgent: number
  }
}

export interface Fact {
  id: string
  fact: string
  date: string
  category: string
}

// API Client class
class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Products API
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/api/products')
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/api/products/${id}`)
  }

  // Sessions API
  async startSession(text: string): Promise<Session> {
    return this.request<Session>('/api/session/start', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
  }

  async getSession(id: string): Promise<Session> {
    return this.request<Session>(`/api/session/${id}`)
  }

  async getSessionProgress(id: string): Promise<WorkflowStep[]> {
    return this.request<WorkflowStep[]>(`/api/session/${id}/progress`)
  }

  // Dashboard API
  async getDashboardData(artisanId?: string): Promise<DashboardData> {
    const endpoint = artisanId ? `/api/dashboard/${artisanId}` : '/api/dashboard'
    return this.request<DashboardData>(endpoint)
  }

  // Facts API
  async getTodayFact(): Promise<Fact> {
    return this.request<Fact>('/api/fact/today')
  }

  async generateFact(): Promise<Fact> {
    return this.request<Fact>('/api/fact/generate', {
      method: 'POST',
    })
  }

  // Voice API
  async processVoiceInput(audioBlob: Blob): Promise<{ text: string }> {
    const formData = new FormData()
    formData.append('audio', audioBlob)

    return this.request<{ text: string }>('/api/voice/process', {
      method: 'POST',
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
      body: formData,
    })
  }
}

// Create and export API client instance
export const apiClient = new ApiClient()

// Mock data for development
export const mockData = {
  products: [
    {
      id: 'p1',
      title: 'Handmade Scarf',
      price: 20,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=400&fit=crop',
      artisan: 'Priya Sharma',
      category: 'Textiles',
      rating: 4.8,
      inStock: true
    },
    {
      id: 'p2',
      title: 'Painted Pot',
      price: 15,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      artisan: 'Rajesh Kumar',
      category: 'Pottery',
      rating: 4.9,
      inStock: true
    }
  ] as Product[],

  dashboardData: {
    products: 5,
    sessionsCompleted: 12,
    factsGenerated: 3,
    revenue: 24500,
    activeUsers: 1234,
    aiUsage: {
      voiceAgent: 35,
      marketingAgent: 25,
      learningAgent: 20,
      inventoryAgent: 20
    }
  } as DashboardData,

  facts: [
    {
      id: 'f1',
      fact: 'Did you know that traditional Indian block printing techniques date back over 4,000 years?',
      date: '2024-01-15',
      category: 'History'
    }
  ] as Fact[]
}

// Utility functions for handling API responses
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export const isApiError = (error: unknown): error is Error => {
  return error instanceof Error
}
