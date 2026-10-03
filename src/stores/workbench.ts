import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type {
  AcademicCard,
  ChatTurn,
  PaperMeta,
  ReadingMode,
  ResultVersion,
  ScoreItem,
  SidebarNav,
  StageTab
} from '@/types/workbench'
import type { ResearchSite, SiteCard } from '@/types/site'
import type { PaperDetail, PaperSummary } from '@/types/papers'
import { papersApi } from '@/api/papers'

export const useWorkbenchStore = defineStore('workbench', () => {
  // 当前研读论文
  const currentPaper = ref<PaperMeta>({
    id: '',
    title: '尚未选择论文',
    authors: [],
    originalFilename: '',
    status: 'uploaded',
    pageCount: 0
  })
  const papers = ref<PaperSummary[]>([])
  const paperPages = ref<PaperDetail['pages']>([])
  const libraryLoading = ref(false)
  const uploadLoading = ref(false)
  const libraryError = ref('')

  // 模式与版本
  const currentMode = ref<ReadingMode>('public')
  const currentVersion = ref<ResultVersion>('v2')

  // 左侧栏当前选中导航 ('library' | 'chat' | 'history' | 'outputs' | 'tasks' | 'settings' | 'import')
  const activeSidebarNav = ref<SidebarNav>('library')

  // 主舞台当前 Tab ('chat' | 'reading' | 'notes')
  const activeTab = ref<StageTab>('reading')

  // 三栏显隐控制
  const isRailOpen = ref(true)
  const isDockOpen = ref(true)

  // 原文阅读器状态
  const currentPage = ref(1)
  const currentZoom = ref(1.0)
  const viewMode = ref<'pdf' | 'text'>('text')
  const highlightAnchor = ref<string | null>(null)

  // 选区上下文引用暂存
  const selectedQuote = ref<{
    page: number
    text: string
  } | null>(null)

  // 16 维评分数据 (EAST 论文示例)
  const scoreItems = ref<ScoreItem[]>([
    { id: 'overall', label: '总体评级', score: 8.8, maxScore: 10, reasoning: '实现了超过 1000 秒长脉冲稳态等离子体运行，是托卡马克物理领域的里程碑突破。' },
    { id: 'significance', label: '重要性', score: 9.4, maxScore: 10, reasoning: '为国际热核聚变实验堆 (ITER) 的长脉冲运行模式提供了极关键的物理基石。' },
    { id: 'rigor', label: '实验严谨性', score: 9.0, maxScore: 10, reasoning: '采用了多套先进的微波反射仪、电荷交换复合光谱仪等高精度诊断设备。' },
    { id: 'novelty', label: '新颖性', score: 8.6, maxScore: 10, reasoning: '首次在金属壁条件下实现全超导托卡马克千秒长脉冲高约束。' },
    { id: 'reproducibility', label: '可复现性', score: 8.2, maxScore: 10, reasoning: '放电编号 #106915 参数完整，具备明确的等离子体位形控制规范。' },
    { id: 'limitations', label: '适用边界', score: 7.6, maxScore: 10, reasoning: '实验为纯氘长脉冲运行，尚未验证氘氚聚变燃烧与净能量增益条件。' }
  ])

  // 卡片数据来自后端保存的 ResearchSite；没有连入真实论文时不展示演示卡片。
  const researchSite = ref<ResearchSite | null>(null)
  const siteLoading = ref(false)
  const siteError = ref('')
  let siteRequestId = 0
  let paperRequestId = 0

  const academicCards = computed<AcademicCard[]>(() => {
    const cards = researchSite.value?.modes[currentMode.value]?.cards ?? []
    return cards.map(toAcademicCard)
  })

  function toAcademicCard(card: SiteCard): AcademicCard {
    const firstEvidence = card.evidence[0]

    return {
      id: card.id,
      name: card.eyebrow || card.type,
      kind: card.type,
      tone: toneForCard(card.type),
      title: card.title,
      summary: card.summary,
      pageAnchor: firstEvidence?.page,
      quote: firstEvidence?.quote,
      evidence: card.evidence,
      data: card.data
    }
  }

  function toneForCard(type: string): AcademicCard['tone'] {
    const tones: Record<string, AcademicCard['tone']> = {
      researchConclusion: 'lime',
      researcherBridge: 'lime',
      method: 'pink',
      results: 'violet',
      limits: 'orange',
      figure: 'cyan',
      references: 'lilac',
      risk: 'orange',
      conditions: 'coral'
    }

    return tones[type] ?? 'lilac'
  }

  async function loadResearchSite(paperId: string) {
    const requestId = ++siteRequestId
    siteLoading.value = true
    siteError.value = ''

    try {
      const site = await papersApi.getSite(paperId)
      if (requestId !== siteRequestId) return

      researchSite.value = site
    } catch (error) {
      if (requestId !== siteRequestId) return

      researchSite.value = null
      siteError.value = error instanceof Error ? error.message : '读取论文卡片失败'
    } finally {
      if (requestId === siteRequestId) {
        siteLoading.value = false
      }
    }
  }

  function updateCurrentPaper(paper: PaperSummary) {
    currentPaper.value = {
      id: paper.id,
      title: paper.title || paper.original_filename,
      authors: paper.authors,
      originalFilename: paper.original_filename,
      status: paper.status,
      pageCount: paper.page_count ?? 0,
      errorMessage: paper.error_message
    }
  }

  async function refreshLibrary() {
    libraryLoading.value = true
    libraryError.value = ''

    try {
      papers.value = await papersApi.list()
    } catch (error) {
      libraryError.value = error instanceof Error ? error.message : '读取论文列表失败'
    } finally {
      libraryLoading.value = false
    }
  }

  async function selectPaper(paperId: string) {
    const requestId = ++paperRequestId
    siteRequestId += 1
    researchSite.value = null
    siteLoading.value = false
    paperPages.value = []
    siteError.value = ''
    highlightAnchor.value = null
    currentPage.value = 1

    try {
      const paper = await papersApi.get(paperId)
      if (requestId !== paperRequestId) return

      updateCurrentPaper(paper)
      paperPages.value = paper.pages
      currentPage.value = Math.min(Math.max(currentPage.value, 1), Math.max(paper.page_count ?? 1, 1))

      if (paper.status === 'ready' && paper.site_version) {
        await loadResearchSite(paper.id)
      }
    } catch (error) {
      if (requestId !== paperRequestId) return
      libraryError.value = error instanceof Error ? error.message : '读取论文失败'
    }
  }

  async function uploadPaper(file: File) {
    uploadLoading.value = true
    libraryError.value = ''

    try {
      const accepted = await papersApi.upload(file)
      await refreshLibrary()
      await selectPaper(accepted.paper.id)
      return accepted
    } catch (error) {
      libraryError.value = error instanceof Error ? error.message : '上传 PDF 失败'
      throw error
    } finally {
      uploadLoading.value = false
    }
  }

  async function initializeLibrary(preferredPaperId?: string) {
    await refreshLibrary()
    const preferred = preferredPaperId && papers.value.some((paper) => paper.id === preferredPaperId)
      ? preferredPaperId
      : papers.value[0]?.id

    if (preferred) {
      await selectPaper(preferred)
    }
  }

  async function refreshCurrentPaper() {
    if (!currentPaper.value.id) return
    await selectPaper(currentPaper.value.id)
    await refreshLibrary()
  }

  // 会话流
  const chatTurns = ref<ChatTurn[]>([
    {
      id: '1',
      sender: 'assistant',
      timestamp: '刚刚',
      content: '欢迎进入 EAST 千秒实验研读工作台。您可以选择左侧的三重视角卡片，或直接划取右侧原文句子向我发起追问。所有回答均会绑定真实页码与原文引述。',
      evidenceQuotes: []
    }
  ])

  // 研读笔记
  const activeNote = ref({
    title: 'EAST 千秒聚变实验研读要点',
    content: `# EAST 千秒长脉冲高约束实验研读笔记

## 一、核心突破
1. 实现了 **1056 秒** 超长时间的高约束稳态运行 [^cite_p1]；
2. 证实了纯射频波驱动在长脉冲稳态下的可靠性；

## 二、关键限制与工程思考
- 实验为纯氘放电，离真正商用聚变堆仍有距离；
- 偏滤器材料在长时间强热负荷下的长周期耐受性需进一步评估 [^cite_p6]；

---
*注：可通过右侧原文划词，一键插入带页码的脚注引用。*`
  })

  // Actions
  function setMode(mode: ReadingMode) {
    currentMode.value = mode
  }

  function setVersion(ver: ResultVersion) {
    currentVersion.value = ver
  }

  function setStageTab(tab: StageTab) {
    activeTab.value = tab
  }

  function setSidebarNav(nav: SidebarNav) {
    activeSidebarNav.value = nav
    if (nav === 'chat') {
      activeTab.value = 'chat'
    } else if (nav === 'outputs' || nav === 'library') {
      activeTab.value = 'reading'
    }
  }

  function toggleRail() {
    isRailOpen.value = !isRailOpen.value
  }

  function toggleDock() {
    isDockOpen.value = !isDockOpen.value
  }

  function jumpToSource(page: number, quote?: string) {
    currentPage.value = page
    if (quote) {
      highlightAnchor.value = quote
    }
    // 确保右侧原文依据栏处于展开状态
    isDockOpen.value = true
  }

  function setQuoteForAsk(page: number, text: string) {
    selectedQuote.value = { page, text }
    activeTab.value = 'chat'
  }

  function sendQuestion(question: string) {
    chatTurns.value.push({
      id: String(Date.now()),
      sender: 'user',
      timestamp: '刚刚',
      content: question,
      evidenceQuotes: selectedQuote.value ? [selectedQuote.value] : []
    })

    // 模拟针对论文的学术严谨回复
    setTimeout(() => {
      chatTurns.value.push({
        id: String(Date.now() + 1),
        sender: 'assistant',
        timestamp: '刚刚',
        content: [
          `根据论文正文第 ${selectedQuote.value?.page ?? 2} 页的实验数据分析：`,
          'EAST 通过协同运用低杂波系统与电子回旋加热，实现了零环电压超长脉冲运转。',
          '该结果展示了托卡马克稳态电流控制能力；实验使用纯氘，不代表实现聚变净能量增益。'
        ].join(''),
        evidenceQuotes: selectedQuote.value ? [selectedQuote.value] : [
          { page: 2, text: 'Plasma current was maintained with zero loop voltage under steady-state conditions.' }
        ]
      })
      // 消费后清空选区暂存
      selectedQuote.value = null
    }, 600)
  }

  return {
    // State
    currentPaper,
    currentMode,
    currentVersion,
    activeSidebarNav,
    activeTab,
    isRailOpen,
    isDockOpen,
    currentPage,
    currentZoom,
    viewMode,
    highlightAnchor,
    selectedQuote,
    scoreItems,
    academicCards,
    papers,
    paperPages,
    libraryLoading,
    uploadLoading,
    libraryError,
    researchSite,
    siteLoading,
    siteError,
    chatTurns,
    activeNote,
    // Actions
    setMode,
    setVersion,
    setSidebarNav,
    setStageTab,
    toggleRail,
    toggleDock,
    jumpToSource,
    setQuoteForAsk,
    sendQuestion,
    loadResearchSite,
    refreshLibrary,
    selectPaper,
    uploadPaper,
    initializeLibrary,
    refreshCurrentPaper
  }
})
