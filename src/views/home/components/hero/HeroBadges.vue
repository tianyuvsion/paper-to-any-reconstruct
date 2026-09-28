<template>
  <div class="hero-badges" aria-hidden="true">
    <!-- 左侧悬浮：卡片徽标 -->
    <div class="floating-badge badge-left" @click="$emit('select', 'card')">
      <div class="badge-icon icon-card">
        <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
          <rect x="6" y="8" width="18" height="24" rx="4" fill="#f3afba" stroke="#3d344b" stroke-width="1.5" transform="rotate(-8 15 20)" />
          <rect x="14" y="8" width="18" height="24" rx="4" fill="#cbb5f0" stroke="#3d344b" stroke-width="1.5" transform="rotate(6 23 20)" />
        </svg>
      </div>
      <div class="badge-text">
        <strong>把发现，翻成卡片</strong>
        <span>16 维学术透视 ↗</span>
      </div>
    </div>

    <!-- 右侧悬浮：播客声音徽标 -->
    <div class="floating-badge badge-right" @click="$emit('select', 'audio')">
      <div class="badge-icon icon-record">
        <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
          <circle cx="20" cy="20" r="14" fill="#30233e" />
          <circle cx="20" cy="20" r="10" stroke="#ffb459" stroke-width="1" opacity="0.6" />
          <circle cx="20" cy="20" r="5" fill="#fff9dd" />
          <circle cx="20" cy="20" r="2" fill="#30233e" />
        </svg>
      </div>
      <div class="badge-text">
        <strong>让论文，有声音</strong>
        <span>通勤伴随播客 ↗</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'select', kind: 'card' | 'audio'): void
}>()
</script>

<style scoped>
.hero-badges {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 10;
}

.floating-badge {
  position: absolute;
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #e2deea;
  border-radius: 18px;
  box-shadow: 0 12px 28px rgba(48, 35, 62, 0.08);
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.floating-badge:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(48, 35, 62, 0.12);
}

.badge-left {
  left: 20px;
  top: 130px;
}

.badge-right {
  right: 20px;
  top: 150px;
}

.badge-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #f7f4fb;
}

.badge-text strong {
  display: block;
  font-size: 13px;
  color: #29253a;
  font-weight: 700;
}

.badge-text span {
  display: block;
  font-size: 11px;
  color: #7b728b;
  margin-top: 2px;
}

/* 屏幕适配规则：当可用视口宽度小于 1150px 时，自动隐藏两侧悬浮徽标，避免与中心输入框冲突 */
@media (max-width: 1150px) {
  .hero-badges {
    display: none;
  }
}
</style>
