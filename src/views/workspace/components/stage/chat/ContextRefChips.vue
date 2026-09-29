<template>
  <div v-if="workbenchStore.selectedQuote" class="context-ref-chips">
    <div class="chip-item">
      <span class="chip-icon">📎</span>
      <span class="chip-page">P.{{ workbenchStore.selectedQuote.page }}</span>
      <span class="chip-text">{{ workbenchStore.selectedQuote.text }}</span>
      <button
        type="button"
        class="chip-clear"
        title="清除该引用"
        @click="workbenchStore.selectedQuote = null"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()
</script>

<style scoped>
.context-ref-chips {
  padding: 8px 16px;
  background: #f7f3fb;
  border-bottom: 1px solid #ece6f4;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chip-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #dcd3eb;
  font-size: 12px;
  color: #4b3e64;
  max-width: 100%;
}

.chip-icon {
  font-size: 12px;
}

.chip-page {
  font-weight: 800;
  color: #167f7a;
  font-family: var(--font-mono);
}

.chip-text {
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip-clear {
  border: 0;
  background: transparent;
  color: #9283a8;
  font-size: 14px;
  cursor: pointer;
  padding: 0 2px;
}
.chip-clear:hover {
  color: #a9242d;
}
</style>
