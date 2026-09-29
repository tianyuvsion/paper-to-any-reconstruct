<template>
  <section class="score-matrix-bar carved-card">
    <header class="matrix-header">
      <div>
        <span class="matrix-tag">16-DIMENSION JUDGEMENT</span>
        <h3 class="matrix-title">学术严谨性与突破评分</h3>
      </div>
      <div class="score-overall">
        <strong>8.8</strong>
        <span>/ 10</span>
        <small class="score-level">综合评级 · 良好突破</small>
      </div>
    </header>

    <div class="score-bars-grid">
      <div
        v-for="item in workbenchStore.scoreItems"
        :key="item.id"
        class="score-bar-item"
        :title="item.reasoning"
      >
        <div class="bar-info">
          <span class="bar-label">{{ item.label }}</span>
          <strong class="bar-val">{{ item.score }}</strong>
        </div>
        <div class="progress-track">
          <div
            class="progress-fill"
            :style="{ width: `${(item.score / item.maxScore) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()
</script>

<style scoped>
.score-matrix-bar {
  margin: 20px 24px;
  padding: 22px 24px;
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e2deea;
}

.matrix-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 1px solid #f0ecf5;
  padding-bottom: 14px;
  margin-bottom: 16px;
}

.matrix-tag {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #167f7a;
  font-family: var(--font-mono);
  display: block;
  margin-bottom: 4px;
}

.matrix-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 20px;
  color: #18141f;
}

.score-overall {
  text-align: right;
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.score-overall strong {
  font-family: var(--font-serif);
  font-size: 36px;
  line-height: 1;
  color: #147847;
}

.score-overall span {
  font-size: 14px;
  color: #8c8299;
}

.score-level {
  width: 100%;
  font-size: 11px;
  color: #147847;
  font-weight: 700;
  display: block;
}

.score-bars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 20px;
}

.score-bar-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bar-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.bar-label {
  color: #51495e;
  font-weight: 600;
}

.bar-val {
  color: #147847;
  font-family: var(--font-mono);
}

.progress-track {
  height: 6px;
  background: #eef2eb;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4db47d;
  border-radius: inherit;
  transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@media (max-width: 900px) {
  .score-bars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
