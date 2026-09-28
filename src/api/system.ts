import { apiClient } from './client'
import type { HealthCheckResponse } from '@/types/system'

export const systemApi = {
  getHealth(): Promise<HealthCheckResponse> {
    return apiClient.get('/api/v1/health')
  }
}
