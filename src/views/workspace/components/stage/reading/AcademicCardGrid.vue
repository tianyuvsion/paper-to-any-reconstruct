<template>
  <section class="site-status" aria-live="polite">
    <p v-if="workbenchStore.siteLoading" class="status-message">
      正在读取这篇论文的结构化卡片…
    </p>
    <p v-else-if="workbenchStore.siteError" class="status-message status-error">
      {{ workbenchStore.siteError }}
    </p>
    <p v-else-if="!workbenchStore.researchSite" class="status-message">
      当前工作台还没有连接到已解析的论文。通过带有 <code>paperId</code> 的论文入口打开后，
      这里会读取后端生成的卡片。
    </p>
    <p v-else class="status-message">
      {{ workbenchStore.researchSite.modes[workbenchStore.currentMode].label }}
      · {{ workbenchStore.researchSite.modes[workbenchStore.currentMode].judgement }}
      · {{ workbenchStore.researchSite.generator.kind === 'extractive_preview' ? '基于原文提取，未评分' : 'AI 编译' }}
    </p>
  </section>

  <div v-if="workbenchStore.academicCards.length" class="academic-card-grid">
    <article
      v-for="card in workbenchStore.academicCards"
      :key="card.id"
      class="research-flow-card carved-card"
      :class="`tone-${card.tone}`"
    >
      <header class="card-header">
        <span class="card-tag">{{ card.name }}</span>
        <button
          v-if="card.pageAnchor"
          type="button"
          class="cite-jump-btn"
          title="跳转右侧原文"
          @click="workbenchStore.jumpToSource(card.pageAnchor, card.quote)"
        >
          <span>P.{{ card.pageAnchor }} 证据 ↗</span>
        </button>
      </header>

      <div class="card-content">
        <h4 class="card-title">{{ card.title }}</h4>
        <p class="card-summary">{{ card.summary }}</p>

        <div v-if="card.evidence.length" class="evidence-list">
          <button
            v-for="(item, index) in card.evidence"
            :key="`${item.page}-${index}`"
            type="button"
            class="evidence-item"
            @click="workbenchStore.jumpToSource(item.page, item.quote)"
          >
            <span class="evidence-page">P.{{ item.page }}</span>
            <span>{{ item.quote }}</span>
          </button>
        </div>
      </div>

      <footer class="card-actions">
        <button
          type="button"
          class="card-ask-btn"
          @click="handleAskWithCard(card)"
        >
          <span>💬 基于此卡片提问</span>
        </button>
        <button
          type="button"
          class="card-open-btn"
          @click="$emit('open-detail', card)"
        >
          <span>展开全景 ↗</span>
        </button>
      </footer>
    </article>
  </div>
  <p
    v-else-if="workbenchStore.researchSite && !workbenchStore.siteLoading"
    class="status-message empty-message"
  >
    这个阅读视角暂时没有可展示的卡片。
  </p>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'
import type { AcademicCard } from '@/types/workbench'

defineEmits<{
  (e: 'open-detail', card: AcademicCard): void
}>()

const workbenchStore = useWorkbenchStore()

function handleAskWithCard(card: AcademicCard) {
  if (card.pageAnchor && card.quote) {
    workbenchStore.setQuoteForAsk(card.pageAnchor, card.quote)
  } else {
    workbenchStore.setStageTab('chat')
  }
}
</script>

<style scoped>
.academic-card-grid {
  padding: 0 24px 32px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.site-status {
  padding: 12px 24px 0;
}

.status-message {
  margin: 0;
  color: #70697b;
  font-size: 12px;
  line-height: 1.6;
}

.status-error {
  color: #a43f43;
}

.empty-message {
  padding: 24px;
}

.research-flow-card {
  padding: 24px 22px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e2deea;
  transition: transform 0.2s, box-shadow 0.2s;
}

.research-flow-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(48, 33, 80, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-tag {
  font-size: 11px;
  font-weight: 800;
  color: #513995;
  background: #f0eafb;
  padding: 3px 8px;
  border-radius: 6px;
}

.cite-jump-btn {
  border: 0;
  background: transparent;
  color: #167f7a;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-mono);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}
.cite-jump-btn:hover {
  background: #d9f1ef;
}

.card-title {
  margin: 0 0 10px;
  font-family: var(--font-serif);
  font-size: 20px;
  color: #18141f;
  line-height: 1.3;
}

.card-summary {
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 1.7;
  color: #625d6d;
}

.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.evidence-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  border-left: 3px solid #7254b3;
  border-radius: 0 8px 8px 0;
  background: #f9f8fb;
  color: #51495e;
  font: inherit;
  font-size: 12px;
  line-height: 1.6;
  text-align: left;
  cursor: pointer;
}

.evidence-item:hover {
  background: #f0eafb;
}

.evidence-page {
  flex: 0 0 auto;
  color: #513995;
  font-family: var(--font-mono);
  font-weight: 700;
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f1edf6;
  margin-top: 16px;
}

.card-ask-btn, .card-open-btn {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s;
}

.card-ask-btn {
  color: #513995;
}
.card-ask-btn:hover {
  background: #f0eafb;
}

.card-open-btn {
  color: #8c839a;
}
.card-open-btn:hover {
  color: #18141f;
}

@media (max-width: 900px) {
  .academic-card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
