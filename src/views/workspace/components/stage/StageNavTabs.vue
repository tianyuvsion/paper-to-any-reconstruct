<template>
  <div class="stage-nav-tabs">
    <div class="tabs-track carved-well">
      <button
        type="button"
        class="stage-tab-btn"
        :class="{ active: workbenchStore.activeTab === 'reading' }"
        @click="workbenchStore.setStageTab('reading')"
      >
        <span class="tab-icon">📇</span>
        <span>学术卡片流</span>
      </button>

      <button
        type="button"
        class="stage-tab-btn"
        :class="{ active: workbenchStore.activeTab === 'chat' }"
        @click="workbenchStore.setStageTab('chat')"
      >
        <span class="tab-icon">💬</span>
        <span>AI 研读会话</span>
      </button>

      <button
        type="button"
        class="stage-tab-btn"
        :class="{ active: workbenchStore.activeTab === 'notes' }"
        @click="workbenchStore.setStageTab('notes')"
      >
        <span class="tab-icon">📝</span>
        <span>研读笔记</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()
</script>

<style scoped>
.stage-nav-tabs {
  padding: 12px 20px;
  background: #ffffff;
  border-bottom: 1px solid #f0edf4;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.tabs-track {
  display: inline-flex;
  padding: 3px;
  border-radius: 14px;
  background: #f0ecf6;
}

.stage-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 18px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: #635a72;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.stage-tab-btn:hover {
  color: #35206d;
}

.stage-tab-btn.active {
  background: #ffffff;
  color: #35206d;
  box-shadow: 0 2px 8px rgba(53, 32, 109, 0.12);
}

.tab-icon {
  font-size: 14px;
}
</style>
