<template>
  <div class="academic-card-grid">
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

        <div v-if="card.keyFinding" class="key-finding-chip">
          <strong>数据证据：</strong>
          <span>{{ card.keyFinding }}</span>
        </div>
      </div>

      <footer class="card-actions">
        <button
          type="button"
          class="card-ask-btn"
          @click="handleAskWithCard(card)"
        >
          <span>💬 将此结论用于提问</span>
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

.key-finding-chip {
  padding: 8px 12px;
  border-radius: 8px;
  background: #f9f8fb;
  border-left: 3px solid #7254b3;
  font-size: 12px;
  color: #35206d;
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
