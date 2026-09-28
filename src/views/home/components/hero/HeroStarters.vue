<template>
  <div class="hero-starters">
    <span class="starters-label">试试快捷提问：</span>
    <div class="starters-list">
      <button
        v-for="item in starters"
        :key="item.id"
        type="button"
        class="starter-pill carved-pressable"
        @click="$emit('select', item.text)"
      >
        <span>{{ item.text }}</span>
        <span class="arrow-symbol">↗</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StarterQuestion } from '@/types/home'

defineEmits<{
  (e: 'select', text: string): void
}>()

const starters: StarterQuestion[] = [
  { id: '1', text: 'EAST 的千秒实验做到了什么？' },
  { id: '2', text: '这项研究离发电还有多远？' },
  { id: '3', text: '这篇论文应该怎么读？' }
]
</script>

<style scoped>
.hero-starters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 14px;
}

.starters-label {
  font-size: 13px;
  color: #7d758a;
  font-weight: 500;
}

.starters-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.starter-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: #ffffff;
  border: 1px solid #dfdae8;
  border-radius: 20px;
  font-size: 13px;
  color: #4b3e64;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(48, 33, 80, 0.04);
  transition: all 0.2s ease;
}

.starter-pill:hover {
  background: #f7f3fb;
  border-color: #c9bfdc;
  color: #35206d;
  transform: translateY(-1px);
}

.arrow-symbol {
  font-size: 11px;
  color: #167f7a;
}
</style>
