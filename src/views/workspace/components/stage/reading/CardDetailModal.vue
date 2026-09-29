<template>
  <Teleport to="body">
    <div v-if="visible && card" class="newspaper-modal-backdrop" @click.self="$emit('close')">
      <div class="newspaper-dialog carved-card" role="dialog" aria-modal="true">
        <header class="dialog-header">
          <div>
            <span class="dialog-kicker">{{ card.name }} · 深度全景解读</span>
            <h2 class="dialog-title">{{ card.title }}</h2>
          </div>
          <button type="button" class="close-x" @click="$emit('close')">×</button>
        </header>

        <div class="dialog-body">
          <div class="summary-lead">
            <p>{{ card.summary }}</p>
          </div>

          <div v-if="card.quote" class="quote-section">
            <span class="quote-tag">原文关键语句依据 (Page {{ card.pageAnchor }})：</span>
            <blockquote>“{{ card.quote }}”</blockquote>
          </div>

          <div class="evidence-tags-row">
            <span v-for="tag in card.evidenceTags" :key="tag" class="tag-pill"># {{ tag }}</span>
          </div>
        </div>

        <footer class="dialog-footer">
          <button
            type="button"
            class="action-ask-btn"
            @click="handleAsk"
          >
            💬 将这张卡片用于向 AI 提问
          </button>
          <button
            v-if="card.pageAnchor"
            type="button"
            class="action-jump-btn"
            @click="handleJump"
          >
            📖 查阅 PDF 第 {{ card.pageAnchor }} 页
          </button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'
import type { AcademicCard } from '@/types/workbench'

const props = defineProps<{
  visible: boolean
  card: AcademicCard | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const workbenchStore = useWorkbenchStore()

function handleAsk() {
  if (props.card?.pageAnchor && props.card?.quote) {
    workbenchStore.setQuoteForAsk(props.card.pageAnchor, props.card.quote)
  }
  emit('close')
}

function handleJump() {
  if (props.card?.pageAnchor) {
    workbenchStore.jumpToSource(props.card.pageAnchor, props.card.quote)
  }
  emit('close')
}
</script>

<style scoped>
.newspaper-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(24, 20, 31, 0.48);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.newspaper-dialog {
  width: min(720px, 100%);
  max-height: 85vh;
  background: #ffffff;
  border-radius: 24px;
  overflow: auto;
  box-shadow: 0 24px 60px rgba(31, 20, 56, 0.28);
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 24px 28px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #f0ecf5;
}

.dialog-kicker {
  font-size: 11px;
  font-weight: 800;
  color: #167f7a;
  letter-spacing: 1.5px;
  display: block;
  margin-bottom: 6px;
}

.dialog-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 24px;
  color: #18141f;
}

.close-x {
  border: 0;
  background: #f4effb;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 22px;
  color: #7b728b;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.dialog-body {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-lead p {
  font-size: 15px;
  line-height: 1.85;
  color: #29253a;
  margin: 0;
}

.quote-section {
  padding: 16px 20px;
  border-radius: 12px;
  background: #f7f4fb;
  border-left: 4px solid #513995;
}

.quote-tag {
  font-size: 11px;
  font-weight: 700;
  color: #513995;
  display: block;
  margin-bottom: 6px;
}

.quote-section blockquote {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 14px;
  line-height: 1.7;
  color: #3b3248;
}

.evidence-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-pill {
  padding: 4px 10px;
  border-radius: 6px;
  background: #f0eafb;
  color: #513995;
  font-size: 11px;
  font-weight: 600;
}

.dialog-footer {
  padding: 16px 28px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #f0ecf5;
}

.action-ask-btn, .action-jump-btn {
  padding: 10px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.action-ask-btn {
  border: 0;
  background: #35206d;
  color: #ffffff;
}

.action-jump-btn {
  border: 1px solid #cfc5dc;
  background: #ffffff;
  color: #513995;
}
</style>
