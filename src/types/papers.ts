export type PaperProcessingStatus =
  | 'uploaded'
  | 'extracting'
  | 'extracted'
  | 'compiling'
  | 'ready'
  | 'failed'

export interface PaperSummary {
  id: string
  slug: string
  original_filename: string
  sha256: string
  status: PaperProcessingStatus
  title: string | null
  authors: string[]
  page_count: number | null
  character_count: number | null
  extraction_method: 'embedded_text' | 'ocr' | 'hybrid' | null
  error_code: string | null
  error_message: string | null
  archived_at: string | null
  created_at: string
  updated_at: string
}

export interface PaperDetail extends PaperSummary {
  pages: {
    page: number
    text: string
    sha256: string
  }[]
  site_version: number | null
}

export interface UploadAccepted {
  paper: PaperSummary
  deduplicated: boolean
}
