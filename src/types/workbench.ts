export type ReadingMode = 'public' | 'researcher' | 'enterprise'
export type ResultVersion = 'v1' | 'v2' | 'source'
export type StageTab = 'chat' | 'reading' | 'notes'
export type SourceViewMode = 'pdf' | 'text'

export interface PaperMeta {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number | string
  doi: string
  status: 'ready' | 'processing' | 'uploaded'
  pageCount: number
}

export interface ScoreItem {
  id: string
  label: string
  score: number
  maxScore: number
  reasoning?: string
  pageAnchor?: number
}

export interface AcademicCard {
  id: string
  name: string
  kind: string
  tone: 'lilac' | 'orange' | 'violet' | 'coral' | 'lime' | 'pink' | 'cyan'
  title: string
  summary: string
  keyFinding?: string
  confidence?: number
  pageAnchor?: number
  quote?: string
  evidenceTags?: string[]
}

export interface ContextRef {
  id: string
  text: string
  page: number
  quoteSnippet: string
}

export interface ChatTurn {
  id: string
  sender: 'user' | 'assistant'
  timestamp: string
  content: string
  evidenceQuotes?: {
    page: number
    text: string
  }[]
}

export interface NoteEntry {
  id: string
  title: string
  content: string
  updatedAt: string
}
