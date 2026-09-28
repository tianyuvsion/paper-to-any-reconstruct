<template>
  <article
    class="gallery-card carved-card"
    :class="`tone-${card.tone}`"
    @click="$emit('select', card)"
  >
    <header class="card-top">
      <span class="card-kicker">{{ card.kicker }}</span>
      <span v-if="card.badge" class="card-badge">{{ card.badge }}</span>
    </header>

    <!-- 卡片主体视觉区域 -->
    <div class="card-stage">
      <!-- 1. 发现卡片: 1056秒大字号 -->
      <template v-if="card.mediaKind === 'orbit'">
        <div class="stage-metric">
          <strong class="metric-num">1056</strong>
          <span class="metric-unit">秒</span>
        </div>
        <p class="stage-sub">H 模等离子体连续稳态运行</p>
      </template>

      <!-- 2. 音频卡片: 黑胶唱片与声波律动 -->
      <template v-else-if="card.mediaKind === 'audio'">
        <div class="stage-record">
          <div class="record-disc">
            <div class="disc-label">
              <span class="play-icon">▶</span>
            </div>
          </div>
          <div class="audio-waves" aria-hidden="true">
            <span v-for="i in 16" :key="i" class="wave-bar" :style="{ '--delay': `${i * 0.1}s` }"></span>
          </div>
        </div>
      </template>

      <!-- 3. 视频卡片: 等离子体影像 -->
      <template v-else-if="card.mediaKind === 'video'">
        <div class="stage-video">
          <div class="video-overlay">
            <span class="video-play-btn">▶</span>
            <span class="video-duration">00:43 · MP4</span>
          </div>
        </div>
      </template>

      <!-- 4. 公式/边界卡片: 1056s ≠ 发电 -->
      <template v-else-if="card.mediaKind === 'formula'">
        <div class="stage-formula">
          <div class="formula-box">
            <code>1056 s ≠ 发电</code>
          </div>
          <span class="formula-note">技术就绪度 · 边界声明</span>
        </div>
      </template>

      <!-- 5. 一页海报 -->
      <template v-else-if="card.mediaKind === 'poster'">
        <div class="stage-poster">
          <div class="poster-sheet">
            <div class="poster-line w-60"></div>
            <div class="poster-line w-80"></div>
            <div class="poster-block"></div>
            <div class="poster-line w-40"></div>
          </div>
        </div>
      </template>

      <!-- 6. 原文首页 -->
      <template v-else>
        <div class="stage-source">
          <div class="source-doc">
            <span class="doc-badge">PDF 原文</span>
            <div class="doc-lines">
              <span class="l-1"></span>
              <span class="l-2"></span>
              <span class="l-3"></span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 卡片底部说明 -->
    <footer class="card-bottom">
      <h3 class="card-title">{{ card.title }}</h3>
      <p class="card-subtitle">{{ card.subtitle }}</p>
      <span class="action-preview">点击展开全景预览 ↗</span>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { GalleryCard } from '@/types/home'

defineProps<{
  card: GalleryCard
}>()

defineEmits<{
  (e: 'select', card: GalleryCard): void
}>()
</script>

<style scoped>
.gallery-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 22px 20px;
  border-radius: 24px;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s;
  min-height: 380px;
  box-sizing: border-box;
}

.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 48px rgba(48, 33, 80, 0.12);
}

/* 各色系背景风格 */
.tone-lilac {
  background: #f4eefa;
  border-color: #dcd0ef;
}
.tone-orange {
  background: #fff4ea;
  border-color: #ffd8bd;
}
.tone-dark {
  background: #1f1b2b;
  border-color: #3b3450;
  color: #f7f4fb;
}
.tone-dark .card-kicker,
.tone-dark .card-subtitle {
  color: #a89ebd;
}
.tone-dark .card-title {
  color: #ffffff;
}
.tone-lime {
  background: #f2f9db;
  border-color: #dcecb4;
}
.tone-pink {
  background: #fdf0f4;
  border-color: #f6cfd9;
}
.tone-cyan {
  background: #eef9f8;
  border-color: #cfeeed;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-kicker {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #5c5568;
}

.card-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.7);
  color: #35206d;
}

/* 舞台展示 */
.card-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.stage-metric {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.metric-num {
  font-family: var(--font-serif);
  font-size: clamp(48px, 6vw, 68px);
  line-height: 1;
  color: #35206d;
}

.metric-unit {
  font-size: 18px;
  font-weight: 700;
  color: #513995;
}

.stage-sub {
  margin: 8px 0 0;
  font-size: 13px;
  color: #625d6d;
}

/* 黑胶唱片 */
.stage-record {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.record-disc {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle, #30233e 0%, #151124 100%);
  border: 4px solid #fff3d1;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 20px rgba(48, 35, 62, 0.2);
}

.disc-label {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffb459;
  display: grid;
  place-items: center;
  color: #30233e;
  font-size: 12px;
}

.audio-waves {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 24px;
}

.wave-bar {
  width: 3px;
  height: 16px;
  background: #ffb459;
  border-radius: 2px;
  animation: wave 1.2s ease-in-out infinite alternate;
  animation-delay: var(--delay);
}

@keyframes wave {
  0% { height: 4px; }
  100% { height: 22px; }
}

/* 视频 */
.stage-video {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, #2b2241, #130f1e);
  border-radius: 14px;
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;
}

.video-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.video-play-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: #ffffff;
  display: grid;
  place-items: center;
  font-size: 16px;
}

.video-duration {
  font-size: 11px;
  font-family: var(--font-mono);
  color: #cbb5f0;
}

/* 公式 */
.stage-formula {
  text-align: center;
}

.formula-box code {
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 800;
  color: #2b3819;
  background: rgba(255, 255, 255, 0.85);
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid #d4e48a;
  display: inline-block;
}

.formula-note {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: #4b5832;
  font-weight: 600;
}

/* 海报 */
.stage-poster {
  display: grid;
  place-items: center;
}

.poster-sheet {
  width: 90px;
  height: 120px;
  background: #ffffff;
  border: 1px solid #dfc3cb;
  border-radius: 8px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 8px 18px rgba(48, 33, 80, 0.08);
  transform: rotate(-4deg);
}

.poster-line {
  height: 4px;
  background: #e8b0bd;
  border-radius: 2px;
}
.w-60 { width: 60%; }
.w-80 { width: 80%; }
.w-40 { width: 40%; }
.poster-block {
  flex: 1;
  background: #f7d2dc;
  border-radius: 4px;
  margin: 4px 0;
}

/* 原文 */
.stage-source {
  display: grid;
  place-items: center;
}

.source-doc {
  width: 94px;
  height: 120px;
  background: #ffffff;
  border: 1px solid #c7e6e5;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 8px 18px rgba(48, 33, 80, 0.06);
}

.doc-badge {
  font-size: 10px;
  font-weight: 800;
  color: #167f7a;
  background: #d9f1ef;
  padding: 2px 4px;
  border-radius: 4px;
  width: max-content;
}

.doc-lines span {
  display: block;
  height: 4px;
  background: #9ee5dd;
  border-radius: 2px;
  margin-bottom: 5px;
}
.l-1 { width: 80%; }
.l-2 { width: 90%; }
.l-3 { width: 60%; }

/* 底部文案 */
.card-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 800;
  color: #18141f;
  line-height: 1.3;
}

.card-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  color: #625d6d;
  line-height: 1.6;
}

.action-preview {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  color: #513995;
}
.tone-dark .action-preview {
  color: #cbb5f0;
}
</style>
