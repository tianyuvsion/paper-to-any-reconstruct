<template>
  <div class="note-editor-pane">
    <div class="note-header">
      <input
        v-model="workbenchStore.activeNote.title"
        class="note-title-input"
        placeholder="给研读笔记起个标题…"
      />
      <button type="button" class="export-btn" @click="handleExport">
        导出 Markdown ↗
      </button>
    </div>

    <div class="note-body">
      <textarea
        v-model="workbenchStore.activeNote.content"
        class="note-textarea"
        placeholder="记录您的科研判断、疑问或推导思路..."
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()

function handleExport() {
  const blob = new Blob([workbenchStore.activeNote.content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${workbenchStore.activeNote.title || '研读笔记'}.md`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.note-editor-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
}

.note-header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #f0ecf5;
}

.note-title-input {
  flex: 1;
  border: 0;
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  color: #18141f;
  outline: none;
}

.export-btn {
  padding: 6px 14px;
  border: 1px solid #cfc5dc;
  border-radius: 8px;
  background: #ffffff;
  color: #513995;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.export-btn:hover {
  background: #f4effb;
}

.note-body {
  flex: 1;
  padding: 20px 24px;
  display: flex;
}

.note-textarea {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  resize: none;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.8;
  color: #29253a;
}
</style>
