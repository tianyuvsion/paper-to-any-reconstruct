<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-dialog carved-card" role="dialog" aria-modal="true">
          <!-- 弹窗顶栏 -->
          <header class="modal-header">
            <div>
              <span class="modal-kicker">{{ card?.kicker || '成果体验' }}</span>
              <h2 class="modal-title">{{ card?.title }}</h2>
            </div>
            <button
              type="button"
              class="modal-close-btn"
              aria-label="关闭预览"
              @click="$emit('close')"
            >
              ×
            </button>
          </header>

          <!-- 弹窗主体内容 -->
          <div class="modal-body">
            <!-- 1. 音频播放预览 -->
            <div v-if="card?.mediaKind === 'audio'" class="media-audio-box">
              <div class="audio-disc-badge">🎧</div>
              <div class="audio-controls">
                <strong>通勤讲解音频 · 双主播对话</strong>
                <p>时长 04:32 · 围绕高约束等离子体稳定性展开科普</p>
                <audio controls class="native-audio-player">
                  <source src="" type="audio/mp3" />
                  您的浏览器暂不支持音频播放。
                </audio>
              </div>
            </div>

            <!-- 2. 视频播放预览 -->
            <div v-else-if="card?.mediaKind === 'video'" class="media-video-box">
              <div class="video-container">
                <div class="plasma-video-mock">
                  <span class="plasma-flame">🔥</span>
                  <strong>EAST 真实等离子体放电影像</strong>
                  <small>00:43 · 高速可见光成像</small>
                </div>
              </div>
            </div>

            <!-- 3. 海报或学术图卡 -->
            <div v-else class="card-detail-box">
              <div class="detail-quote-box">
                <span class="quote-label">科学结论摘要：</span>
                <p>{{ card?.subtitle }}</p>
              </div>
              <div class="evidence-origin">
                <span class="origin-tag">原文出处</span>
                <span>Science Advances, Vol 9, Issue 2 · Page 01-08</span>
              </div>
            </div>
          </div>

          <!-- 弹窗底栏动作 -->
          <footer class="modal-footer">
            <button
              v-if="card?.questionSuggestion"
              type="button"
              class="continue-btn carved-pressable"
              @click="$emit('continue', card.questionSuggestion)"
            >
              <span>沿着这个问题继续研读 ↗</span>
            </button>
            <button
              type="button"
              class="dismiss-btn"
              @click="$emit('close')"
            >
              完成预览
            </button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { GalleryCard } from '@/types/home'

defineProps<{
  visible: boolean
  card: GalleryCard | null
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'continue', question: string): void
}>()
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(24, 20, 31, 0.45);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-dialog {
  width: min(640px, 100%);
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(31, 20, 56, 0.28);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 24px 28px 18px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #f0eef4;
}

.modal-kicker {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #167f7a;
  display: block;
  margin-bottom: 6px;
}

.modal-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 24px;
  color: #18141f;
}

.modal-close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e1dee7;
  background: #ffffff;
  font-size: 22px;
  display: grid;
  place-items: center;
  color: #7d758b;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close-btn:hover {
  background: #f4effb;
  color: #35206d;
}

.modal-body {
  padding: 24px 28px;
}

/* 音频样式 */
.media-audio-box {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 18px;
  background: #fff8f0;
  border: 1px solid #ffd8bd;
}

.audio-disc-badge {
  font-size: 38px;
}

.audio-controls {
  flex: 1;
}

.audio-controls strong {
  display: block;
  font-size: 14px;
  color: #29253a;
}

.audio-controls p {
  margin: 4px 0 12px;
  font-size: 12px;
  color: #7b728b;
}

.native-audio-player {
  width: 100%;
  height: 36px;
}

/* 视频样式 */
.media-video-box {
  border-radius: 18px;
  overflow: hidden;
  background: #151124;
}

.plasma-video-mock {
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  background: radial-gradient(circle, rgba(114, 84, 179, 0.4) 0%, rgba(21, 17, 36, 0.95) 70%);
}

.plasma-flame {
  font-size: 40px;
}

.plasma-video-mock small {
  color: #cbb5f0;
  font-family: var(--font-mono);
  font-size: 12px;
}

/* 详情卡片 */
.detail-quote-box {
  padding: 16px 20px;
  border-radius: 14px;
  background: #f7f4fb;
  border-left: 4px solid #35206d;
}

.quote-label {
  font-size: 12px;
  font-weight: 700;
  color: #513995;
  display: block;
  margin-bottom: 6px;
}

.detail-quote-box p {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #29253a;
}

.evidence-origin {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  font-size: 12px;
  color: #7b728b;
}

.origin-tag {
  font-weight: 700;
  color: #167f7a;
  background: #d9f1ef;
  padding: 2px 8px;
  border-radius: 4px;
}

/* 弹窗底栏 */
.modal-footer {
  padding: 16px 28px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #f0eef4;
}

.continue-btn {
  padding: 11px 20px;
  border: 0;
  border-radius: 12px;
  background: #35206d;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(53, 32, 109, 0.2);
  transition: all 0.2s;
}

.continue-btn:hover {
  background: #513995;
}

.dismiss-btn {
  padding: 10px 18px;
  border: 1px solid #dcd7e5;
  border-radius: 12px;
  background: #ffffff;
  color: #625d6d;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.dismiss-btn:hover {
  background: #f7f4fb;
  color: #29253a;
}

/* 动效 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
