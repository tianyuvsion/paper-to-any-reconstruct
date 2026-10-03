export type ReadingMode = 'public' | 'researcher' | 'enterprise'
export type ResultVersion = 'v1' | 'v2' | 'source'
export type StageTab = 'chat' | 'reading' | 'notes'
export type SourceViewMode = 'pdf' | 'text'
export type SidebarNav = 'library' | 'chat' | 'history' | 'outputs' | 'tasks' | 'settings' | 'import'

export interface PaperMeta {
  id: string
  title: string
  authors: string[]
  originalFilename: string
  status: 'uploaded' | 'extracting' | 'extracted' | 'compiling' | 'ready' | 'failed'
  pageCount: number
  errorMessage?: string | null
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
  evidence: {
    page: number
    quote: string
    source: 'pdf_text'
  }[]
  data: Record<string, unknown>
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
