export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error'
  service: string
  version: string
  contract: string
  authentication: 'required' | 'development_open' | 'development'
  browser_invite_login: boolean
  shared_workspace: boolean
  storage_backend: string
  job_execution: string
  worker_status?: string | null
  worker_last_seen_seconds?: number | null
}
