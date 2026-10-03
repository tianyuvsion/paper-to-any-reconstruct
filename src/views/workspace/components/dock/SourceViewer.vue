<template>
  <div class="source-viewer-pane" @mouseup="handleTextSelection">
    <!-- 划词气泡操作菜单 -->
    <SelectionActionBubble
      :visible="bubbleVisible"
      :position="bubblePos"
      @ask="handleAskSelection"
      @cite="handleCiteSelection"
      @translate="handleTranslateSelection"
    />

    <!-- 后端解析文本模式 -->
    <div v-if="workbenchStore.viewMode === 'text' && currentPageText" class="source-text-document">
      <header class="doc-header">
        <span class="doc-journal">原文文本 · 第 {{ workbenchStore.currentPage }} 页</span>
        <h2 class="doc-title">{{ workbenchStore.currentPaper.title }}</h2>
        <p v-if="workbenchStore.currentPaper.authors.length" class="doc-authors">
          {{ workbenchStore.currentPaper.authors.join(', ') }}
        </p>
        <p class="doc-doi">{{ workbenchStore.currentPaper.originalFilename }}</p>
      </header>

      <section class="doc-section source-page-text">
        <h3>第 {{ workbenchStore.currentPage }} 页</h3>
        <p v-html="highlightedPageHtml"></p>
      </section>
    </div>

    <!-- PDF 原件由后端按当前论文流式返回 -->
    <div v-else-if="workbenchStore.currentPaper.id && workbenchStore.currentPaper.status === 'ready'" class="source-pdf-document">
      <iframe
        class="source-pdf-frame"
        :src="papersApi.sourceUrl(workbenchStore.currentPaper.id, workbenchStore.currentPage)"
        :title="`${workbenchStore.currentPaper.title} PDF 原文`"
      ></iframe>
    </div>
    <div v-else class="source-empty-state">
      <p v-if="workbenchStore.currentPaper.status === 'failed'">
        {{ workbenchStore.currentPaper.errorMessage || 'PDF 解析失败。' }}
      </p>
      <p v-else-if="workbenchStore.currentPaper.id">
        PDF 正在解析，完成后会显示原文和阅读卡片。
      </p>
      <p v-else>
        选择论文或导入 PDF 后，这里会显示真实原文。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWorkbenchStore } from '@/stores/workbench'
import { papersApi } from '@/api/papers'
import SelectionActionBubble from './SelectionActionBubble.vue'

const workbenchStore = useWorkbenchStore()

const bubbleVisible = ref(false)
const bubblePos = ref({ x: 0, y: 0 })
const currentSelection = ref('')

const currentPageText = computed(() => {
  return workbenchStore.paperPages.find((page) => page.page === workbenchStore.currentPage)?.text ?? ''
})

const highlightedPageHtml = computed(() => {
  const escapedText = escapeHtml(currentPageText.value)
  const quote = workbenchStore.highlightAnchor
  if (!quote) return escapedText

  const escapedQuote = escapeHtml(quote)
  const start = escapedText.toLocaleLowerCase().indexOf(escapedQuote.toLocaleLowerCase())
  if (start < 0) return escapedText

  const beforeQuote = escapedText.slice(0, start)
  const matchedQuote = escapedText.slice(start, start + escapedQuote.length)
  const afterQuote = escapedText.slice(start + escapedQuote.length)

  return `${beforeQuote}<mark>${matchedQuote}</mark>${afterQuote}`
})

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function handleTextSelection(e: MouseEvent) {
  const selection = window.getSelection()
  const text = selection?.toString().trim()
  if (text && text.length > 3) {
    currentSelection.value = text
    bubblePos.value = { x: e.clientX, y: e.clientY }
    bubbleVisible.value = true
  } else {
    bubbleVisible.value = false
  }
}

function handleAskSelection() {
  if (currentSelection.value) {
    workbenchStore.setQuoteForAsk(workbenchStore.currentPage, currentSelection.value)
    bubbleVisible.value = false
  }
}

function handleCiteSelection() {
  if (currentSelection.value) {
    const citation = `\n> [^cite_p${workbenchStore.currentPage}]: "${currentSelection.value}"\n`
    workbenchStore.activeNote.content += citation
    workbenchStore.setStageTab('notes')
    bubbleVisible.value = false
  }
}

function handleTranslateSelection() {
  alert('划词翻译尚未连接翻译服务。')
  bubbleVisible.value = false
}
</script>

<style scoped>
.source-viewer-pane {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
}

.source-text-document {
  max-width: 100%;
  font-family: var(--font-serif);
  color: #18141f;
  line-height: 1.85;
}

.doc-header {
  border-bottom: 2px solid #18141f;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.doc-journal {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #167f7a;
  font-family: var(--font-mono);
  display: block;
  margin-bottom: 8px;
}

.doc-title {
  margin: 0 0 10px;
  font-size: 22px;
  line-height: 1.3;
}

.doc-authors {
  margin: 0 0 4px;
  font-size: 13px;
  color: #51495e;
}

.doc-doi {
  margin: 0;
  font-size: 11px;
  color: #8c8299;
  font-family: var(--font-mono);
}

.doc-section {
  margin-bottom: 24px;
}

.doc-section h3 {
  font-size: 13px;
  letter-spacing: 1px;
  color: #35206d;
  margin: 0 0 8px;
}

.doc-section p {
  margin: 0 0 12px;
  font-size: 14px;
  color: #29253a;
}

.source-page-text p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.abstract-section {
  background: #f7f5fa;
  padding: 16px;
  border-radius: 12px;
  font-size: 13px;
}

.source-page-text mark {
  background: #fff4ba;
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px dashed #d9a826;
}

/* PDF 模式 */
.source-pdf-document {
  display: flex;
  flex: 1;
  min-height: 70vh;
}

.source-pdf-frame {
  width: 100%;
  min-height: 70vh;
  border: 1px solid #e1dee7;
  border-radius: 12px;
  background: #ffffff;
}

.source-empty-state {
  display: grid;
  min-height: 240px;
  place-items: center;
  color: #81798d;
  text-align: center;
  line-height: 1.6;
}

.source-empty-state p {
  max-width: 360px;
  margin: 0;
}
</style>
