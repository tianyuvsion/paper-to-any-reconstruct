import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReadingMode, ResultVersion, StageTab, PaperMeta, AcademicCard, ScoreItem, ChatTurn } from '@/types/workbench'

export const useWorkbenchStore = defineStore('workbench', () => {
  // 当前研读论文
  const currentPaper = ref<PaperMeta>({
    id: 'east-super-i-mode',
    title: 'A 1056-second long-pulse high-confinement plasma regime on EAST',
    authors: ['H. Q. Liu', 'X. Z. Gong', 'J. P. Qian', 'B. Shen', 'G. S. Xu', 'EAST Team'],
    journal: 'Science Advances',
    year: 2023,
    doi: '10.1126/sciadv.abq5273',
    status: 'ready',
    pageCount: 11
  })

  // 模式与版本
  const currentMode = ref<ReadingMode>('public')
  const currentVersion = ref<ResultVersion>('v2')

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

  // 学术卡片流
  const academicCards = ref<AcademicCard[]>([
    {
      id: 'keyFindings',
      name: '核心发现',
      kind: 'content',
      tone: 'lime',
      title: '高约束运行进入千秒',
      summary: 'EAST 装置在长脉冲稳态高约束模 (Super I-mode) 下连续运行达到 1056 秒，实现了能量约束与粒子排除的长时间平衡。',
      keyFinding: '放电时长 1056 秒 · 能量约束时间 ~100 ms',
      pageAnchor: 1,
      quote: 'A steady-state long-pulse high-confinement regime with a duration of 1056 s has been achieved on the EAST tokamak.',
      evidenceTags: ['长脉冲', '高约束模', '稳态放电']
    },
    {
      id: 'researchMethod',
      name: '系统机理',
      kind: 'content',
      tone: 'pink',
      title: '多套射频波协同驱动与排热',
      summary: '依靠低杂波 (LHW) 与电子回旋波 (ECRH) 进行纯射频波电流驱动，成功控制偏滤器靶板热负荷低于工程限值。',
      keyFinding: '纯射频波驱动 · 靶板峰值热流 < 3 MW/m²',
      pageAnchor: 3,
      quote: 'The plasma current was driven purely by radio-frequency waves without central solenoid induction during the flat-top.',
      evidenceTags: ['低杂波', '电子回旋波', '热负荷控制']
    },
    {
      id: 'limitations',
      name: '研究局限与边界',
      kind: 'evidence',
      tone: 'orange',
      title: '持续运行不等于净发电',
      summary: '科学核验警示：千秒级等离子体稳态控制是物理突破，但离真正的商业聚变电站仍需克服材料辐照损伤、氚自持循环与 Q > 1 增益等堆级挑战。',
      keyFinding: '纯氘长脉冲 · 尚未进行氘氚核反应',
      pageAnchor: 6,
      quote: 'This regime demonstrates continuous plasma control rather than net electrical power generation.',
      evidenceTags: ['非发电堆', '纯氘实验', '科学边界']
    }
  ])

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
        content: `根据《Science Advances 2023》论文正文第 ${selectedQuote.value ? selectedQuote.value.page : 2} 节的实验数据分析：EAST 通过协同运用 4.6 GHz 低杂波系统与电子回旋加热，实现了零环电压超长脉冲运转。此项成果证实了托卡马克无需中央螺线管持续感应即可维持稳态电流，但仍须注意该实验是在纯氘条件下完成的，不代表已实现聚变净能量增益。`,
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
    chatTurns,
    activeNote,
    // Actions
    setMode,
    setVersion,
    setStageTab,
    toggleRail,
    toggleDock,
    jumpToSource,
    setQuoteForAsk,
    sendQuestion
  }
})
