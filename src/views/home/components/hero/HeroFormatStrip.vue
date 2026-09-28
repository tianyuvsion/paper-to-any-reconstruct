<template>
  <div class="format-strip">
    <div class="strip-header">
      <span class="strip-tag">FORMATS</span>
      <span class="strip-title">先体验一份真实成果</span>
    </div>

    <div class="strip-grid">
      <button
        v-for="entry in formats"
        :key="entry.id"
        type="button"
        class="format-card carved-pressable"
        @click="$emit('preview', entry.previewId)"
      >
        <span class="format-icon">{{ entry.icon }}</span>
        <div class="format-text">
          <strong>{{ entry.title }}</strong>
          <small>{{ entry.description }}</small>
        </div>
        <span class="arrow">↗</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormatEntry } from '@/types/home'

defineEmits<{
  (e: 'preview', previewId: string): void
}>()

const formats: FormatEntry[] = [
  {
    id: '1',
    title: '知识卡片',
    description: '16 维学术评分与发现',
    icon: '📇',
    previewId: 'keyFindings'
  },
  {
    id: '2',
    title: '听觉叙事',
    description: '通勤伴随播客与讲解',
    icon: '🎧',
    previewId: 'audioExplanation'
  },
  {
    id: '3',
    title: '科学影像',
    description: '43 秒沉浸等离子体视频',
    icon: '🎬',
    previewId: 'videoExplanation'
  },
  {
    id: '4',
    title: '视觉表达',
    description: '一页式学术信息海报',
    icon: '📑',
    previewId: 'presentation'
  }
]
</script>

<style scoped>
.format-strip {
  margin-top: 36px;
  width: 100%;
  max-width: 960px;
}

.strip-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.strip-tag {
  font-size: 11px;
  font-weight: 800;
  font-family: var(--font-mono);
  color: #167f7a;
  background: #d9f1ef;
  padding: 2px 8px;
  border-radius: 6px;
}

.strip-title {
  font-size: 13px;
  color: #71697e;
  font-weight: 600;
}

.strip-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.format-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid #e2deea;
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
  box-shadow: 0 4px 14px rgba(48, 33, 80, 0.04);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.format-card:hover {
  background: #fdfcff;
  border-color: #cbb5f0;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(48, 33, 80, 0.08);
}

.format-icon {
  font-size: 20px;
}

.format-text {
  flex: 1;
  min-width: 0;
}

.format-text strong {
  display: block;
  font-size: 13px;
  color: #29253a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.format-text small {
  display: block;
  font-size: 11px;
  color: #8c8498;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.arrow {
  font-size: 12px;
  color: #7254b3;
  opacity: 0.6;
}

@media (max-width: 860px) {
  .strip-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .strip-grid {
    grid-template-columns: 1fr;
  }
}
</style>
