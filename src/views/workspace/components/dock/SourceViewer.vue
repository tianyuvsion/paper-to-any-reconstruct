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

    <!-- 文本解析模式 -->
    <div v-if="workbenchStore.viewMode === 'text'" class="source-text-document">
      <header class="doc-header">
        <span class="doc-journal">Science Advances · 2023 · Article</span>
        <h2 class="doc-title">{{ workbenchStore.currentPaper.title }}</h2>
        <p class="doc-authors">H. Q. Liu, X. Z. Gong, J. P. Qian, B. Shen, G. S. Xu, et al.</p>
        <p class="doc-doi">DOI: {{ workbenchStore.currentPaper.doi }}</p>
      </header>

      <section class="doc-section abstract-section">
        <h3>ABSTRACT</h3>
        <p>
          Long-pulse steady-state high-confinement operation is an essential requirement for future magnetic confinement fusion reactors such as ITER and CFETR. Here, we report on the realization of a steady-state long-pulse high-confinement plasma regime on the Experimental Advanced Superconducting Tokamak (EAST) with a duration of 1056 s.
        </p>
      </section>

      <section class="doc-section">
        <h3>1. INTRODUCTION</h3>
        <p>
          Magnetic confinement fusion research has made significant progress in exploring high-confinement modes. The Experimental Advanced Superconducting Tokamak (EAST) was constructed to address key physics and engineering issues for long-pulse high-power steady-state plasma operations.
        </p>
      </section>

      <section class="doc-section">
        <h3>2. EXPERIMENTAL SETUP &amp; RESULTS</h3>
        <p>
          In discharge #106915, plasma current was sustained with pure radio-frequency (RF) wave heating and current drive, utilizing the 4.6 GHz lower hybrid current drive (LHCD) and electron cyclotron resonance heating (ECRH) systems. The line-averaged electron density was maintained steadily around 3.0 × 10¹⁹ m⁻³.
        </p>
        <p class="highlight-target" :class="{ active: workbenchStore.highlightAnchor }">
          <mark v-if="workbenchStore.highlightAnchor">
            {{ workbenchStore.highlightAnchor }}
          </mark>
          <span v-else>
            A steady-state long-pulse high-confinement regime with a duration of 1056 s has been achieved on the EAST tokamak, setting a world record for magnetic confinement plasma duration.
          </span>
        </p>
      </section>

      <section class="doc-section">
        <h3>3. DISCUSSION &amp; LIMITATIONS</h3>
        <p>
          Although continuous plasma sustainment was demonstrated for 1056 s, this achievement represents an operational physics baseline. Substantial challenges remain in addressing high-fluence neutron wall loads, tritium fuel self-sufficiency, and demonstration of net fusion electricity gain (Q > 1) in commercial reactor prototypes.
        </p>
      </section>
    </div>

    <!-- PDF 嵌入模式 -->
    <div v-else class="source-pdf-document">
      <div class="pdf-page-sheet carved-card">
        <div class="pdf-page-badge">第 {{ workbenchStore.currentPage }} 页预览</div>
        <img
          class="pdf-page-img"
          :src="`https://paper-to-any.8-218-121-139.sslip.io/ui/papers/east-super-i-mode/assets/pages/page-${String(workbenchStore.currentPage).padStart(2, '0')}.png`"
          alt="PDF 原文页面"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWorkbenchStore } from '@/stores/workbench'
import SelectionActionBubble from './SelectionActionBubble.vue'

const workbenchStore = useWorkbenchStore()

const bubbleVisible = ref(false)
const bubblePos = ref({ x: 0, y: 0 })
const currentSelection = ref('')

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
  alert(`划词翻译：\n"${currentSelection.value}"\n\n【中文释义】：\n在 EAST 托卡马克上实现了 1056 秒超长脉冲高约束等离子体运行...`)
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

.abstract-section {
  background: #f7f5fa;
  padding: 16px;
  border-radius: 12px;
  font-size: 13px;
}

.highlight-target mark {
  background: #fff4ba;
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px dashed #d9a826;
}

/* PDF 模式 */
.source-pdf-document {
  display: flex;
  justify-content: center;
}

.pdf-page-sheet {
  background: #ffffff;
  padding: 12px;
  border-radius: 12px;
  width: 100%;
}

.pdf-page-badge {
  font-size: 11px;
  color: #716880;
  margin-bottom: 8px;
  font-family: var(--font-mono);
}

.pdf-page-img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid #e1dee7;
  display: block;
}
</style>
