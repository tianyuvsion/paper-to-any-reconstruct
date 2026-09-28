<template>
  <nav class="guide-nav" aria-label="研读流程导航">
    <button
      v-for="item in navItems"
      :key="item.id"
      type="button"
      class="guide-nav-item"
      :class="{ active: activeChapter === item.id }"
      @click="$emit('select', item.id)"
    >
      <span class="nav-num">{{ item.num }}</span>
      <span class="nav-text">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  activeChapter: string
}>()

defineEmits<{
  (e: 'select', id: string): void
}>()

const navItems = [
  { id: 'import', num: '01', label: '放入论文' },
  { id: 'modes', num: '02', label: '选择读法' },
  { id: 'evidence', num: '03', label: '核对证据' },
  { id: 'ask', num: '04', label: '沿文追问' },
  { id: 'outputs', num: '05', label: '多媒体' },
  { id: 'organize', num: '06', label: '收好研究' }
]
</script>

<style scoped>
.guide-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid #e1dee7;
  border-radius: 18px;
  overflow-x: auto;
  max-width: 100%;
}

.guide-nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: #625d6d;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.guide-nav-item:hover {
  background: #f4effb;
  color: #35206d;
}

.guide-nav-item.active {
  background: #35206d;
  color: #ffffff;
}

.nav-num {
  font-size: 11px;
  font-family: var(--font-mono);
  opacity: 0.8;
}
</style>
