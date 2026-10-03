<template>
  <div class="rail-paper-list">
    <div class="section-title">
      <span>论文文件</span>
      <button
        type="button"
        class="add-paper-btn"
        title="导入 PDF"
        :disabled="workbenchStore.uploadLoading"
        @click="fileInput?.click()"
      >
        ＋ 导入 PDF
      </button>
    </div>
    <input
      ref="fileInput"
      class="file-input"
      type="file"
      accept="application/pdf,.pdf"
      @change="handleFileChange"
    />

    <p v-if="workbenchStore.libraryError" class="library-message error-message">
      {{ workbenchStore.libraryError }}
    </p>
    <p v-if="workbenchStore.uploadLoading" class="library-message">
      正在上传并提交解析…
    </p>
    <p v-else-if="workbenchStore.libraryLoading" class="library-message">
      正在读取论文库…
    </p>

    <div v-if="workbenchStore.papers.length" class="paper-items">
      <div
        v-for="paper in workbenchStore.papers"
        :key="paper.id"
        class="paper-item"
        :class="{ active: paper.id === workbenchStore.currentPaper.id }"
      >
        <button
          type="button"
          class="paper-select"
          :disabled="paper.archived_at !== null"
          @click="selectPaper(paper.id)"
        >
          <span class="paper-badge">
            <span class="status-dot" :class="statusClass(paper.status)"></span>
            <span>{{ statusLabel(paper.status) }}</span>
          </span>
          <strong class="paper-title">{{ paper.title || paper.original_filename }}</strong>
          <span class="paper-meta">
            <span>{{ paper.original_filename }}</span>
            <span v-if="paper.page_count">{{ paper.page_count }} 页</span>
          </span>
        </button>
      </div>
    </div>
    <p v-else-if="!workbenchStore.libraryLoading" class="library-message">
      论文库为空。点击“＋”导入 PDF 开始研读。
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkbenchStore } from '@/stores/workbench'
import type { PaperProcessingStatus } from '@/types/papers'

const workbenchStore = useWorkbenchStore()
const router = useRouter()
const fileInput = ref<HTMLInputElement | null>(null)

function openFilePicker() {
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  try {
    const accepted = await workbenchStore.uploadPaper(file)
    await router.replace({
      query: { ...router.currentRoute.value.query, paperId: accepted.paper.id }
    })
  } catch {
    // 上传错误已经通过 store 状态显示在论文列表上。
  }
}

defineExpose({ openFilePicker })

async function selectPaper(paperId: string) {
  await workbenchStore.selectPaper(paperId)
  await router.replace({
    query: { ...router.currentRoute.value.query, paperId }
  })
}

function statusLabel(status: PaperProcessingStatus) {
  const labels: Record<PaperProcessingStatus, string> = {
    uploaded: '排队中',
    extracting: '解析中',
    extracted: '整理卡片中',
    compiling: '整理卡片中',
    ready: '已就绪',
    failed: '解析失败'
  }

  return labels[status]
}

function statusClass(status: PaperProcessingStatus) {
  if (status === 'ready') return 'ready'
  if (status === 'failed') return 'failed'
  return 'pending'
}
</script>

<style scoped>
.rail-paper-list {
  padding: 16px;
  border-bottom: 1px solid #ebe8f0;
  max-height: 38vh;
  overflow-y: auto;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 800;
  color: #726882;
  letter-spacing: 0.5px;
}

.add-paper-btn {
  min-height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid #dcd7e6;
  background: #ffffff;
  color: #35206d;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.add-paper-btn:hover {
  background: #f0eafb;
  border-color: #7254b3;
}

.add-paper-btn:disabled {
  opacity: 0.5;
  cursor: wait;
}

.file-input {
  display: none;
}

.library-message {
  margin: 8px 0;
  color: #81798d;
  font-size: 11px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.error-message {
  color: #a43f43;
}

.paper-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.paper-item {
  padding: 0;
  border-radius: 12px;
  border: 1px solid transparent;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
}

.paper-item.active {
  border-color: #cbb5f0;
  background: #f4effb;
  box-shadow: 0 2px 8px rgba(48, 33, 80, 0.06);
}

.paper-select {
  display: block;
  width: 100%;
  padding: 12px 14px;
  border: 0;
  border-radius: inherit;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.paper-select:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.paper-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #167f7a;
  font-weight: 700;
  margin-bottom: 6px;
}

.status-dot.pending {
  background: #d69b32;
}

.status-dot.failed {
  background: #b7444b;
}

.status-dot.ready {
  background: #167f7a;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #167f7a;
}
.status-dot.standby {
  background: #9d94a8;
}

.paper-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.45;
  color: #18141f;
  margin-bottom: 6px;
}

.paper-meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 10px;
  color: #8c8299;
  font-family: var(--font-mono);
}
</style>
