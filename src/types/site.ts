import type { ReadingMode } from '@/types/workbench'

export interface SiteEvidence {
  page: number
  quote: string
  source: 'pdf_text'
}

export interface SiteCard {
  id: string
  type: string
  size: 'small' | 'medium' | 'large'
  eyebrow: string
  title: string
  summary: string
  evidence: SiteEvidence[]
  data: Record<string, unknown>
}

export interface SiteMode {
  id: ReadingMode
  label: string
  judgement: string
  status: 'provisional' | 'verified'
  score_keys: string[]
  cards: SiteCard[]
}

export interface ResearchSite {
  schema_version: string
  site_id: string
  site_version: number
  generated_at: string
  generator: {
    kind: 'extractive_preview' | 'llm_evidence_compiler'
    version: string
    model?: string | null
  }
  paper: {
    id: string
    title: string
    sha256: string
  }
  evaluation: {
    status: 'not_scored' | 'provisional' | 'verified_ai_assessment'
    judgement?: string | null
  }
  modes: Record<ReadingMode, SiteMode>
}
