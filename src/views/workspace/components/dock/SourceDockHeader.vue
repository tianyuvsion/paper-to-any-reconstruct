<template>
  <header class="source-dock-header">
    <div class="header-left">
      <span class="dock-title">论文依据原文</span>
      <span class="page-indicator">第 {{ workbenchStore.currentPage }} 页 · 共 {{ workbenchStore.currentPaper.pageCount }} 页</span>
    </div>

    <div class="header-tools">
      <button
        type="button"
        class="tool-btn"
        title="上一页"
        :disabled="workbenchStore.currentPage <= 1"
        @click="workbenchStore.currentPage--"
      >
        ‹
      </button>
      <button
        type="button"
        class="tool-btn"
        title="下一页"
        :disabled="workbenchStore.currentPage >= workbenchStore.currentPaper.pageCount"
        @click="workbenchStore.currentPage++"
      >
        ›
      </button>

      <div class="view-mode-toggle">
        <button
          type="button"
          class="mode-toggle-btn"
          :class="{ active: workbenchStore.viewMode === 'text' }"
          @click="workbenchStore.viewMode = 'text'"
        >
          解析文本
        </button>
        <button
          type="button"
          class="mode-toggle-btn"
          :class="{ active: workbenchStore.viewMode === 'pdf' }"
          @click="workbenchStore.viewMode = 'pdf'"
        >
          PDF 原件
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()
</script>

<style scoped>
.source-dock-header {
  padding: 10px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e0ec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.dock-title {
  font-size: 13px;
  font-weight: 700;
  color: #18141f;
}

.page-indicator {
  font-size: 11px;
  color: #8c8299;
  font-family: var(--font-mono);
}

.header-tools {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tool-btn {
  width: 26px;
  height: 26px;
  border: 1px solid #dcd7e6;
  border-radius: 6px;
  background: #ffffff;
  color: #35206d;
  font-size: 16px;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.tool-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.view-mode-toggle {
  display: inline-flex;
  padding: 2px;
  border-radius: 6px;
  background: #f0ecf6;
  margin-left: 6px;
}

.mode-toggle-btn {
  padding: 3px 8px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #625972;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.mode-toggle-btn.active {
  background: #ffffff;
  color: #35206d;
  box-shadow: 0 1px 3px rgba(48, 33, 80, 0.1);
}
</style>
