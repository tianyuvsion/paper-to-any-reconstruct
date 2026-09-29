<template>
  <div class="rail-paper-list">
    <div class="section-title">
      <span>已入库论文</span>
      <button type="button" class="add-paper-btn" title="导入新论文" @click="handleUpload">
        ＋
      </button>
    </div>

    <div class="paper-items">
      <div
        class="paper-item active"
        title="当前研读论文"
      >
        <div class="paper-badge">
          <span class="status-dot"></span>
          <span>已就绪</span>
        </div>
        <strong class="paper-title">{{ workbenchStore.currentPaper.title }}</strong>
        <div class="paper-meta">
          <span>{{ workbenchStore.currentPaper.journal }} · {{ workbenchStore.currentPaper.year }}</span>
          <span>{{ workbenchStore.currentPaper.pageCount }} 页</span>
        </div>
      </div>

      <div class="paper-item inactive" title="预置论文">
        <div class="paper-badge">
          <span class="status-dot standby"></span>
          <span>待载入</span>
        </div>
        <strong class="paper-title">Highly accurate protein structure prediction with AlphaFold</strong>
        <div class="paper-meta">
          <span>Nature · 2021</span>
          <span>16 页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()

function handleUpload() {
  alert('论文 PDF 拖拽上传模块即将开启！当前已载入 EAST 顶刊完整实验数据供深度研读。')
}
</script>

<style scoped>
.rail-paper-list {
  padding: 16px;
  border-bottom: 1px solid #ebe8f0;
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
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid #dcd7e6;
  background: #ffffff;
  color: #35206d;
  font-size: 16px;
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

.paper-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.paper-item {
  padding: 12px 14px;
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

.paper-item.inactive {
  opacity: 0.6;
}
.paper-item.inactive:hover {
  opacity: 0.9;
  background: #f9f7fc;
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
  font-size: 10px;
  color: #8c8299;
  font-family: var(--font-mono);
}
</style>
