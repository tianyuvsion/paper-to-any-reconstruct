import { apiClient } from './client'
import type { ResearchSite } from '@/types/site'
import type { PaperDetail, PaperSummary, UploadAccepted } from '@/types/papers'

export const papersApi = {
  list(): Promise<PaperSummary[]> {
    return apiClient.get('/api/v1/papers')
  },

  get(paperId: string): Promise<PaperDetail> {
    return apiClient.get(`/api/v1/papers/${encodeURIComponent(paperId)}`)
  },

  upload(file: File): Promise<UploadAccepted> {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient.post('/api/v1/papers', formData)
  },

  getSite(paperId: string): Promise<ResearchSite> {
    return apiClient.get(`/api/v1/papers/${encodeURIComponent(paperId)}/site`)
  },

  sourceUrl(paperId: string, page: number): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
    return `${baseUrl}/api/v1/papers/${encodeURIComponent(paperId)}/source#page=${page}`
  }
}
