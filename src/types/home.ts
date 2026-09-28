export type GalleryFilterType = 'all' | 'card' | 'media'

export interface GalleryCard {
  id: string
  type: 'card' | 'media'
  tone: 'lilac' | 'orange' | 'dark' | 'lime' | 'pink' | 'cyan'
  kicker: string
  title: string
  subtitle: string
  badge?: string
  mediaKind?: 'audio' | 'video' | 'poster' | 'formula' | 'orbit' | 'paper'
  detailUrl?: string
  sourcePage?: number
  questionSuggestion?: string
}

export interface StarterQuestion {
  id: string
  text: string
  hint?: string
}

export interface FormatEntry {
  id: string
  title: string
  description: string
  icon: string
  previewId: string
}

export interface GuideStep {
  num: string
  title: string
  desc: string
}

export interface GuideChapter {
  id: string
  num: string
  anchor: string
  title: string
  subtitle: string
  badge: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}
