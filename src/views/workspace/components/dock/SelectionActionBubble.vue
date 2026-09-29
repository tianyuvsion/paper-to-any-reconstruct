<template>
  <div
    v-if="visible"
    class="selection-bubble"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
  >
    <button type="button" class="bubble-btn" @click="$emit('ask')">
      💬 用于向 AI 提问
    </button>
    <button type="button" class="bubble-btn" @click="$emit('cite')">
      📝 引用到笔记
    </button>
    <button type="button" class="bubble-btn" @click="$emit('translate')">
      🌐 划词翻译
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  position: { x: number; y: number }
}>()

defineEmits<{
  (e: 'ask'): void
  (e: 'cite'): void
  (e: 'translate'): void
}>()
</script>

<style scoped>
.selection-bubble {
  position: fixed;
  z-index: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: #18141f;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(24, 20, 31, 0.28);
  transform: translate(-50%, -100%) translateY(-8px);
}

.bubble-btn {
  padding: 5px 8px;
  border: 0;
  background: transparent;
  color: #f7f4fb;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.bubble-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
</style>
